import * as types from '../actions/ActionsTypes';
import initialState from './InitialState';

export default function courseReducer(state = state = initialState.courses, action) {
    switch (action.type) {
        case types.LOAD_COURSES_SUCCESS:
            return action.courses;
        case types.CREATE_COURSES_SUCCESS:
            return [
                ...state,
                Object.assign({}, action.course)
            ];
        case types.UPDATE_COURSES_SUCCESS:
            return [
                ...state.filter(course => course.id !== action.course.id),
                Object.assign({}, action.course)
            ];
        default:
            return state;
    }
}