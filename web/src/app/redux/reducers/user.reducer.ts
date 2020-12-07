import { IUserState } from '../store/state';
import * as UserActions from '../actions/user.actions';

const initialState: IUserState = {
    users: [],
};

export default function userReducer(state = initialState, action): IUserState {
    switch (action.type) {
        case UserActions.UserActions.GET_USERS_SUCCESS:
            return handleGetUsersAction(state, action);
        default:
            return state;
    }
}

function handleGetUsersAction(state: IUserState, action: UserActions.GetUsersSuccessAction): IUserState {
    return {
        ...state,
        users: action.payload,
    };
}
