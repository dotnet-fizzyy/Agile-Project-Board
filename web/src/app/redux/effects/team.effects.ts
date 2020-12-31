import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { HttpService } from '../../services/http.service';
import * as WebApiRoutes from '../../utils/constants/webapi-routes';
import { ITeam, IUpdateUserStatus, IUser } from '../../utils/interfaces';
import * as TeamActions from '../actions/team.actions';
import { IStoreState } from '../store/state';

@Injectable({
    providedIn: 'root',
})
export default class UserEffects {
    constructor(private actions$: Actions, private store$: Store<IStoreState>, private httpClient: HttpService) {}

    createTeam$ = createEffect(() =>
        this.actions$.pipe(
            ofType<TeamActions.CreateTeamRequest>(TeamActions.TeamActions.CREATE_TEAM_REQUEST),
            mergeMap((action) => this.httpClient.post(WebApiRoutes.TeamRoutes.CREATE_TEAM, action.payload)),
            map((response) => {
                const mappedTeam: ITeam = UserEffects.mapToTeam(response);

                return new TeamActions.CreateTeamSuccess(mappedTeam);
            }),
            catchError((error, caught) => {
                this.store$.dispatch(new TeamActions.CreateTeamFailure(error));

                return caught;
            })
        )
    );

    createTeamMember$ = createEffect(() =>
        this.actions$.pipe(
            ofType<TeamActions.CreateTeamMemberRequest>(TeamActions.TeamActions.CREATE_TEAM_MEMBER_REQUEST),
            mergeMap((action) => this.httpClient.post(WebApiRoutes.TeamRoutes.CREATE_TEAM_MEMBER, action.payload)),
            map((response) => {
                const mappedUser: IUser = UserEffects.mapToUser(response);

                return new TeamActions.CreateTeamMemberSuccess(mappedUser);
            }),
            catchError((error, caught) => {
                this.store$.dispatch(new TeamActions.CreateTeamMemberFailure(error));

                return caught;
            })
        )
    );

    updateTeamMemberStatus$ = createEffect(() =>
        this.actions$.pipe(
            ofType<TeamActions.UpdateTeamMemberStatusRequest>(
                TeamActions.TeamActions.UPDATE_TEAM_MEMBER_STATUS_REQUEST
            ),
            mergeMap((action) =>
                this.httpClient.patch(WebApiRoutes.TeamRoutes.UPDATE_TEAM_MEMBER_STATUS, action.payload).pipe(
                    map(() => {
                        const updatedStatus: IUpdateUserStatus = {
                            userId: action.payload.userId,
                            isActive: action.payload.isActive,
                        };

                        return new TeamActions.UpdateTeamMemberStatusSuccess(updatedStatus);
                    })
                )
            ),
            catchError((error, caught) => {
                this.store$.dispatch(new TeamActions.UpdateTeamMemberStatusFailure(error));

                return caught;
            })
        )
    );

    updateTeam$ = createEffect(() =>
        this.actions$.pipe(
            ofType<TeamActions.UpdateTeamRequest>(TeamActions.TeamActions.UPDATE_TEAM_REQUEST),
            mergeMap((action) => this.httpClient.put(WebApiRoutes.TeamRoutes.UPDATE_TEAM, action.payload)),
            map((response) => {
                const mappedTeam: ITeam = UserEffects.mapToTeam(response);

                return new TeamActions.UpdateTeamSuccess(mappedTeam);
            }),
            catchError((error, caught) => {
                this.store$.dispatch(new TeamActions.UpdateTeamFailure(error));

                return caught;
            })
        )
    );

    updateTeamMember$ = createEffect(() =>
        this.actions$.pipe(
            ofType<TeamActions.UpdateTeamMemberRequest>(TeamActions.TeamActions.UPDATE_TEAM_MEMBER_REQUEST),
            mergeMap((action) => this.httpClient.put(WebApiRoutes.TeamRoutes.UPDATE_TEAM_MEMBER, action.payload)),
            map((response) => {
                const updatedTeamMember: IUser = UserEffects.mapToUser(response);

                return new TeamActions.UpdateTeamMemberSuccess(updatedTeamMember);
            }),
            catchError((error, caught) => {
                this.store$.dispatch(new TeamActions.UpdateTeamMemberFailure(error));

                return caught;
            })
        )
    );

    private static mapToTeam = (response: any): ITeam => {
        return {
            teamId: response.teamId,
            teamName: response.teamName,
            location: response.location,
            projectId: response.projectId,
        } as ITeam;
    };

    private static mapToUser = (response: any): IUser => {
        return {
            userId: response.userId,
            username: response.username,
            avatarLink: response.avatarLink,
            isActive: response.isActive,
            userRole: response.userRole,
            teamId: response.teamId,
        } as IUser;
    };
}
