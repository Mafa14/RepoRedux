import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as courseActions from '../../actions/CourseActions';
import CourseList from './CourseList';
import { browserHistory } from 'react-router';
import { getCourseById } from '../selectors/selectors';
import toastr from 'toastr';

class CoursesPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.redirectToAddCoursePage = this.redirectToAddCoursePage.bind(this);
        this.deleteCourse = this.deleteCourse.bind(this);
    }

    courseRow(course, index) {
        return <div key={index}>{course.title}</div>;
    }

    redirectToAddCoursePage() {
        browserHistory.push('/course');
    }

    deleteCourse(event) {
        event.preventDefault();
        const courseId = event.target.id;
        if (courseId) {
            let course = getCourseById(this.props.courses, courseId);
            this.props.actions.deleteCourse(course)
                .then(() => {
                    toastr.success('Course deleted');
                })
                .catch(error => {
                    toastr.error(error);
                });
        }
    }

    render() {
        const { courses } = this.props;

        return (
            <div>
                <h1>Courses</h1>
                <input
                    type="submit"
                    value="Add Course"
                    className="btn btn-primary"
                    onClick={this.redirectToAddCoursePage} />
                {courses.length > 0 ? <CourseList courses={courses} onDelete={this.deleteCourse} /> : null}
            </div>
        );
    }
}

CoursesPage.propTypes = {
    courses: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    function compareCourses(a, b) {
        if (a.title.toUpperCase() < b.title.toUpperCase())
            return -1;
        if (a.title.toUpperCase() > b.title.toUpperCase())
            return 1;
        return 0;
    }

    state.courses.sort(compareCourses);
    let orderedCourses = [...state.courses];

    return {
        courses: orderedCourses
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(courseActions, dispatch)
    };
}

// connect return a function that is use to call CoursesPage function that is why we have two ().
export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);