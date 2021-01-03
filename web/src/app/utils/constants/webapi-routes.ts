import { environment } from '../../../environments/environment';

export const MainRoutes = {
    USERS: environment.webApiUrl + '/user',
    STORIES: environment.webApiUrl + '/story',
    PROJECTS: environment.webApiUrl + '/project',
    SPRINTS: environment.webApiUrl + '/sprint',
    EPICS: environment.webApiUrl + '/epic',
    TEAMS: environment.webApiUrl + '/team',
};

export const UserRoutes = {
    AUTHENTICATE_USER: MainRoutes.USERS + '/auth',
    CREATE_CUSTOMER: MainRoutes.USERS + '/customer',
    ADD_USER: MainRoutes.USERS,
    UPDATE_USER: MainRoutes.USERS,
    UPDATE_USER_STATUS: MainRoutes.USERS + '/status',
};

export const ProjectRoutes = {
    GET_CUSTOMER_PROJECT: MainRoutes.PROJECTS + '/customer',
    CREATE_PROJECT: MainRoutes.PROJECTS,
    UPDATE_PROJECT: MainRoutes.PROJECTS,
    GET_MAIN_PAGE_DATA: MainRoutes.PROJECTS + '/main',
};

export const SprintRoutes = {
    CREATE_SPRINT: MainRoutes.SPRINTS,
    GET_EPIC_SPRINTS: MainRoutes.SPRINTS + '/epic/',
    UPDATE_SPRINT: MainRoutes.SPRINTS,
};

export const EpicRoutes = {
    CREATE_EPIC: MainRoutes.EPICS,
    UPDATE_EPIC: MainRoutes.EPICS,
};

export const TeamRoutes = {
    GET_CUSTOMER_TEAM: MainRoutes.TEAMS + '/management',
    CREATE_TEAM: MainRoutes.TEAMS + '/customer',
    UPDATE_TEAM: MainRoutes.TEAMS,
};
