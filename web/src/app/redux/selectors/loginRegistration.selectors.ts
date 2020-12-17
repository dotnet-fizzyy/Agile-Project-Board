import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ReducerNames } from '../store';
import { ILoginCreationsState } from '../store/state';

const loginRegistrationFeatureSelector = createFeatureSelector(ReducerNames.loginRegistration);

export const getIsRegistrationSuccessful = createSelector(
    loginRegistrationFeatureSelector,
    (state: ILoginCreationsState) => state.isRegistrationSuccessful
);

export const getIsSignInSuccessful = createSelector(
    loginRegistrationFeatureSelector,
    (state: ILoginCreationsState) => state.isSignInSuccessful
);
