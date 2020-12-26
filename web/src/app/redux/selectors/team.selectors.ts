import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ReducerNames } from './../store/index';
import { ITeamState } from './../store/state';

const teamFeautureSelector = createFeatureSelector(ReducerNames.team);

export const getTeam = createSelector(teamFeautureSelector, (state: ITeamState) => state);
