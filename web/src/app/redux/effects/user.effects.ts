import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { HttpService } from '../../services/http.service';
import { MainRoutes } from '../../utils/constants/routes';
import { IUser } from '../../utils/interfaces';
import * as UserActions from '../actions/user.actions';

@Injectable({
    providedIn: 'root',
})
export default class UserEffects {
    constructor(private actions$: Actions, private httpClient: HttpService) {}

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
                userId: user.userId,
                username: user.username,
                avatarLink: user.avatarLink,
                isActive: user.isActive,
                userRole: user.userRole,
                teamId: user.teamId,
            } as IUser;
        });
    };
}
