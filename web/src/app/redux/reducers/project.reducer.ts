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
        case ProjectActions.ProjectActions.CREATE_PROJECT_SUCCESS:
        case ProjectActions.ProjectActions.UPDATE_PROJECT_SUCCESS:
            return handleUpdateProjectSuccess(state, action);
        case ProjectActions.ProjectActions.UPDATE_EPIC_SUCCESS:
            return handleUpdateEpicSuccess(state, action);
        case ProjectActions.ProjectActions.UPDATE_SPRINT_SUCCESS:
            return handleUpdateSprintSuccess(state, action);
        case ProjectActions.ProjectActions.GET_SPRINTS_FROM_EPIC_SUCCESS:
            return handleGetSprintsFromEpicSuccess(state, action);
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

function handleUpdateProjectSuccess(state: IProjectState, action: ProjectActions.UpdateProjectSuccess): IProjectState {
    return {
        ...state,
        project: { ...action.payload },
    };
}

function handleUpdateEpicSuccess(state: IProjectState, action: ProjectActions.UpdateEpicSuccess): IProjectState {
    return {
        ...state,
        epics: state.epics.map((x) => (x.epicId === action.payload.epicId ? { ...action.payload } : x)),
    };
}

function handleUpdateSprintSuccess(state: IProjectState, action: ProjectActions.UpdateSprintSuccess): IProjectState {
    return {
        ...state,
        sprints: state.sprints.map((x) => (x.sprintId === action.payload.sprintId ? { ...action.payload } : x)),
    };
}

function handleGetSprintsFromEpicSuccess(
    state: IProjectState,
    action: ProjectActions.GetSprintsFromEpicSuccess
): IProjectState {
    return {
        ...state,
        sprints: action.payload,
    };
}
