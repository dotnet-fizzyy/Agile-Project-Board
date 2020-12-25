import { environment } from '../../../environments/environment';

export const MainRoutes = {
    USERS: environment.webApiUrl + '/user',
    STORIES: environment.webApiUrl + '/story',
    PROJECTS: environment.webApiUrl + '/project',
    SPRINTS: environment.webApiUrl + '/sprint',
    EPICS: environment.webApiUrl + '/epic',
};

export const UserRoutes = {
    AUTHENTICATE_USER: MainRoutes.USERS + '/auth',
    CREATE_CUSTOMER: MainRoutes.USERS + '/customer',
};

export const ProjectRoutes = {
    CREATE_PROJECT: MainRoutes.PROJECTS + '/customer',
};

export const SprintRoutes = {
    CREATE_SPRINT: MainRoutes.SPRINTS,
};

export const EpicRoutes = {
    CREATE_EPIC: MainRoutes.EPICS,
};
