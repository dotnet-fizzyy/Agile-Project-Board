import * as TeamActions from '../actions/team.actions';
import { ITeamState } from '../store/state';

const initialState: ITeamState = {
    teamId: '',
    name: '',
    projectId: '',
    location: '',
    users: [],
};

export default function teamReducer(state = initialState, action: TeamActions.TeamActionTypes): ITeamState {
    switch (action.type) {
        case TeamActions.TeamActions.CREATE_TEAM_SUCCESS:
        case TeamActions.TeamActions.GET_TEAM_SUCCESS:
            return handleCreateTeamSuccess(state, action);
        case TeamActions.TeamActions.UPDATE_TEAM_SUCCESS:
            return handleUpdateTeamSuccess(state, action);
        case TeamActions.TeamActions.CREATE_TEAM_MEMBER_SUCCESS:
            return handleCreateTeamMemberSuccess(state, action);
        case TeamActions.TeamActions.UPDATE_TEAM_MEMBER_SUCCESS:
            return handleUpdateTeamMemberSuccess(state, action);
        case TeamActions.TeamActions.UPDATE_TEAM_MEMBER_STATUS_SUCCESS:
            return handleUpdateTeamMemberStatusSuccess(state, action);
        default:
            return state;
    }
}

function handleCreateTeamSuccess(state: ITeamState, action: TeamActions.CreateTeamSuccess): ITeamState {
    return {
        ...state,
        ...action.payload,
    };
}

function handleUpdateTeamSuccess(state: ITeamState, action: TeamActions.CreateTeamSuccess): ITeamState {
    return {
        ...state,
        teamId: action.payload.teamId,
        location: action.payload.location,
        name: action.payload.name,
        projectId: action.payload.projectId,
    };
}

function handleCreateTeamMemberSuccess(state: ITeamState, action: TeamActions.CreateTeamMemberSuccess): ITeamState {
    return {
        ...state,
        users: state.users.concat(action.payload),
    };
}

function handleUpdateTeamMemberSuccess(state: ITeamState, action: TeamActions.UpdateTeamMemberSuccess): ITeamState {
    return {
        ...state,
        users: state.users.map((x) => (x.userId === action.payload.userId ? { ...action.payload } : x)),
    };
}

function handleUpdateTeamMemberStatusSuccess(
    state: ITeamState,
    action: TeamActions.UpdateTeamMemberStatusSuccess
): ITeamState {
    return {
        ...state,
        users: state.users.map((x) =>
            x.userId === action.payload.userId ? { ...x, isActive: action.payload.isActive } : x
        ),
    };
}
