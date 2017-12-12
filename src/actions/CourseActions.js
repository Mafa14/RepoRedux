import * as types from './ActionsTypes';

export function createCourse(course) {
    return { type: types.CREATE_COURSE, course };
}