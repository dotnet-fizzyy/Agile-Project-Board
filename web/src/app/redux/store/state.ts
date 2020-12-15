import { IStory, IUser } from '../../utils/interfaces';

export interface IUserState {
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
