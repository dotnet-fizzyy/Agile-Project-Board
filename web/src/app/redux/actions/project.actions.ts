import { Action } from '@ngrx/store';
import { IProject } from './../../utils/interfaces/index';

export const ProjectActions = {
    GET_PROJECT_DESC_REQUEST: 'GET_PROJECT_DESC_REQUEST',
    GET_PROJECT_DESC_SUCCESS: 'GET_PROJECT_DESC_SUCCESS',
    GET_PROJECT_DESC_FAILURE: 'GET_PROJECT_DESC_FAILURE',
    CREATE_PROJECT_REQUEST: 'CREATE_PROJECT_REQUEST',
    CREATE_PROJECT_SUCCESS: 'CREATE_PROJECT_SUCCESS',
    CREATE_PROJECT_FAILURE: 'CREATE_PROJECT_FAILURE',
};

export class GetProjectRequest implements Action {
    readonly type: string = ProjectActions.GET_PROJECT_DESC_REQUEST;
}

export class GetProjectFailure implements Action {
    readonly type: string = ProjectActions.GET_PROJECT_DESC_SUCCESS;
}

export class GetProjectSuccess implements Action {
    constructor(public payload: Error) {}
    readonly type: string = ProjectActions.GET_PROJECT_DESC_FAILURE;
}

export class CreateProjectRequest implements Action {
    constructor(public project: IProject) {}
    readonly type: string = ProjectActions.CREATE_PROJECT_REQUEST;
}

export class CreateProjectSuccess implements Action {
    constructor(public project: IProject) {}
    readonly type: string = ProjectActions.CREATE_PROJECT_SUCCESS;
}

export class CreateProjectFailure implements Action {
    constructor(public error: Error) {}
    readonly type: string = ProjectActions.CREATE_PROJECT_FAILURE;
}

export type ProjectActionTypes = CreateProjectSuccess | GetProjectSuccess;
