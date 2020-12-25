import { Action } from '@ngrx/store';
import { IEpic, IFullProjectDescription, IProject, ISprint } from './../../utils/interfaces/index';

export const ProjectActions = {
    GET_PROJECT_DESC_REQUEST: '[project] get_project_desc_request',
    GET_PROJECT_DESC_SUCCESS: '[project] get_project_desc_success',
    GET_PROJECT_DESC_FAILURE: '[project] get_project_desc_failure',
    CREATE_PROJECT_REQUEST: '[project] create_project_request',
    CREATE_PROJECT_SUCCESS: '[project] create_project_success',
    CREATE_PROJECT_FAILURE: '[project] create_project_failure',
    CREATE_EPIC_REQUEST: '[project] create_epic_request',
    CREATE_EPIC_SUCCESS: '[project] create_epic_success',
    CREATE_EPIC_FAILURE: '[project] create_epic_failure',
    CREATE_SPRINT_REQUEST: '[project] create_sprint_request',
    CREATE_SPRINT_SUCCESS: '[project] create_sprint_success',
    CREATE_SPRINT_FAILURE: '[project] create_sprint_failure',
};

export class GetProjectRequest implements Action {
    readonly type: string = ProjectActions.GET_PROJECT_DESC_REQUEST;
}

export class GetProjectFailure implements Action {
    constructor(public error: Error) {}
    readonly type: string = ProjectActions.GET_PROJECT_DESC_FAILURE;
}

export class GetProjectSuccess implements Action {
    constructor(public payload: IFullProjectDescription) {}
    readonly type: string = ProjectActions.GET_PROJECT_DESC_SUCCESS;
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

export type ProjectActionTypes = CreateProjectSuccess & GetProjectSuccess & CreateSprintSuccess & CreateEpicSuccess;
