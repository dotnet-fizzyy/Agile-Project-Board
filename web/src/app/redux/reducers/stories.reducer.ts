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
        selectedStory: state.stories.find((story) => story.id === action.payload),
    };
}

function handleChangeStoryColumnAction(
    state: IStoriesState,
    action: StoryActions.ChangeStoryColumnAction
): IStoriesState {
    return {
        ...state,
        stories: state.stories.map((story) => {
            return story.id === action.payload.storyId
                ? {
                      ...story,
                      column: action.payload.storyColumn,
                      columnIndex: action.payload.newColumnIndex,
                  }
                : {
                      ...story,
                      columnIndex:
                          story.column === action.payload.storyColumn &&
                          story.columnIndex >= action.payload.newColumnIndex
                              ? story.columnIndex + 1
                              : story.column === action.payload.oldColumn &&
                                story.columnIndex >= action.payload.newColumnIndex &&
                                story.columnIndex !== 0
                              ? story.columnIndex - 1
                              : story.columnIndex,
                  };
        }),
    };
}
