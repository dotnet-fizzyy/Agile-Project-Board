import { getUser } from 'src/app/utils/helpers';
import * as UserActions from '../actions/user.actions';
import { IUserState } from '../store/state';

const initialState: IUserState = {
    currentUser: getUser() || {
        userId: '',
        username: '',
        userRole: '',
        isActive: false,
    },
};

export default function userReducer(state = initialState, action): IUserState {
    switch (action.type) {
        case UserActions.UserActions.LOGOUT_USER:
            return handleLogOutUser(state);
        default:
            return state;
    }
}

function handleLogOutUser(state: IUserState): IUserState {
    return {
        ...state,
        currentUser: {
            userId: '',
            username: '',
            userRole: '',
            isActive: false,
        },
    };
}
