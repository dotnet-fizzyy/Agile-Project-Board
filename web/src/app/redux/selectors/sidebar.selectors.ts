import { ISidebarState } from '../store/state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ReducerNames } from '../store';

const sidebarFeatureSelector = createFeatureSelector(ReducerNames.sidebar);

export const GetIsOpenedSidebarSelector = createSelector(
    sidebarFeatureSelector,
    (state: ISidebarState) => state.isOpened
);
