import { IStory, IUser } from '../../utils/interfaces';
import { IEpic, IProject, ISprint } from './../../utils/interfaces/index';

export interface IUserState {
    currentUser?: IUser;
    users: IUser[];
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
}

export interface ILoaderState {
    isLoading: boolean;
}

export interface IProjectState {
    project?: IProject;
    epics: IEpic[];
    sprints: ISprint[];
}
