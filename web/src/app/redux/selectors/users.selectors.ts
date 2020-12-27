import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ReducerNames } from '../store';
import { IUserState } from '../store/state';

const SelectUsersFeature = createFeatureSelector(ReducerNames.currentUser);

export const GetCurrentUser = createSelector(SelectUsersFeature, (state: IUserState) => state.currentUser);
