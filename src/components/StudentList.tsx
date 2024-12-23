// src/components/StudentList.tsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Student } from '../types';
import { getStudents } from '../services/studentService';

const StudentList: React.FC = () => {
    const [students, setStudents] = useState<Student[]>([]);

    useEffect(() => {
        const fetchStudents = async () => {
            const data = await getStudents();
            setStudents(data);
        };
        fetchStudents();
    }, []);

    return (
        <div>
            <h2>Student List</h2>
            <ul>
                {students.map((student) => (
                    <li key={student.id}>
                        {student.firstName} {student.lastName} - {student.email}
                        <Link to={`/edit/${student.id}`}>Edit</Link>
                    </li>
                ))}
            </ul>
            <Link to="/add">Add Student</Link>
        </div>
    );
};

export default StudentList;
