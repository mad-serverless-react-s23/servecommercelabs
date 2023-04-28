import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Router from './Router';
import 'antd/dist/reset.css';
import { Amplify } from 'aws-amplify';
import config from './aws-exports';
Amplify.configure(config);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
);
