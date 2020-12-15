import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { HttpService } from '../../services/http.service';
import * as UserActions from '../actions/user.actions';
import { map, catchError, mergeMap } from 'rxjs/operators';
import { MainRoutes } from '../../utils/constants/routes';
import { IUser } from '../../utils/interfaces';
import { of } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export default class UserEffects {
    constructor(private actions$: Actions, private httpClient: HttpService) {}

    @Effect({ dispatch: false })
    usersRequest$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.UserActions.GET_USERS_REQUEST),
            mergeMap(() => this.httpClient.get(MainRoutes.USERS)),
            map((response) => {
                const mappedUsers = this.mapToUsers(response);

                return new UserActions.GetUsersSuccessAction(mappedUsers);
            }),
            catchError(() => of(new UserActions.GetUsersRequestAction()))
        )
    );

    private mapToUsers = (response: any) => {
        return response.map((user) => {
            return {
                id: user.id,
                name: user.name,
            } as IUser;
        });
    };
}
