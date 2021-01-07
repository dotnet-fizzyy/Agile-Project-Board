import * as StoryActions from '../actions/stories.actions';
import { IStoriesState } from '../store/state';

const initialState: IStoriesState = {
    stories: [],
    selectedStory: null,
};

export default function storiesReducer(state = initialState, action): IStoriesState {
    switch (action.type) {
        case StoryActions.StoryActions.GET_STORIES_SUCCESS:
            return handleGetStoriesSuccessAction(state, action);
        case StoryActions.StoryActions.VIEW_STORY_DETAILS:
            return handleViewStoryDetailsAction(state, action);
        case StoryActions.StoryActions.CHANGE_STORY_COLUMN:
            return handleChangeStoryColumnAction(state, action);
        case StoryActions.StoryActions.CREATE_STORY_SUCCESS:
            return handleCreateStorySuccess(state, action);
        default:
            return state;
    }
}

function handleGetStoriesSuccessAction(
    state: IStoriesState,
    action: StoryActions.GetStoriesSuccessAction
): IStoriesState {
    return {
        ...state,
        stories: action.payload,
    };
}

function handleViewStoryDetailsAction(
    state: IStoriesState,
    action: StoryActions.ViewStoryDetailsAction
): IStoriesState {
    return {
        ...state,
        selectedStory: state.stories.find((story) => story.storyId === action.payload),
    };
}

function handleChangeStoryColumnAction(
    state: IStoriesState,
    action: StoryActions.ChangeStoryColumnAction
): IStoriesState {
    return {
        ...state,
        stories: state.stories.map((story) => {
            return story.storyId === action.payload.storyId
                ? {
                      ...story,
                      column: action.payload.storyColumn,
                  }
                : {
                      ...story,
                  };
        }),
    };
}

function handleCreateStorySuccess(state: IStoriesState, action: StoryActions.CreateStorySuccessAction): IStoriesState {
    return {
        ...state,
        stories: state.stories.concat(action.payload),
    };
}
