import { IStory } from '../interfaces';
import { ColumnIds } from './index';

export const mockedStories: IStory[] = [
    {
        storyId: '123456',
        title: 'Title 1',
        column: ColumnIds.TODO,
        isDefect: false,
        isReady: true,
        isBlocked: false,
        description: 'This is a simple description',
        estimation: 1,
        sprintId: '123',
    },
    {
        storyId: '654321',
        title: 'Hello world',
        column: ColumnIds.PROGRESS,
        isDefect: false,
        isBlocked: true,
        isReady: false,
        blockReason: 'Test block',
        description: 'There should be some description',
        userId: 'Igor Zolotnik',
        estimation: 2,
        sprintId: '123',
    },
];
