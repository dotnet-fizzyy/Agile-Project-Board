import { Action } from '@ngrx/store';
import { ITeam, IUser } from '../../utils/interfaces';

export const TeamActions = {
    GET_TEAM_REQUEST: '[team] get_team_request',
    GET_TEAM_SUCCESS: '[team] get_team_success',
    GET_TEAM_FAILURE: '[team] get_team_failure',
    CREATE_TEAM_REQUEST: '[team] create_team_request',
    CREATE_TEAM_SUCCESS: '[team] create_team_success',
    CREATE_TEAM_FAILURE: '[team] create_team_failure',
    CREATE_TEAM_MEMBER_REQUEST: '[team] create_team_member_request',
    CREATE_TEAM_MEMBER_SUCCESS: '[team] create_team_member_success',
    CREATE_TEAM_MEMBER_FAILURE: '[team] create_team_member_failure',
    UPDATE_TEAM_MEMBER_STATUS_REQUEST: '[team] update_team_member_status_request',
    UPDATE_TEAM_MEMBER_STATUS_SUCCESS: '[team] update_team_member_status_success',
    UPDATE_TEAM_MEMBER_STATUS_FAILURE: '[team] update_team_member_status_failure',
};

export class GetTeamRequest implements Action {
    readonly type: string = TeamActions.GET_TEAM_REQUEST;
}

export class GetTeamSuccess implements Action {
    constructor(public payload: any) {}
    readonly type: string = TeamActions.GET_TEAM_SUCCESS;
}

export class GetTeamFailure implements Action {
    constructor(public payload: Error) {}
    readonly type: string = TeamActions.GET_TEAM_SUCCESS;
}

export class CreateTeamRequest implements Action {
    constructor(public payload: ITeam) {}
    readonly type: string = TeamActions.CREATE_TEAM_REQUEST;
}

export class CreateTeamSuccess implements Action {
    constructor(public payload: ITeam) {}
    readonly type: string = TeamActions.CREATE_TEAM_SUCCESS;
}

export class CreateTeamFailure implements Action {
    constructor(public payload: Error) {}
    readonly type: string = TeamActions.CREATE_TEAM_FAILURE;
}

export class CreateTeamMemberRequest implements Action {
    constructor(public payload: IUser) {}
    readonly type: string = TeamActions.CREATE_TEAM_MEMBER_REQUEST;
}

export class CreateTeamMemberSuccess implements Action {
    constructor(public payload: IUser) {}
    readonly type: string = TeamActions.CREATE_TEAM_MEMBER_SUCCESS;
}

export class CreateTeamMemberFailure implements Action {
    constructor(public payload: Error) {}
    readonly type: string = TeamActions.CREATE_TEAM_MEMBER_FAILURE;
}

export class UpdateTeamMemberStatusRequest implements Action {
    constructor(public payload: IUser) {}
    readonly type: string = TeamActions.UPDATE_TEAM_MEMBER_STATUS_REQUEST;
}

export class UpdateTeamMemberStatusSuccess implements Action {
    constructor(public payload: IUser) {}
    readonly type: string = TeamActions.UPDATE_TEAM_MEMBER_STATUS_SUCCESS;
}

export class UpdateTeamMemberStatusFailure implements Action {
    constructor(public payload: Error) {}
    readonly type: string = TeamActions.UPDATE_TEAM_MEMBER_STATUS_FAILURE;
}

export type TeamActionTypes = GetTeamSuccess &
    CreateTeamMemberSuccess &
    CreateTeamSuccess &
    UpdateTeamMemberStatusSuccess;
