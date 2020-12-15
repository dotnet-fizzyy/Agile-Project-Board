import { ILoginCreationsState } from '../store/state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ReducerNames } from '../store';

const loginRegistrationFeatureSelector = createFeatureSelector(ReducerNames.loginRegistration);

export const getIsRegistrationSuccessful = createSelector(
    loginRegistrationFeatureSelector,
    (state: ILoginCreationsState) => state.isRegistrationSuccessful
);

export const getIsSignInSuccessful = createSelector(
    loginRegistrationFeatureSelector,
    (state: ILoginCreationsState) => state.isSignInSuccessful
);
