import React from 'react';
import Table from './common/table';

interface Absence {
  id: number;
  date: string;
  subject: string;
  reason: string;
}

interface AbsencesTableProps {
  absences: Absence[];
}

const AbsencesTable: React.FC<AbsencesTableProps> = ({ absences }) => {
  const groupedAbsences: Record<string, Absence[]> = {};

  // Agrupar faltas por materia
  absences.forEach(absence => {
    if (!groupedAbsences[absence.subject]) {
      groupedAbsences[absence.subject] = [];
    }
    groupedAbsences[absence.subject].push(absence);
  });

  return (
    <div>
      {Object.entries(groupedAbsences).map(([subject, subjectAbsences]) => (
        <div key={subject} className="subject-absences">
          <h3>{subject} ({subjectAbsences.length} faltas)</h3>
          <Table
            headers={['Fecha', 'Motivo']}
            data={subjectAbsences.map(absence => [
              new Date(absence.date).toLocaleDateString(),
              absence.reason
            ])}
          />
        </div>
      ))}
    </div>
  );
};

export default AbsencesTable;