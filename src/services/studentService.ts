// src/services/studentService.ts
import axios from 'axios';
import { Student } from '../types';

const API_BASE_URL = 'http://localhost:5000'; // Update with your backend URL

export const getStudents = async (): Promise<Student[]> => {
    const response = await axios.get(`${API_BASE_URL}/students`);
    return response.data;
};

export const addStudent = async (student: Student): Promise<void> => {
    await axios.post(`${API_BASE_URL}/students`, student);
};

export const updateStudent = async (student: Student): Promise<void> => {
    await axios.put(`${API_BASE_URL}/students/${student.id}`, student);
};
