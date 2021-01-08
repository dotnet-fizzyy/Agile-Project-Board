import { createFeatureSelector, createSelector } from '@ngrx/store';
import { getTeamMembersDropdownItems } from '../../utils/helpers';
import { ReducerNames } from '../store';
import { ITeamState } from '../store/state';

const teamFeatureSelector = createFeatureSelector(ReducerNames.team);

export const getTeam = createSelector(teamFeatureSelector, (state: ITeamState) => state);

export const getTeamMembersForSelect = createSelector(teamFeatureSelector, (state: ITeamState) =>
    getTeamMembersDropdownItems(state.users)
);

export const getStoryOwner = createSelector(
    teamFeatureSelector,
    (state: ITeamState, userId: string) => state.users.find((x) => x.userId === userId).username
);
