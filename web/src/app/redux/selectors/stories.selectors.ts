import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ReducerNames } from '../store';
import { IStoriesState } from '../store/state';

const SelectStoriesFeature = createFeatureSelector(ReducerNames.stories);

export const StoriesSelector = createSelector(SelectStoriesFeature, (state: IStoriesState) => state.stories);

export const GetColumnStories = createSelector(SelectStoriesFeature, (state: IStoriesState, props) =>
    state.stories.filter((story) => story.column === props.columnId)
);

export const GetCurrentStorySelector = createSelector(SelectStoriesFeature, (state: IStoriesState, props) =>
    state.stories.find((story) => story.storyId === props.storyId)
);

export const GetSelectedStory = createSelector(SelectStoriesFeature, (state: IStoriesState) => state.selectedStory);
