import { Action } from "@ngrx/store";
import { IStory } from "../../utils/interfaces";

export const StoryActions = {
  GET_STORIES_REQUEST: '[stories] get_stories_request',
  GET_STORIES_SUCCESS: '[stories] get_stories_success',
}

export class GetStoriesRequestAction implements Action {
  readonly type: string = StoryActions.GET_STORIES_REQUEST;
}

export class GetStoriesSuccessAction implements Action {
  readonly type: string = StoryActions.GET_STORIES_SUCCESS;
  constructor(public payload: IStory[]) {
  }
}

export type UserActionTypes = GetStoriesRequestAction | GetStoriesSuccessAction;
