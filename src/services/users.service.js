import {
    AuthenticationDetails,
    CognitoUser,
    CognitoUserPool,
    CognitoUserAttribute
} from 'amazon-cognito-identity-js';
import { LocalStorage } from '../utils';

const signIn = (username, password) => {
    return new Promise((resolve, reject) => {
        let cognitoUser = new CognitoUser({
            Username: username.toLowerCase(),
            Pool: new CognitoUserPool({
                UserPoolId: process.env.REACT_APP_POOL_ID,
                ClientId: process.env.REACT_APP_CLIENT_ID
            })
        });
        let authenticationData = {
            Username: username.toLowerCase(),
            Password: password,
        };
        cognitoUser.authenticateUser(new AuthenticationDetails(authenticationData), {
            onSuccess: function (result) {
                LocalStorage.saveInLocalStorage('loginSuccess', true)
                LocalStorage.saveInLocalStorage('username', username.toLowerCase())
                LocalStorage.saveInLocalStorage('loginTokens', result)
                resolve(result);
            },
            onFailure: function (error) {
                reject(error);
            },
            mfaRequired: function (codeDeliveryDetails) {
                let verificationCode = prompt('Please input verification code', '');
                cognitoUser.sendMFACode(verificationCode, this);
            }
        });

    });
}

const signOut = (callback) => {
    try {
        let cognitoUser = new CognitoUser({
            Username: LocalStorage.getFromLocalStorage("username").toLowerCase(),
            Pool: new CognitoUserPool({
                UserPoolId: process.env.REACT_APP_POOL_ID,
                ClientId: process.env.REACT_APP_CLIENT_ID
            })
        });
        cognitoUser.globalSignOut({
            onSuccess: () => {
                LocalStorage.clearLocalStorage();
                callback && callback();
            },
            onFailure: () => {
                cognitoUser.signOut();
                LocalStorage.clearLocalStorage();
                callback && callback();
            }
        });
    } catch (ex) {
        LocalStorage.clearLocalStorage();
        callback && callback();
    }
}

const signUp = (data, callback) => {
    const userPool = new CognitoUserPool({
        UserPoolId: process.env.REACT_APP_POOL_ID,
        ClientId: process.env.REACT_APP_CLIENT_ID
    });
    const userAttributes = [
        new CognitoUserAttribute({ Name: "email", Value: data.email }),
        new CognitoUserAttribute({ Name: "name", Value: data.fullname })];

    userPool.signUp(data.username, data.password, userAttributes, [], (data) => {
        console.log(data)
        callback && callback(data.username);
    });
}


const verifyEmail = (data, callback) => {
    let cognitoUser = new CognitoUser({
        Username: data.username.toLowerCase(),
        Pool: new CognitoUserPool({
            UserPoolId: process.env.REACT_APP_POOL_ID,
            ClientId: process.env.REACT_APP_CLIENT_ID
        })
    });
    cognitoUser.confirmRegistration(data.verificationCode, true, (res) => {
        callback && callback(res)
    });
}


export const userService = {
    signIn,
    signOut,
    signUp,
    verifyEmail
};