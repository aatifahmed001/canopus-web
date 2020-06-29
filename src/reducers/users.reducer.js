import { userActionTypes } from '../constants';
import { LocalStorage } from '../utils';

const intialState = {
    user: {
        isAuthenticated: LocalStorage.getFromLocalStorage('loginSuccess') === "true",
        token: JSON.parse(LocalStorage.getFromLocalStorage('loginTokens')),
        language: navigator.language || "es-es"
    }
};

export const userReducer = (state = intialState, action) => {
    switch (action.type) {
        case userActionTypes.LOGIN_SUCCESS:
            return Object.assign({}, state, {
                user: {
                    ...state.user,
                    isAuthenticated: true,
                    token: action.loginTokens
                }
            });
        case userActionTypes.SET_LANGUAGE:
            return Object.assign({}, state, {
                user: {
                    ...state.user,
                    language: action.language || "es-es"
                }
            });
        case userActionTypes.LOGOUT_SUCCESS:
            return Object.assign({}, state, {
                user: {
                    ...state.user,
                    isAuthenticated: false,
                    signupSuccess: false,
                    verifySuccess: false,                    
                    token: null
                }
            });

        case userActionTypes.SIGNUP_SUCCESS:
            return Object.assign({}, state, {
                user: {
                    ...intialState.user,
                    signupSuccess: true,
                    username: action.username
                }
            });
        case userActionTypes.VERIFY_SUCCESS:
            return Object.assign({}, state, {
                user: {
                    ...intialState.user,
                    verifySuccess: true
                }
            });

        default:
            return state;
    }
}