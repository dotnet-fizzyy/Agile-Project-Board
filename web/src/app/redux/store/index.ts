import loaderReducer from '../reducers/loader.reducer';
import loginRegistrationReducer from '../reducers/loginRegistration.reducer';
import sidebarReducer from '../reducers/sidebar.reducer';
import storiesReducer from '../reducers/stories.reducer';
import userReducer from '../reducers/user.reducer';

export const ReducerNames = {
    users: 'users',
    stories: 'stories',
    sidebar: 'sidebar',
    loginRegistration: 'loginRegistration',
    loader: 'loader',
};

const Reducers = {
    [ReducerNames.users]: userReducer,
    [ReducerNames.stories]: storiesReducer,
    [ReducerNames.sidebar]: sidebarReducer,
    [ReducerNames.loginRegistration]: loginRegistrationReducer,
    [ReducerNames.loader]: loaderReducer,
};

export default Reducers;
