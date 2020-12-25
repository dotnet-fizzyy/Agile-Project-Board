import * as ProjectActions from '../actions/project.actions';
import { IProjectState } from './../store/state';

const initialState: IProjectState = {
    project: null,
    epics: [],
    sprints: [],
};

export default function projectReducer(state = initialState, action: ProjectActions.ProjectActionTypes): IProjectState {
    switch (action.type) {
        case ProjectActions.ProjectActions.GET_PROJECT_DESC_SUCCESS:
            return handleGetProjectDescriptionSuccess(state, action);
        case ProjectActions.ProjectActions.CREATE_EPIC_SUCCESS:
            return handleCreateEpicSuccess(state, action);
        case ProjectActions.ProjectActions.CREATE_SPRINT_SUCCESS:
            return handleCreateSprintSuccess(state, action);
        default:
            return state;
    }
}

function handleGetProjectDescriptionSuccess(
    state: IProjectState,
    action: ProjectActions.GetProjectSuccess
): IProjectState {
    return {
        ...state,
        project: action.payload.project,
        epics: action.payload.epics,
    };
}

function handleCreateEpicSuccess(state: IProjectState, action: ProjectActions.CreateEpicSuccess): IProjectState {
    return {
        ...state,
        epics: state.epics.concat(action.payload),
    };
}

function handleCreateSprintSuccess(state: IProjectState, action: ProjectActions.CreateSprintSuccess): IProjectState {
    return {
        ...state,
        sprints: state.sprints.concat(action.payload),
    };
}
