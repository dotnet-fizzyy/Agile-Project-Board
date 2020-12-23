import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ReducerNames } from '../store';
import { IUserState } from '../store/state';

const SelectUsersFeature = createFeatureSelector(ReducerNames.users);

export const GetUsersSelector = createSelector(SelectUsersFeature, (state: IUserState) => state.users);

export const GetCurrentUser = createSelector(SelectUsersFeature, (state: IUserState) => state.currentUser);

export const GetUserByIdSelector = createSelector(SelectUsersFeature, (userId: string) => (state: IUserState) =>
    state.users.find((user) => user.userId === userId)
);
