// src/components/EditStudent.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Student } from '../types';
import { getStudents, updateStudent } from '../services/studentService';

const EditStudent: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [student, setStudent] = useState<Student | null>(null);

    useEffect(() => {
        const fetchStudent = async () => {
            const students = await getStudents();
            const foundStudent = students.find((s) => s.id === Number(id));
            setStudent(foundStudent || null);
        };
        fetchStudent();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (student) {
            const { name, value } = e.target;
            setStudent({ ...student, [name]: value });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (student) {
            await updateStudent(student);
            navigate('/');
        }
    };

    if (!student) return <p>Loading...</p>;

    return (
        <div>
            <h2>Edit Student</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="firstName" value={student.firstName} onChange={handleChange} required />
                <input type="text" name="lastName" value={student.lastName} onChange={handleChange} required />
                <input type="email" name="email" value={student.email} onChange={handleChange} required />
                <input type="text" name="yearOfEnrollment" value={student.yearOfEnrollment} onChange={handleChange} required />
                <button type="submit">Update Student</button>
            </form>
        </div>
    );
};

export default EditStudent;
