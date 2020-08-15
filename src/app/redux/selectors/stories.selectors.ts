import { IStoriesState } from '../store/state';
import { ReducerNames } from '../store';
import { createFeatureSelector, createSelector } from "@ngrx/store";

const SelectStoriesFeature = createFeatureSelector(ReducerNames.stories);

export const StoriesSelector = createSelector(SelectStoriesFeature, (state: IStoriesState) => state.stories);

export const GetCurrentStorySelector = createSelector(SelectStoriesFeature,
  (storyId: string) => (state: IStoriesState) => state.stories.find(story => story.id === storyId)
);
