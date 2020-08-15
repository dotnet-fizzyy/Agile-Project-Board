import { IStoriesState } from '../store/state';
import * as StoryActions from '../actions/stories.actions';

const initialState: IStoriesState = {
  stories: [],
}

export default function storiesReducer(state = initialState, action) {
  switch (action.type) {
    case StoryActions.StoryActions.GET_STORIES_SUCCESS:
      return handleGetStoriesSuccessAction(state, action);
    default:
      return state;
  }
}

function handleGetStoriesSuccessAction(state: IStoriesState, action: StoryActions.GetStoriesSuccessAction): IStoriesState {
  return {
    ...state,
    stories: action.payload,
  }
}
