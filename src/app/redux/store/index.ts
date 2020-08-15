import userReducer from '../reducers/user.reducer';
import storiesReducer from "../reducers/stories.reducer";
import sidebarReducer from "../reducers/sidebar.reducer";

export const ReducerNames = {
  users: 'users',
  stories: 'stories',
  sidebar: 'sidebar',
}

const Reducers = {
  [ReducerNames.users]: userReducer,
  [ReducerNames.stories]: storiesReducer,
  [ReducerNames.sidebar]: sidebarReducer,
}

export default Reducers;
