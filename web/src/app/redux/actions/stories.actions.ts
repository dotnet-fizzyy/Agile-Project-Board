import { Action } from '@ngrx/store';
import { IStory } from '../../utils/interfaces';

export const StoryActions = {
    GET_STORIES_REQUEST: '[stories] get_stories_request',
    GET_STORIES_SUCCESS: '[stories] get_stories_success',
    VIEW_STORY_DETAILS: '[stories] view_story_details',
    CHANGE_STORY_COLUMN: '[stories] change_story_column',
    SET_STORY_READY_STATUS: '[stories] set_story_ready_status',
    SET_STORY_BLOCKED_STATUS: '[stories] set_story_blocked_status',
    CREATE_STORY_REQUEST: '[stories] create_story_request',
    CREATE_STORY_SUCCESS: '[stories] create_story_success',
    CREATE_STORY_FAILURE: '[stories] create_story_failure',
    CHANGE_STORY_COLUMN_SUCCESS: '[stories] change_story_column_success',
    CHANGE_STORY_COLUMN_FAILURE: '[stories] change_story_column_failure',
    UPDATE_STORY_REQUEST: '[stories] update_story_request',
    UPDATE_STORY_SUCCESS: '[stories] update_story_success',
    UPDATE_STORY_FAILURE: '[stories] update_story_failure',
};

export class GetStoriesRequestAction implements Action {
    readonly type: string = StoryActions.GET_STORIES_REQUEST;
}

export class GetStoriesSuccessAction implements Action {
    readonly type: string = StoryActions.GET_STORIES_SUCCESS;
    constructor(public payload: IStory[]) {}
}

export class ViewStoryDetailsAction implements Action {
    readonly type: string = StoryActions.VIEW_STORY_DETAILS;
    constructor(public payload: string) {}
}

export class CreateStoryRequestAction implements Action {
    constructor(public payload: IStory) {}
    readonly type: string = StoryActions.CREATE_STORY_REQUEST;
}

export class CreateStorySuccessAction implements Action {
    constructor(public payload: IStory) {}
    readonly type: string = StoryActions.CREATE_STORY_SUCCESS;
}

export class CreateStoryFailureAction implements Action {
    constructor(public error: Error) {}
    readonly type: string = StoryActions.CREATE_STORY_FAILURE;
}

export class ChangeStoryColumnAction implements Action {
    readonly type: string = StoryActions.CHANGE_STORY_COLUMN;
    constructor(
        public payload: {
            storyId: string;
            storyColumn: string;
            oldColumn: string;
            newColumnIndex: number;
        }
    ) {}
}

export class ChangeStorySuccess implements Action {
    readonly type: string = StoryActions.CHANGE_STORY_COLUMN_SUCCESS;
}

export class ChangeStoryFailure implements Action {
    constructor(public error: Error) {}
    readonly type: string = StoryActions.CHANGE_STORY_COLUMN_FAILURE;
}

export class UpdateStoryRequest implements Action {
    constructor(public story: IStory) {}
    readonly type: string = StoryActions.UPDATE_STORY_REQUEST;
}

export class UpdateStorySuccess implements Action {
    constructor(public story: IStory) {}
    readonly type: string = StoryActions.UPDATE_STORY_SUCCESS;
}

export class UpdateStoryFailure implements Action {
    constructor(public error: Error) {}
    readonly type: string = StoryActions.UPDATE_STORY_FAILURE;
}

export type UserActionTypes = GetStoriesRequestAction & GetStoriesSuccessAction;
