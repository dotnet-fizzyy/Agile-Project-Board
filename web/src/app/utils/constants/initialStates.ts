import { IEpic, IProject, ISprint, ITeam, IUser } from '../interfaces';

export const sprintInitialState: ISprint = {
    sprintName: '',
    endDate: new Date(),
    startDate: new Date(),
};

export const epicInitialState: IEpic = {
    epicName: '',
    endDate: new Date(),
    startDate: new Date(),
};

export const projectInitialState: IProject = {
    projectName: '',
    endDate: new Date(),
    startDate: new Date(),
};

export const teamInitialState: ITeam = {
    location: '',
    projectId: '',
    name: '',
};

export const teamMemberInitialState: IUser = {
    isActive: true,
    userRole: '',
    username: '',
    password: '',
};
