// WebAPI routes
export const MainRoute = 'http://localhost:5001';

export const MainRoutes = {
    USERS: MainRoute + '/user',
    STORIES: MainRoute + '/story',
};

export const UserRoutes = {
    AUTHENTICATE_USER: MainRoutes.USERS + '/auth',
    CREATE_CUSTOMER: MainRoutes.USERS + '/customer',
};

// UI routes
export const UiRoutes = {
    HOME: '',
    SIGN_IN: 'sign-in',
    REGISTRATION: 'registration',
    TEAM: 'team',
    PROJECT: 'project',
};
