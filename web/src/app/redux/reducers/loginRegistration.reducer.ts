import * as LoginRegistrationActions from '../actions/login-registration.actions';
import { ILoginCreationsState } from '../store/state';

const initialState: ILoginCreationsState = {
    isSignInSuccessful: null,
    isRegistrationSuccessful: null,
};

export default function loginRegistrationReducer(
    state = initialState,
    action: LoginRegistrationActions.LoginRegistrationActionTypes
): ILoginCreationsState {
    switch (action.type) {
        case LoginRegistrationActions.LoginRegistrationActions.LOGIN_SIGN_IN_SUCCESS:
            return handleLoginSuccessAction(state, action);
        case LoginRegistrationActions.LoginRegistrationActions.LOGIN_SIGN_IN_FAILURE:
            return handleLoginFailureAction(state, action);
        case LoginRegistrationActions.LoginRegistrationActions.REGISTRATION_CREATE_ACCOUNT_SUCCESS:
            return handleRegistrationSuccessAction(state, action);
        default:
            return state;
    }
}

function handleLoginSuccessAction(
    state: ILoginCreationsState,
    action: LoginRegistrationActions.LoginSignInActionSuccess
): ILoginCreationsState {
    return {
        ...state,
        isSignInSuccessful: true,
    };
}

function handleLoginFailureAction(
    state: ILoginCreationsState,
    action: LoginRegistrationActions.LoginSignInActionFailure
): ILoginCreationsState {
    return {
        ...state,
        isSignInSuccessful: false,
    };
}

function handleRegistrationSuccessAction(
    state: ILoginCreationsState,
    action: LoginRegistrationActions.RegistrationCreateAccountActionSuccess
): ILoginCreationsState {
    return {
        ...state,
        isRegistrationSuccessful: true,
    };
}
