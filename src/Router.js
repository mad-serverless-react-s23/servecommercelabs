import React, {useState, useEffect} from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';

import Nav from './Nav';
import Admin from './Admin';
import Main from './Main';
import Profile from './Profile';

const Router = () => {
  const [current, setCurrent] = useState('home');
  useEffect(() => {
    setRoute(); // function set below
    window.addEventListener('hashchange', setRoute);
    // ^^ listen for changes related to hash router
    return () =>  window.removeEventListener('hashchange', setRoute);
    // gives a function back after the setRoute function is called
  }, []);
  const setRoute = () => {
    const location = window.location.href.split('/');
    // splits the url parts of location into array of locations
    const pathname = location[location.length - 1];
    // the page we are on is last in the / array so this gets current page
    console.log('The path we are traveling: ', pathname);
    setCurrent(pathname ? pathname : 'home'); // set the available path or go home
  };
  return (
    <HashRouter>
      <Nav current={current} />
      <Routes>
        <Route exact path='/' element={<Main />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/profile' element={<Profile />} />
        <Route element={<Main />} />
      </Routes>
    </HashRouter>
  );
}

export default Router;