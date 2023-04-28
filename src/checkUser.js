import { Auth } from 'aws-amplify'; // allows getting user info from cognito

const checkUser = async(updateUser) => {
    try {
        const userData = await Auth
            .currentSession() // checking to see if we have data for this user
        console.log("check, check user 1, 2... ", userData)
       
        // nested destructuring below - idToken has payload about user
        const { idToken: { payload }} = userData
        // is this user in the Admin group? is it in any group?
        const isAuthorized = payload['cognito:groups'] &&
            payload['cognito:groups'].includes('Admin')
        updateUser({
            username: payload['cognito:username'],
            isAuthorized // if user is Admin, isAuthorized is set to true
        })
    } catch (err) {
        console.error(err);
    }
    
}

export default checkUser;