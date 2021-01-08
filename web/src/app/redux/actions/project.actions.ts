import { Action } from '@ngrx/store';
import { IEpic, IFullProjectDescription, IProject, ISprint, ITeamManagementModel } from '../../utils/interfaces';

export const ProjectActions = {
    GET_PROJECT_FULL_DESC_REQUEST: '[project] get_project_full_desc_request',
    GET_PROJECT_FULL_DESC_SUCCESS: '[project] get_project_full_desc_success',
    GET_PROJECT_FULL_DESC_FAILURE: '[project] get_project_full_desc_failure',
    CREATE_PROJECT_REQUEST: '[project] create_project_request',
    CREATE_PROJECT_SUCCESS: '[project] create_project_success',
    CREATE_PROJECT_FAILURE: '[project] create_project_failure',
    CREATE_EPIC_REQUEST: '[project] create_epic_request',
    CREATE_EPIC_SUCCESS: '[project] create_epic_success',
    CREATE_EPIC_FAILURE: '[project] create_epic_failure',
    CREATE_SPRINT_REQUEST: '[project] create_sprint_request',
    CREATE_SPRINT_SUCCESS: '[project] create_sprint_success',
    CREATE_SPRINT_FAILURE: '[project] create_sprint_failure',
    UPDATE_PROJECT_REQUEST: '[project] update_project_request',
    UPDATE_PROJECT_SUCCESS: '[project] update_project_success',
    UPDATE_PROJECT_FAILURE: '[project] update_project_failure',
    UPDATE_EPIC_REQUEST: '[project] update_epic_request',
    UPDATE_EPIC_SUCCESS: '[project] update_epic_success',
    UPDATE_EPIC_FAILURE: '[project] update_epic_failure',
    UPDATE_SPRINT_REQUEST: '[project] update_sprint_request',
    UPDATE_SPRINT_SUCCESS: '[project] update_sprint_success',
    UPDATE_SPRINT_FAILURE: '[project] update_sprint_failure',
    GET_SPRINTS_FROM_EPIC_REQUEST: '[project] get_sprints_from_epic_request',
    GET_SPRINTS_FROM_EPIC_SUCCESS: '[project] get_sprints_from_epic_success',
    GET_SPRINTS_FROM_EPIC_FAILURE: '[project] get_sprints_from_epic_failure',
    ADD_PROJECT: '[project] add_project',
    GET_INITIAL_PAGE_DATA_REQUEST: '[project] get_initial_page_data_request',
    GET_INITIAL_PAGE_DATA_SUCCESS: '[project] get_initial_page_data_success',
    GET_INITIAL_PAGE_DATA_FAILURE: '[project] get_initial_page_data_failure',
    GET_PROJECT_BOARD_DATA_REQUEST: '[project] get_project_board_data_request',
    GET_PROJECT_BOARD_DATA_FAILURE: '[project] get_project_board_data_failure',
    GET_EPICS_SUCCESS: '[project] get_epics_success',
    GET_PROJECT_SUCCESS: '[project] get_project_success',
    GET_FULL_SPRINTS_FROM_EPIC_REQUEST: '[project] get_full_sprints_from_epic_request',
    GET_FULL_SPRINTS_FROM_EPIC_SUCCESS: '[project] get_full_sprints_from_epic_success',
    GET_FULL_SPRINTS_FROM_EPIC_FAILURE: '[project] get_full_sprints_from_epic_failure',
};

export class GetFullProjectRequest implements Action {
    readonly type: string = ProjectActions.GET_PROJECT_FULL_DESC_REQUEST;
}

export class GetFullProjectFailure implements Action {
    constructor(public error: Error) {}
    readonly type: string = ProjectActions.GET_PROJECT_FULL_DESC_FAILURE;
}

export class GetFullProjectSuccess implements Action {
    constructor(public payload: IFullProjectDescription) {}
    readonly type: string = ProjectActions.GET_PROJECT_FULL_DESC_SUCCESS;
}

export class CreateProjectRequest implements Action {
    constructor(public payload: IProject) {}
    readonly type: string = ProjectActions.CREATE_PROJECT_REQUEST;
}

export class CreateProjectSuccess implements Action {
    constructor(public payload: IProject) {}
    readonly type: string = ProjectActions.CREATE_PROJECT_SUCCESS;
}

export class CreateProjectFailure implements Action {
    constructor(public error: Error) {}
    readonly type: string = ProjectActions.CREATE_PROJECT_FAILURE;
}

export class CreateSprintRequest implements Action {
    constructor(public payload: ISprint) {}
    readonly type: string = ProjectActions.CREATE_SPRINT_REQUEST;
}

export class CreateSprintSuccess implements Action {
    constructor(public payload: ISprint) {}
    readonly type: string = ProjectActions.CREATE_SPRINT_SUCCESS;
}

export class CreateSprintFailure implements Action {
    constructor(public error: Error) {}
    readonly type: string = ProjectActions.CREATE_SPRINT_FAILURE;
}

export class CreateEpicRequest implements Action {
    constructor(public payload: IEpic) {}
    readonly type: string = ProjectActions.CREATE_EPIC_REQUEST;
}

export class CreateEpicSuccess implements Action {
    constructor(public payload: IEpic) {}
    readonly type: string = ProjectActions.CREATE_EPIC_SUCCESS;
}

export class CreateEpicFailure implements Action {
    constructor(public error: Error) {}
    readonly type: string = ProjectActions.CREATE_EPIC_FAILURE;
}

export class UpdateProjectRequest implements Action {
    constructor(public payload: IProject) {}
    readonly type: string = ProjectActions.UPDATE_PROJECT_REQUEST;
}

export class UpdateProjectSuccess implements Action {
    constructor(public payload: IProject) {}
    readonly type: string = ProjectActions.UPDATE_PROJECT_SUCCESS;
}

export class UpdateProjectFailure implements Action {
    constructor(public error: Error) {}
    readonly type: string = ProjectActions.UPDATE_PROJECT_FAILURE;
}

export class UpdateEpicRequest implements Action {
    constructor(public payload: IEpic) {}
    readonly type: string = ProjectActions.UPDATE_EPIC_REQUEST;
}

export class UpdateEpicSuccess implements Action {
    constructor(public payload: IEpic) {}
    readonly type: string = ProjectActions.UPDATE_EPIC_SUCCESS;
}

export class UpdateEpicFailure implements Action {
    constructor(public error: Error) {}
    readonly type: string = ProjectActions.UPDATE_EPIC_FAILURE;
}

export class UpdateSprintRequest implements Action {
    constructor(public payload: ISprint) {}
    readonly type: string = ProjectActions.UPDATE_SPRINT_REQUEST;
}

export class UpdateSprintSuccess implements Action {
    constructor(public payload: ISprint) {}
    readonly type: string = ProjectActions.UPDATE_SPRINT_SUCCESS;
}

export class UpdateSprintFailure implements Action {
    constructor(public error: Error) {}
    readonly type: string = ProjectActions.UPDATE_SPRINT_FAILURE;
}

export class GetSprintsFromEpicRequest implements Action {
    constructor(public payload: string) {}
    readonly type: string = ProjectActions.GET_SPRINTS_FROM_EPIC_REQUEST;
}

export class GetSprintsFromEpicSuccess implements Action {
    constructor(public payload: ISprint[]) {}
    readonly type: string = ProjectActions.GET_SPRINTS_FROM_EPIC_SUCCESS;
}

export class GetSprintsFromEpicFailure implements Action {
    constructor(public error: Error) {}
    readonly type: string = ProjectActions.GET_SPRINTS_FROM_EPIC_FAILURE;
}

export class AddProject implements Action {
    constructor(public payload: IProject) {}
    readonly type: string = ProjectActions.ADD_PROJECT;
}

export class GetProjectMainPageDataRequest implements Action {
    readonly type: string = ProjectActions.GET_INITIAL_PAGE_DATA_REQUEST;
}

export class GetProjectMainPageDataSuccess implements Action {
    constructor(public payload: ITeamManagementModel) {}
    readonly type: string = ProjectActions.GET_INITIAL_PAGE_DATA_SUCCESS;
}

export class GetProjectMainPageDataFailure implements Action {
    constructor(public payload: Error) {}
    readonly type: string = ProjectActions.GET_INITIAL_PAGE_DATA_FAILURE;
}

export class GetProjectBoardDataRequest implements Action {
    constructor(public payload: string) {}
    readonly type: string = ProjectActions.GET_PROJECT_BOARD_DATA_REQUEST;
}

export class GetProjectBoardDataFailure implements Action {
    constructor(public error: Error) {}
    readonly type: string = ProjectActions.GET_PROJECT_BOARD_DATA_FAILURE;
}

export class GetEpicsSuccess implements Action {
    constructor(public payload: IEpic[]) {}
    readonly type: string = ProjectActions.GET_EPICS_SUCCESS;
}

export class GetProjectSuccess implements Action {
    constructor(public payload: IProject) {}
    readonly type: string = ProjectActions.GET_PROJECT_SUCCESS;
}

export class GetFullSprintsFromEpicRequest implements Action {
    constructor(public payload: string) {}
    readonly type: string = ProjectActions.GET_FULL_SPRINTS_FROM_EPIC_REQUEST;
}

export class GetFullSprintsFromEpicSuccess implements Action {
    constructor(public payload: ISprint[]) {}
    readonly type: string = ProjectActions.GET_FULL_SPRINTS_FROM_EPIC_SUCCESS;
}

export class GetFullSprintsFromEpicFailure implements Action {
    constructor(public error: Error) {}
    readonly type: string = ProjectActions.GET_FULL_SPRINTS_FROM_EPIC_FAILURE;
}

export type ProjectActionTypes = CreateProjectSuccess &
    GetFullProjectSuccess &
    CreateSprintSuccess &
    CreateEpicSuccess &
    UpdateProjectSuccess &
    UpdateEpicSuccess &
    UpdateSprintSuccess &
    GetSprintsFromEpicSuccess &
    GetProjectMainPageDataSuccess &
    GetProjectSuccess &
    GetEpicsSuccess;
