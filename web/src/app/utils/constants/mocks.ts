import { IStory } from '../interfaces';
import { ColumnIds } from './index';

export const mockedStories: IStory[] = [
    {
        storyId: 'US123456',
        title: 'Title 1',
        column: ColumnIds.TODO,
        isDefect: false,
        description: 'This is a simple description',
    },
    {
        storyId: 'US654321',
        title: 'Hello world',
        column: ColumnIds.PROGRESS,
        isDefect: false,
        description: 'There should be some description',
        userId: 'Igor Zolotnik',
    },
];
