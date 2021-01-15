import { SidebarActionTypes } from '../actions/sidebar.actions';
import * as SidebarActions from '../actions/sidebar.actions';
import { ISidebarState } from '../store/state';

const initialState: ISidebarState = {
    isOpened: false,
};

export default function sidebarReducer(state = initialState, action: SidebarActionTypes): ISidebarState {
    switch (action.type) {
        case SidebarActions.SidebarActions.CHANGE_SIDEBAR_STATE:
            return handleChangeSidebarStateAction(state, action);
        default:
            return state;
    }
}

function handleChangeSidebarStateAction(
    state: ISidebarState,
    action: SidebarActions.ChangeSidebarState
): ISidebarState {
    return {
        ...state,
        isOpened: action.payload,
    };
}
