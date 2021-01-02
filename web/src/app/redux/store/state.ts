import { IStory, IUser } from '../../utils/interfaces';
import { IEpic, IProject, ISprint } from './../../utils/interfaces/index';

export interface IUserState {
    currentUser?: IUser;
}

export interface IStoriesState {
    stories: IStory[];
    selectedStory: IStory;
}

export interface ISidebarState {
    isOpened: boolean;
}

export interface ILoginCreationsState {
    isSignInSuccessful?: boolean;
    isRegistrationSuccessful?: boolean;
}

export interface IStoreState {
    user: IUserState;
    story: IStoriesState;
    sidebar: ISidebarState;
    loginRegistration: ILoginCreationsState;
    team: ITeamState;
}

export interface ILoaderState {
    isLoading: boolean;
}

export interface IProjectState {
    project?: IProject;
    epics: IEpic[];
    sprints: ISprint[];
}

export interface ITeamState {
    teamId: string;
    name: string;
    projectId: string;
    location: string;
    users: IUser[];
}
