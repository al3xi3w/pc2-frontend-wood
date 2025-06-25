import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';

const Navbar: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav>
      <ul>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/subjects">Materias</Link></li>
        <li><Link to="/absences">Asistencias</Link></li>
        <li><button onClick={handleLogout}>Cerrar sesión</button></li>
      </ul>
    </nav>
  );
};

export default Navbar;