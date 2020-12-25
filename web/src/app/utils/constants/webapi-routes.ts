import { environment } from '../../../environments/environment';

export const MainRoutes = {
    USERS: environment.webApiUrl + '/user',
    STORIES: environment.webApiUrl + '/story',
    PROJECTS: environment.webApiUrl + '/project',
};

export const UserRoutes = {
    AUTHENTICATE_USER: MainRoutes.USERS + '/auth',
    CREATE_CUSTOMER: MainRoutes.USERS + '/customer',
};

export const ProjectRoutes = {
    CREATE_PROJECT: MainRoutes.PROJECTS + '/customer',
};
