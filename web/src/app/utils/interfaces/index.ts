import { ModalType } from '../constants';

export interface ISelectItem {
    label: string;
    value: string;
}

export interface IUser {
    userId?: string;
    teamId?: string;
    username: string;
    userRole: string;
    avatarLink?: string;
    isActive: boolean;
    password?: string;
}

export interface IStory {
    storyId?: string;
    title: string;
    column: string;
    isDefect: boolean;
    description: string;
    estimation?: number;
    userId?: string;
    isBlocked?: boolean;
    isReady?: boolean;
    blockReason?: string;
    sprintId?: string;
}

export interface IAuthenticationUser {
    username: string;
    password: string;
}

export interface IProject {
    projectId?: string;
    projectName: string;
    startDate: Date;
    endDate: Date;
    customerId?: string;
}

export interface IEpic {
    epicId?: string;
    projectId?: string;
    epicName: string;
    startDate: Date;
    endDate: Date;
}

export interface ISprint {
    sprintId?: string;
    epicId?: string;
    sprintName: string;
    startDate: Date;
    endDate: Date;
    stories?: IStory[];
}

export interface IFullProjectDescription {
    project: IProject;
    epics: IEpic[];
}

export interface ITeam {
    teamId?: string;
    name: string;
    projectId: string;
    location: string;
    users?: IUser[];
}

export interface IModalData {
    type: ModalType;
    data: ISprint | IEpic | IProject | ITeam | IUser;
}

export interface IValidationMessage {
    length?: number;
    maxValue?: number;
    minValue?: number;
    regex?: string;
}

export interface IUpdateUserStatus {
    userId: string;
    isActive: boolean;
}

export interface ITeamManagementModel {
    project: IProject;
    team: ITeam;
}

export interface IUpdateStoryColumn {
    storyId: string;
    column: string;
}
