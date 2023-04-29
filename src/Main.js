import React, { useState, useEffect } from 'react';
import Container from './Container';
import { API } from 'aws-amplify';
import { List } from 'antd';
import checkUser from './checkUser';

const Main = () => {
  const [state, setState] = useState({products: [], loading: true});
  // ^^ state for the products to be displayed
  const [user, updateUser] = useState({}); // set or update? book latter...
  // ^^ state of the user object - admin or guest
  let didCancel = false;
  useEffect(() => {
    getProducts() // brings in list of items
    checkUser(updateUser) // check to be sure user is admin
    return () => didCancel = true;
  }, [])
  const getProducts = async() => { // calls api, usually api calls are async
    const data = await API.get('servecommercelabsapi', '/products');
    console.log('data: ', data);
    if (didCancel) return
    setState({
      products: data.data.Items, loading: false
    })
  }
  const deleteItem = async(id) => {
    try { // updates the view before calling api delete
      const products = state.products.filter(p => p.id !== id)
      setState({ ...state, products })
      await API.del('servecommercelabsapi', '/products', { body: { id } })
      console.log('Well, that item is gone.')
    } catch (err) {
      console.log('error: ', err)
    }
  }
  return (
    <Container>
      <List
        itemLayout="horizontal"
        dataSource={state.products}
        loading={state.loading}
        renderItem={item => (
          <List.Item
            actions={user.isAuthorized ?
              [<p onClick={() => deleteItem(item.id)}
              key={item.id}>delete</p>] : null}
          >
            <List.Item.Meta
              title={item.name}
              description={item.price}
            />
          </List.Item>
        )}
      />
    </Container>
  )
}

export default Main