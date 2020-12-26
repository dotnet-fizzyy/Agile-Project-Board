import * as moment from 'moment';
import { IStory, IUser } from '../interfaces';
import { IEpic, ISelectItem } from './../interfaces/index';

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

export const getCurrentDate = (): string => moment().format('yyyy-MM-DD');
