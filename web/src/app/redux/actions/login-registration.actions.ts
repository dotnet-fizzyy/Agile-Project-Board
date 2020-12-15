import { Action } from '@ngrx/store';
import { IAuthenticationUser } from '../../utils/interfaces';

export const LoginRegistrationActions = {
    LOGIN_SIGN_IN_REQUEST: '[login] login_sign_in_request',
    LOGIN_SIGN_IN_SUCCESS: '[login] login_sign_in_success',
    LOGIN_SIGN_IN_FAILURE: '[login] login_sign_in_failure',
    REGISTRATION_CREATE_ACCOUNT_REQUEST: '[registration] registration_create_account_request',
    REGISTRATION_CREATE_ACCOUNT_SUCCESS: '[registration] registration_create_account_success',
    REGISTRATION_CREATE_ACCOUNT_FAILURE: '[registration] registration_create_account_failure',
};

export class LoginSignInActionRequest implements Action {
    constructor(public payload: IAuthenticationUser) {}
    readonly type: string = LoginRegistrationActions.LOGIN_SIGN_IN_REQUEST;
}

export class LoginSignInActionSuccess implements Action {
    readonly type: string = LoginRegistrationActions.LOGIN_SIGN_IN_SUCCESS;
}

export class LoginSignInActionFailure implements Action {
    readonly type: string = LoginRegistrationActions.LOGIN_SIGN_IN_FAILURE;
}

export class RegistrationCreateAccountActionRequest implements Action {
    constructor(public payload: IAuthenticationUser) {}
    readonly type: string = LoginRegistrationActions.REGISTRATION_CREATE_ACCOUNT_REQUEST;
}

export class RegistrationCreateAccountActionSuccess implements Action {
    readonly type: string = LoginRegistrationActions.REGISTRATION_CREATE_ACCOUNT_SUCCESS;
}

export class RegistrationCreateAccountActionFailure implements Action {
    readonly type: string = LoginRegistrationActions.REGISTRATION_CREATE_ACCOUNT_FAILURE;
}

export type LoginRegistrationActionTypes =
    | LoginSignInActionSuccess
    | LoginSignInActionFailure
    | RegistrationCreateAccountActionSuccess;
