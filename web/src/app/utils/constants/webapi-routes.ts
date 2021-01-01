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
};

export const ProjectRoutes = {
    CREATE_PROJECT: MainRoutes.PROJECTS,
    UPDATE_PROJECT: MainRoutes.PROJECTS,
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
    CREATE_TEAM: MainRoutes.TEAMS,
    CREATE_TEAM_MEMBER: '',
    UPDATE_TEAM: '',
    UPDATE_TEAM_MEMBER: '',
    UPDATE_TEAM_MEMBER_STATUS: '',
};
