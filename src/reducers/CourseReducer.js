import * as types from '../actions/ActionsTypes';
import initialState from './InitialState';

export default function courseReducer(state = state = initialState.courses, action) {
    switch (action.type) {
        case types.LOAD_COURSES_SUCCESS:
            return action.courses;
        default:
            return state;
    }
}