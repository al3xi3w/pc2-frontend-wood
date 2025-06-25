import React, { useState, useEffect } from 'react';
import api from '../services/api';
import Card from './common/card';
import Table from './common/table';

interface Subject {
  id: number;
  name: string;
  code: string;
  location: string;
}

const SubjectsList: React.FC = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [filter, setFilter] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSubjects = async () => {
      const studentId = localStorage.getItem('selectedStudentId');
      if (!studentId) return;

      try {
        setIsLoading(true);
        const response = await api.get(`/enrollments/?student_id=${studentId}`);
        setSubjects(response.data);
      } catch (err) {
        setError('Error al cargar las materias');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubjects();
  }, []);

  const filteredSubjects = subjects.filter(subject =>
    subject.name.toLowerCase().includes(filter.toLowerCase()) ||
    subject.code.toLowerCase().includes(filter.toLowerCase())
  );

  if (isLoading) return <div>Cargando materias...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Materias Inscritas</h1>
      
      <Card title="Filtros">
        <input
          type="text"
          placeholder="Filtrar por nombre o código"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </Card>
      
      {subjects.length >= 2 && (
        <div className="warning">
          ¡Recuerda que solo puedes inscribir máximo 2 materias!
        </div>
      )}
      
      <Table
        headers={['Nombre', 'Código', 'Ubicación']}
        data={filteredSubjects.map(subject => [
          subject.name,
          subject.code,
          subject.location
        ])}
      />
    </div>
  );
};

export default SubjectsList;