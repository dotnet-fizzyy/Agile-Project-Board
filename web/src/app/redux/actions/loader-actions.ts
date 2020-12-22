import { Action } from '@ngrx/store';

export const LoaderActions = {
    ENABLE_LOADING: '[loader] enable_loading',
    DISABLE_LOADING: '[loader] disable_loading',
};

export class SetLoadingEnabled implements Action {
    readonly type: string = LoaderActions.ENABLE_LOADING;
}

export class SetLoadingDisabled implements Action {
    readonly type: string = LoaderActions.DISABLE_LOADING;
}

export type LoadingActionTypes = SetLoadingEnabled | SetLoadingDisabled;
