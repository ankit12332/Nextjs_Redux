import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCourses } from "../store/coursesSlice";

export default function CoursesPage() {
    const dispatch = useDispatch();
    const courses = useSelector((state) => state.courses.courses);
    const status = useSelector((state) => state.courses.status);
    const error = useSelector((state) => state.courses.error);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchCourses());
        }
    }, [status, dispatch]);

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Courses Page</h1>
            {status === 'loading' ? (
                <div>Loading...</div>
            ) : status === 'failed' ? (
                <div>Error: {error}</div>
            ) : (
                <ul className="space-y-4">
                    {courses.map(course => (
                        <li key={course.id} className="p-4 rounded-lg shadow-lg bg-white">
                            <h2 className="text-xl font-semibold text-gray-700">{course.name}</h2>
                            <p className="text-gray-600">Department: {course.department}</p>
                            <p className="text-gray-600">Instructor: {course.instructor}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
