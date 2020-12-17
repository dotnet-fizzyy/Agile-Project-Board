import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ReducerNames } from '../store';
import { ISidebarState } from '../store/state';

const sidebarFeatureSelector = createFeatureSelector(ReducerNames.sidebar);

export const GetIsOpenedSidebarSelector = createSelector(
    sidebarFeatureSelector,
    (state: ISidebarState) => state.isOpened
);
