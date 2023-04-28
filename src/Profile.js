import React from 'react'
import './App.css'

import { Authenticator } from '@aws-amplify/ui-react'

const Profile = () => {
  return (
    <div style={containerStyle}>
      <Authenticator />
    </div>
  );
}

const containerStyle = {
  width: 400,
  margin: '20px auto'
}

export default Profile