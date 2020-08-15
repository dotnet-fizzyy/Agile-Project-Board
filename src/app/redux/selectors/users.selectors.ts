import { IUserState } from '../store/state';
import { ReducerNames } from '../store';
import { createFeatureSelector, createSelector } from "@ngrx/store";

const SelectUsersFeature = createFeatureSelector(ReducerNames.users);

export const UsersSelector = createSelector(SelectUsersFeature, (state: IUserState) => state.users);

export const GetCurrentUserSelector = createSelector(SelectUsersFeature,
  (userId: string) => (state: IUserState) => state.users.find(user => user.id === userId)
);
