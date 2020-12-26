import * as TeamActions from '../actions/team.actions';
import { ITeamState } from './../store/state';

const initialState: ITeamState = {
    teamId: '',
    teamName: '',
    projectId: '',
    location: '',
    users: [],
};

export default function teamReducer(state = initialState, action: TeamActions.TeamActionTypes): ITeamState {
    switch (action.type) {
        case TeamActions.TeamActions.CREATE_TEAM_SUCCESS:
        case TeamActions.TeamActions.GET_TEAM_SUCCESS:
            return handleCreateTeamSuccess(state, action);
        case TeamActions.TeamActions.CREATE_TEAM_MEMBER_SUCCESS:
            return handleCreateTeamMemberSuccess(state, action);
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

function handleCreateTeamMemberSuccess(state: ITeamState, action: TeamActions.CreateTeamMemberSuccess): ITeamState {
    return {
        ...state,
        users: state.users.concat(action.payload),
    };
}
