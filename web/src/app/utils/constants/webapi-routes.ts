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
    CREATE_PROJECT: MainRoutes.PROJECTS + '/customer',
    CREATE_SPRINT: '',
    CREATE_EPIC: '',
    UPDATE_PROJECT: '',
    UPDATE_EPIC: '',
    UPDATE_SPRINT: '',
    GET_EPIC_SPRINTS: '',
};

export const SprintRoutes = {
    CREATE_SPRINT: MainRoutes.SPRINTS,
};

export const EpicRoutes = {
    CREATE_EPIC: MainRoutes.EPICS,
};

export const TeamRoutes = {
    CREATE_TEAM: MainRoutes.TEAMS,
    CREATE_TEAM_MEMBER: '',
    UPDATE_TEAM: '',
    UPDATE_TEAM_MEMBER: '',
    UPDATE_TEAM_MEMBER_STATUS: '',
};
