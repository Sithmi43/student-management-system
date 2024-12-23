import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Student } from '../types';
import { addStudent } from '../services/studentService';

const AddStudent: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<Student>({
        id: 0, // This can be auto-generated by the backend
        firstName: '',
        lastName: '',
        email: '',
        department: 'Statistics & Computer Science',
        yearOfEnrollment: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await addStudent(formData); // Call the addStudent service
            navigate('/'); // Redirect to the list page after success
        } catch (error) {
            console.error('Failed to add student:', error);
        }
    };

    return (
        <div>
            <h2>Add Student</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="yearOfEnrollment"
                    placeholder="Year of Enrollment"
                    value={formData.yearOfEnrollment}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Add Student</button>
            </form>
        </div>
    );
};

export default AddStudent;