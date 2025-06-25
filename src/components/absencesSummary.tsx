import React, { useState, useEffect } from 'react';
import api from '../services/api';
import Card from './common/card';
import AbsencesTable from './absencesTable';

interface Absence {
  id: number;
  date: string;
  subject: string;
  reason: string;
}

interface AbsenceSummary {
  subject: string;
  total: number;
}

const AbsencesSummary: React.FC = () => {
  const [absences, setAbsences] = useState<Absence[]>([]);
  const [summary, setSummary] = useState<AbsenceSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const studentId = localStorage.getItem('selectedStudentId');
      if (!studentId) return;

      try {
        setIsLoading(true);
        
        // Obtener resumen de asistencias
        const summaryResponse = await api.get(`/students/${studentId}/absence_summary/`);
        setSummary(summaryResponse.data);
        
        // Obtener lista detallada de inasistencias
        const absencesResponse = await api.get(`/absences/?student_id=${studentId}`);
        setAbsences(absencesResponse.data);
        
      } catch (err) {
        setError('Error al cargar las asistencias');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) return <div>Cargando asistencias...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Registro de Asistencias</h1>
      
      <Card title="Resumen de Inasistencias">
        <div className="summary-chart">
          {summary.map(item => (
            <div key={item.subject} className="summary-item">
              <h3>{item.subject}</h3>
              <p>Faltas: {item.total}</p>
            </div>
          ))}
        </div>
      </Card>
      
      <h2>Detalle de Inasistencias</h2>
      <AbsencesTable absences={absences} />
    </div>
  );
};

export default AbsencesSummary;