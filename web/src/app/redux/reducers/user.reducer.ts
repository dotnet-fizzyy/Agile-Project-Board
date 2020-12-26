import { getUser } from 'src/app/utils/helpers';
import { IUserState } from '../store/state';

const initialState: IUserState = {
    currentUser: getUser() || null,
};

export default function userReducer(state = initialState, action): IUserState {
    switch (action.type) {
        default:
            return state;
    }
}
