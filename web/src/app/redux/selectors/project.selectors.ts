import { createFeatureSelector, createSelector } from '@ngrx/store';
import { getEpicsDropdownItems } from 'src/app/utils/helpers';
import { ReducerNames } from './../store/index';
import { IProjectState } from './../store/state';

const projectFeatureSelector = createFeatureSelector(ReducerNames.project);

export const getProject = createSelector(projectFeatureSelector, (state: IProjectState) => state.project);

export const getSprints = createSelector(projectFeatureSelector, (state: IProjectState) => state.sprints);

export const getEpics = createSelector(projectFeatureSelector, (state: IProjectState) => state.epics);

export const getEpicsForSelect = createSelector(projectFeatureSelector, (state: IProjectState) =>
    getEpicsDropdownItems(state.epics)
);
