import { IStory, IUser } from '../interfaces';

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
