import loaderReducer from '../reducers/loader.reducer';
import loginRegistrationReducer from '../reducers/loginRegistration.reducer';
import projectReducer from '../reducers/project.reducer';
import sidebarReducer from '../reducers/sidebar.reducer';
import storiesReducer from '../reducers/stories.reducer';
import teamReducer from '../reducers/team.reducer';
import userReducer from '../reducers/user.reducer';

export const ReducerNames = {
    project: 'project',
    currentUser: 'currentUser',
    team: 'team',
    stories: 'stories',
    sidebar: 'sidebar',
    loginRegistration: 'loginRegistration',
    loader: 'loader',
};

const Reducers = {
    [ReducerNames.project]: projectReducer,
    [ReducerNames.currentUser]: userReducer,
    [ReducerNames.stories]: storiesReducer,
    [ReducerNames.sidebar]: sidebarReducer,
    [ReducerNames.loginRegistration]: loginRegistrationReducer,
    [ReducerNames.loader]: loaderReducer,
    [ReducerNames.team]: teamReducer,
};

export default Reducers;
