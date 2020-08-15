import { Action } from "@ngrx/store";
import { IUser } from "../../utils/interfaces";

export const UserActions = {
  GET_USERS_REQUEST: '[users] get_users_request',
  GET_USERS_SUCCESS: '[users] get_users_success',
}

export class GetUsersRequestAction implements Action {
  readonly type: string = UserActions.GET_USERS_REQUEST;
}

export class GetUsersSuccessAction implements Action {
  readonly type: string = UserActions.GET_USERS_SUCCESS;
  constructor(public payload: IUser[]) {
  }
}

export type UserActionTypes = GetUsersRequestAction | GetUsersSuccessAction;
