import React from 'react';
import './App.css';
import { Authenticator } from '@aws-amplify/ui-react';

const Profile = () => { // if user is signed in, show sign out button
  // not signed in, show the sign-in form
  return (
    <div style={containerStyle}>
      <Authenticator>
        
        {({ signOut, user }) => (
          <>
          <h1>Content!</h1>
          <h2>This is your profile, I guess</h2>
          <h3>{user.username}</h3>
          <button onClick={signOut}>Click to sign out?</button>
          </>
        )}
      </Authenticator>
    </div>
  );
}

const containerStyle = {
  width: 400,
  margin: '20px auto'
}

export default Profile