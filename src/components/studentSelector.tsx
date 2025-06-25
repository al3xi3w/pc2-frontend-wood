import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

interface Student {
  id: number;
  name: string;
  email: string;
}

const StudentSelector: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await api.get('/students/');
        setStudents(response.data);
      } catch (err) {
        setError('Error al cargar los estudiantes');
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const handleSelectStudent = (studentId: number) => {
    localStorage.setItem('selectedStudentId', studentId.toString());
    navigate('/dashboard');
  };

  if (isLoading) return <div>Cargando estudiantes...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Selecciona un estudiante</h2>
      <ul>
        {students.map((student) => (
          <li key={student.id}>
            <button onClick={() => handleSelectStudent(student.id)}>
              {student.name} - {student.email}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentSelector;