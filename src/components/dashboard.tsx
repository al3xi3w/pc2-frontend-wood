import React, { useState, useEffect } from 'react';
import api from '../services/api';
import Card from './common/card';

interface StudentProfile {
  id: number;
  name: string;
  email: string;
  dni: string;
  // otros campos según la API
}

interface Subject {
  id: number;
  name: string;
}

const Dashboard: React.FC = () => {
  const [student, setStudent] = useState<StudentProfile | null>(null);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const studentId = localStorage.getItem('selectedStudentId');
      if (!studentId) return;

      try {
        setIsLoading(true);
        
        // Obtener perfil del estudiante
        const profileResponse = await api.get(`/students/${studentId}/`);
        setStudent(profileResponse.data);
        
        // Obtener materias inscritas
        const subjectsResponse = await api.get(`/enrollments/?student_id=${studentId}`);
        setSubjects(subjectsResponse.data);
        
      } catch (err) {
        setError('Error al cargar los datos');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;
  if (!student) return <div>No se encontró el estudiante</div>;

  return (
    <div>
      <h1>Dashboard</h1>
      
      <Card title="Información del Estudiante">
        <p>Nombre: {student.name}</p>
        <p>Email: {student.email}</p>
        <p>DNI: {student.dni}</p>
      </Card>
      
      <Card title="Materias Inscritas">
        <p>Cantidad: {subjects.length}</p>
        <ul>
          {subjects.map(subject => (
            <li key={subject.id}>{subject.name}</li>
          ))}
        </ul>
      </Card>
    </div>
  );
};

export default Dashboard;