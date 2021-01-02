import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { HttpService } from '../../services/http.service';
import * as WebApiRoutes from '../../utils/constants/webapi-routes';
import { IProject, ITeam, IUpdateUserStatus, IUser } from '../../utils/interfaces';
import * as ProjectActions from '../actions/project.actions';
import * as TeamActions from '../actions/team.actions';
import { IStoreState } from '../store/state';

@Injectable({
    providedIn: 'root',
})
export default class TeamEffects {
    constructor(private actions$: Actions, private store$: Store<IStoreState>, private httpClient: HttpService) {}

    getTeam$ = createEffect(() =>
        this.actions$.pipe(
            ofType<TeamActions.GetTeamRequest>(TeamActions.TeamActions.GET_TEAM_REQUEST),
            mergeMap(() => this.httpClient.get(WebApiRoutes.TeamRoutes.GET_CUSTOMER_TEAM)),
            mergeMap((response: any) => {
                const mappedProject: IProject = TeamEffects.mapToProject(response.project);
                const mappedTeam: ITeam = TeamEffects.mapToTeam(response.team);

                return [new ProjectActions.AddProject(mappedProject), new TeamActions.GetTeamSuccess(mappedTeam)];
            }),
            catchError((error, caught) => {
                this.store$.dispatch(new TeamActions.GetTeamFailure(error));

                return caught;
            })
        )
    );

    createTeam$ = createEffect(() =>
        this.actions$.pipe(
            ofType<TeamActions.CreateTeamRequest>(TeamActions.TeamActions.CREATE_TEAM_REQUEST),
            mergeMap((action) => this.httpClient.post(WebApiRoutes.TeamRoutes.CREATE_TEAM, action.payload)),
            map((response) => {
                const mappedTeam: ITeam = TeamEffects.mapToTeam(response);

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
            mergeMap((action) => this.httpClient.post(WebApiRoutes.UserRoutes.ADD_USER, action.payload)),
            map((response) => {
                const mappedUser: IUser = TeamEffects.mapToUser(response);

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
                this.httpClient.put(WebApiRoutes.UserRoutes.UPDATE_USER_STATUS, action.payload).pipe(
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
                const mappedTeam: ITeam = TeamEffects.mapToTeam(response);

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
            mergeMap((action) => this.httpClient.put(WebApiRoutes.UserRoutes.UPDATE_USER, action.payload)),
            map((response) => {
                const updatedTeamMember: IUser = TeamEffects.mapToUser(response);

                return new TeamActions.UpdateTeamMemberSuccess(updatedTeamMember);
            }),
            catchError((error, caught) => {
                this.store$.dispatch(new TeamActions.UpdateTeamMemberFailure(error));

                return caught;
            })
        )
    );

    private static mapToProject(response: any): IProject {
        return {
            projectId: response ? response.projectId : '',
            projectName: response ? response.projectName : '',
            startDate: response ? response.startDate : new Date(),
            endDate: response ? response.endDate : new Date(),
            customerId: response ? response.customerId : '',
        } as IProject;
    }

    private static mapToTeam = (response: any): ITeam => {
        return {
            teamId: response ? response.teamId : '',
            name: response ? response.name : '',
            location: response ? response.location : '',
            projectId: response ? response.projectId : '',
            users: response && response.users && response.users.length ? response.users.map(TeamEffects.mapToUser) : [],
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
