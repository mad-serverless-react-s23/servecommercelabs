import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { HomeOutlined, UserOutlined, ProfileOutlined } from '@ant-design/icons';
import { Hub } from 'aws-amplify'; // listener for users sign in/out
import checkUser from './checkUser';

const Nav = ({ current }) => {
  // const { current } = props if the only thing we need from 'props' is {current}
  // destructure it and just use the bit you want as a parameter
  const [user, updateUser] = useState({});
  useEffect(() => {
    checkUser(updateUser)
    Hub.listen('auth', (data) => {
      const { payload: { event } } = data; // payload of the listener is the event
      // event sign in/out, maybe others
      console.log('event: ', event);
      if (event === 'signIn' || event === 'signOut') checkUser(updateUser)
      // run the checkUser function whenever user signs in or out
    })
  }, []) // emptry array for only run when component loads

  return (
    <div>
      <Menu selectedKeys={[current]} mode="horizontal">
        <Menu.Item key='home'>
          <Link to={`/`}>
            <HomeOutlined />Home
          </Link>
        </Menu.Item>
        <Menu.Item key='profile'>
          <Link to='/profile'>
            <UserOutlined />Profile
          </Link>
        </Menu.Item>
        {
          user.isAuthorized && ( // boolean short-circuit - shorter than if/else
            <Menu.Item key='admin'>
              <Link to='/admin'>
                <ProfileOutlined />Admin
              </Link>
            </Menu.Item>
          )
        }
      </Menu>
    </div>
  )
}

export default Nav