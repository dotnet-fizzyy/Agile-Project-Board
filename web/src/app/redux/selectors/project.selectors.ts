import { createFeatureSelector, createSelector } from '@ngrx/store';
import { getEpicsDropdownItems, getSprintsDropdownItems } from 'src/app/utils/helpers';
import { ReducerNames } from '../store';
import { IProjectState } from '../store/state';

const projectFeatureSelector = createFeatureSelector(ReducerNames.project);

export const getProject = createSelector(projectFeatureSelector, (state: IProjectState) => state.project);

export const getSprints = createSelector(projectFeatureSelector, (state: IProjectState) => state.sprints);

export const getEpics = createSelector(projectFeatureSelector, (state: IProjectState) => state.epics);

export const getEpicsForSelect = createSelector(projectFeatureSelector, (state: IProjectState) =>
    getEpicsDropdownItems(state.epics)
);

export const getSprintsForSelect = createSelector(projectFeatureSelector, (state: IProjectState) =>
    getSprintsDropdownItems(state.sprints)
);
