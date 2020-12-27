import * as ProjectActions from '../actions/project.actions';
import { IProjectState } from '../store/state';

const initialState: IProjectState = {
    project: {
        projectId: '',
        projectName: '',
        startDate: null,
        endDate: null,
        customerId: '',
    },
    epics: [
        { epicName: 'test', endDate: new Date(), startDate: new Date() },
        { epicName: 'test', endDate: new Date(), startDate: new Date() },
    ],
    sprints: [{ sprintName: 'sprint', startDate: new Date(), endDate: new Date() }],
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
