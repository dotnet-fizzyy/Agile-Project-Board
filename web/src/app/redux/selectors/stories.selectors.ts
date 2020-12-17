import { createFeatureSelector, createSelector } from '@ngrx/store';
import { columnStoriesSorting } from '../../utils/helpers';
import { ReducerNames } from '../store';
import { IStoriesState } from '../store/state';

const SelectStoriesFeature = createFeatureSelector(ReducerNames.stories);

export const StoriesSelector = createSelector(SelectStoriesFeature, (state: IStoriesState) => state.stories);

export const GetColumnStories = createSelector(SelectStoriesFeature, (state: IStoriesState, props) =>
    state.stories.filter((story) => story.column === props.columnId).sort((a, b) => columnStoriesSorting(a, b))
);

export const GetCurrentStorySelector = createSelector(SelectStoriesFeature, (state: IStoriesState, props) =>
    state.stories.find((story) => story.id === props.storyId)
);
