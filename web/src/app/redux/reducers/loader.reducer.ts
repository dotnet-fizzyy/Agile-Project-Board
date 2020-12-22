import * as LoaderActions from '../actions/loader-actions';
import { ILoaderState } from '../store/state';

const initialState: ILoaderState = {
    isLoading: false,
};

export default function loaderReducer(state = initialState, action: LoaderActions.LoadingActionTypes): ILoaderState {
    switch (action.type) {
        case LoaderActions.LoaderActions.ENABLE_LOADING:
            return handleSetLoaderEnabled(state);
        case LoaderActions.LoaderActions.DISABLE_LOADING:
            return handleSetLoaderDisabled(state);
        default:
            return state;
    }
}

function handleSetLoaderEnabled(state: ILoaderState): ILoaderState {
    return {
        ...state,
        isLoading: true,
    };
}

function handleSetLoaderDisabled(state: ILoaderState): ILoaderState {
    return {
        ...state,
        isLoading: false,
    };
}
