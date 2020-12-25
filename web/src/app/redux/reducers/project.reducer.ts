import * as ProjectActionTypes from '../actions/project.actions';
import { IProjectState } from './../store/state';

const initialState: IProjectState = {
    project: null,
    epics: [],
    sprints: [],
};

export default function projectReducer(
    state = initialState,
    action: ProjectActionTypes.ProjectActionTypes
): IProjectState {
    switch (action.type) {
        default:
            return state;
    }
}
