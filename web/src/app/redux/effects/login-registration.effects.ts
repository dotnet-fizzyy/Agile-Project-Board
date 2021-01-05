import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { IUser } from 'src/app/utils/interfaces';
import { HttpService } from '../../services/http.service';
import { UserRoutes } from '../../utils/constants/webapi-routes';
import * as LoginRegistrationActions from '../actions/login-registration.actions';
import { IStoreState } from '../store/state';

@Injectable()
export default class LoginRegistrationEffects {
    constructor(private actions$: Actions, private store$: Store<IStoreState>, private httpClient: HttpService) {}

    loginRequest$ = createEffect(() =>
        this.actions$.pipe(
            ofType<LoginRegistrationActions.LoginSignInActionRequest>(
                LoginRegistrationActions.LoginRegistrationActions.LOGIN_SIGN_IN_REQUEST
            ),
            mergeMap((action) => this.httpClient.post(UserRoutes.AUTHENTICATE_USER, action.payload)),
            map((response: IUser) => {
                localStorage.setItem('user', JSON.stringify(response));

                return new LoginRegistrationActions.LoginSignInActionSuccess();
            }),
            catchError((error, caught) => {
                this.store$.dispatch(new LoginRegistrationActions.LoginSignInActionFailure(error));

                return caught;
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
            catchError((error, caught) => {
                this.store$.dispatch(new LoginRegistrationActions.RegistrationCreateAccountActionFailure(error));

                return caught;
            })
        )
    );
}
