import {Action} from "@ngrx/store";

export const SidebarActions = {
  CHANGE_SIDEBAR_STATE: '[sidebar] change_sidebar_state',
}

export class ChangeSidebarStateAction implements Action {
  readonly type: string = SidebarActions.CHANGE_SIDEBAR_STATE;
  constructor(public payload: boolean) { }
}
