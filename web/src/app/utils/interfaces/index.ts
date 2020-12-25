export interface ISelectItem {
    label: string;
    value: string;
}

export interface IUser {
    userId: string;
    teamId: string;
    username: string;
    userRole: string;
    avatarLink: string;
    isActive: boolean;
}

export interface IStory {
    id: string;
    title: string;
    column: string;
    isDefect: boolean;
    description: string;
    points?: number;
    columnIndex?: number;
    user?: string;
    isBlocked?: boolean;
    isReady?: boolean;
    blockReason?: string;
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
}

export interface IFullProjectDescription {
    project: IProject;
    epics: IEpic[];
}
