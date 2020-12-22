import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ReducerNames } from '../store';
import { ILoaderState } from '../store/state';

const loaderFeature = createFeatureSelector(ReducerNames.loader);

export const getIsLoading = createSelector(loaderFeature, (state: ILoaderState) => state.isLoading);
