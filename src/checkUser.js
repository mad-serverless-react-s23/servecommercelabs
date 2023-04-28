import { Auth } from 'aws-amplify'; // allows getting user info from cognito

const checkUser = async(updateUser) => {
    const userData = await Auth.currentSession() // checking to see if we have data for this user
        .catch(err => console.log('You got a problem here: ', err)
        )
    if (!userData) {
        console.log('userData: ', userData)
        updateUser({})
        return // returns if there is no user data
    }
    // nested destructuring - idToken has info about user
    const { idToken: { payload }} = userData
    // is this user in the Admin group? is it in any group?
    const isAuthorized = payload['cognito:groups'] &&
        payload['cognito:groups'].includes('Admin')
    updateUser({
        username: payload['cognito:username'],
        isAuthorized // if user is Admin, isAuthorized is set to true
    })
}

export default checkUser