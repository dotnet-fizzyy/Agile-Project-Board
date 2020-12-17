import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { HttpService } from '../../services/http.service';
import { UserRoutes } from '../../utils/constants/routes';
import * as LoginRegistrationActions from '../actions/login-registration.actions';

@Injectable()
export default class LoginRegistrationEffects {
    constructor(private actions$: Actions, private httpClient: HttpService) {}

    loginReguest$ = createEffect(() =>
        this.actions$.pipe(
            ofType<LoginRegistrationActions.LoginSignInActionRequest>(
                LoginRegistrationActions.LoginRegistrationActions.LOGIN_SIGN_IN_REQUEST
            ),
            mergeMap((action) => this.httpClient.post(UserRoutes.AUTHENTICATE_USER, action.payload)),
            map(() => {
                return new LoginRegistrationActions.LoginSignInActionSuccess();
            }),
            catchError((error) => {
                console.error(error);

                return of(new LoginRegistrationActions.LoginSignInActionFailure());
            })
        )
    );

    registrationRequest$ = createEffect(() =>
        this.actions$.pipe(
            ofType<LoginRegistrationActions.RegistrationCreateAccountActionRequest>(
                LoginRegistrationActions.LoginRegistrationActions.REGISTRATION_CREATE_ACCOUNT_REQUEST
            ),
            mergeMap((action) => this.httpClient.post(UserRoutes.CREATE_CUSTOMER, action.payload)),
            map(() => {
                return new LoginRegistrationActions.RegistrationCreateAccountActionSuccess();
            }),
            catchError((error) => {
                console.error(error);

                return of(new LoginRegistrationActions.RegistrationCreateAccountActionFailure());
            })
        )
    );
}
