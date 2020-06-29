import { userService } from '../services';

export const SignInApi = (username, password, onSuccess, onFailure) => {
    return userService.signIn(username, password).then(result => onSuccess(result)).catch((error) => onFailure(error));
}

export const SignOutApi = (callback) => {
    return userService.signOut(callback)
}

export const SignUpApi = (data, onSuccess, onFailure) => {
    return userService.signUp(data, (username) => onSuccess(data.username));
}
export const VerifyEmailApi = (data, onSuccess, onFailure) => {
    return userService.verifyEmail(data, (verified) => onSuccess(verified));
}