import { IStory } from '../interfaces';

export function columnStoriesSorting(a: IStory, b: IStory): number {
    if (a.columnIndex > b.columnIndex) {
        return 1;
    } else {
        return -1;
    }
}
