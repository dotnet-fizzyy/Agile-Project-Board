import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ReducerNames } from '../store';
import { ITeamState } from '../store/state';

const teamFeatureSelector = createFeatureSelector(ReducerNames.team);

export const getTeam = createSelector(teamFeatureSelector, (state: ITeamState) => state);
