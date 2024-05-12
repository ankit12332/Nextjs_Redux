import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchStudents } from "../store/studentsSlice";

export default function StudentsPage() {
    const dispatch = useDispatch();
    const students = useSelector((state) => state.students.students);
    const status = useSelector((state) => state.students.status);
    const error = useSelector((state) => state.students.error);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchStudents());
        }
    }, [status, dispatch]);

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Students Page</h1>
            {status === 'loading' ? (
                <div>Loading...</div>
            ) : status === 'failed' ? (
                <div>Error: {error}</div>
            ) : (
                <ul className="space-y-4">
                    {students.map(student => (
                        <li key={student.id} className="p-4 rounded-lg shadow-lg bg-white">
                            <h2 className="text-xl font-semibold text-gray-700">{student.name}</h2>
                            <p className="text-gray-600">{student.age} years old, {student.grade}</p>
                            <p className="text-gray-600">Majoring in {student.major}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
