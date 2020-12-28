import * as moment from 'moment';
import { UserRoles } from '../constants';
import { IEpic, ISelectItem, IStory, IUser } from '../interfaces';

export function columnStoriesSorting(a: IStory, b: IStory): number {
    if (a.columnIndex > b.columnIndex) {
        return 1;
    } else {
        return -1;
    }
}

export function isUserAuthenticated(): boolean {
    return !!localStorage.getItem('user');
}

export function getUser(): IUser {
    const jsonUser = localStorage.getItem('user');

    return JSON.parse(jsonUser);
}

export const nameof = <T>(name: keyof T) => name;

export function getEpicsDropdownItems(epics: IEpic[]): ISelectItem[] {
    return epics.map((x) => {
        return {
            value: x.epicId,
            label: x.epicName,
        } as ISelectItem;
    });
}

export function getUserRolesDropdownItems(): ISelectItem[] {
    return Object.entries(UserRoles).map((x) => {
        return {
            value: x[0],
            label: x[1],
        } as ISelectItem;
    });
}

export const getFormattedDate = (date: Date): string => moment(date).format('yyyy-MM-DD');

export const matchToRegex = (value: string): boolean => new RegExp('^[a-zA-Z0-9_]*$').test(value);
