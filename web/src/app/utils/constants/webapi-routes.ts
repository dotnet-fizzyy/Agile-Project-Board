import { environment } from '../../../environments/environment';

export const MainRoutes = {
    USERS: environment.webApiUrl + '/user',
    STORIES: environment.webApiUrl + '/story',
};

export const UserRoutes = {
    AUTHENTICATE_USER: MainRoutes.USERS + '/auth',
    CREATE_CUSTOMER: MainRoutes.USERS + '/customer',
};
