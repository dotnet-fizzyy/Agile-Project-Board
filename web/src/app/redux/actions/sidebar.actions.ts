import { Action } from '@ngrx/store';

export const SidebarActions = {
    CHANGE_SIDEBAR_STATE: '[sidebar] change_sidebar_state',
};

export class ChangeSidebarState implements Action {
    constructor(public payload: boolean) {}
    readonly type: string = SidebarActions.CHANGE_SIDEBAR_STATE;
}

export type SidebarActionTypes = ChangeSidebarState;
