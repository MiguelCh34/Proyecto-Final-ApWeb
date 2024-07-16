import React from 'react';
import perfil from '../../assets/img/perfil.jpg';
import '../../assets/css/perfil.css';
import imagen2 from '../../assets/img/logo_ULEAM_2017_horizontal.png';
const Perfil: React.FC = () => {
    const user = JSON.parse(localStorage.getItem('session') || '{}');

    return (
        <div className="perfil-container">
            <nav>
            <ul>
                    <li><a href="/">Cerrar sesión</a></li>
                    <li><a href="/home">Principal</a></li>
                    <li><a href="/calendario">Calendario</a></li>
                    <li><a href="/registro-asistencias">Registrar asistencia</a></li>
                    <li><a href="/atrasos">Atrasos</a></li>
                    <li><a href="/notificaciones">Notificaciones</a></li>
                    <li><a href="/perfil">Perfil</a></li>
                </ul>
            </nav>
            <div className="perfil-header">
                <img src={perfil} alt="Avatar" className="avatar" />
                <h1>Informacion personal</h1>
                <div><img src={imagen2} alt="Welcome" className='imagen2' /></div>
                <p>Correo Electrónico: {user.correo}</p>
            </div>
            <div className="perfil-body">
                <h2>Información Personal</h2>
                <ul>
                    <li><strong>Nombre:</strong> {user.nombres}</li>
                    <li><strong>Apellido:</strong> {user.apellidos}</li>
                    <li><strong>Cedula:</strong> {user.cedula}</li>
                    <li><strong>Facultad:</strong> {user.facultad}</li>
                </ul>
            </div>
        </div>
    );
};

export default Perfil;
