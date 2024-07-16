import React, { useState, useEffect } from 'react';
import '../../assets/css/asistencias.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faBars } from '@fortawesome/free-solid-svg-icons';
import imagen2 from '../../assets/img/logo_ULEAM_2017_horizontal.png';

interface AttendanceRecord {
    name: string;
    date: string;
}

const Attendance: React.FC = () => {
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [attendanceList, setAttendanceList] = useState<AttendanceRecord[]>([]);

    useEffect(() => {
        const storedList = JSON.parse(localStorage.getItem('attendanceList') || '[]');
        setAttendanceList(storedList);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formValido()) {
            const newRecord = { name, date };
            const newList = [...attendanceList, newRecord];
            setAttendanceList(newList);
            localStorage.setItem('attendanceList', JSON.stringify(newList));
            setName('');
            setDate('');
        } else {
            alert('Por favor complete correctamente todos los campos.');
        }
    };

    const formValido = (): boolean => {
        let valid = true;

        // Validación de nombre
        if (name.trim().length < 3 || name.trim().length > 60) {
            alert('El nombre debe tener entre 3 y 15 caracteres.');
            valid = false;
        }

        // Validación de fecha
        if (!validateDate(date)) {
            alert('Formato de fecha inválido. Por favor, use el formato YYYY-MM-DD.');
            valid = false;
        }

        return valid;
    };

    const validateDate = (date: string): boolean => {
        // Expresión regular para validar el formato de fecha YYYY-MM-DD
        const regex = /^\d{4}-\d{2}-\d{2}$/;
        return regex.test(date);
    };

    const toggleMenu = () => {
        const menu = document.getElementById('menuLista');
        if (menu) {
            if (menu.style.display === 'block') {
                menu.style.display = 'none';
            } else {
                menu.style.display = 'block';
            }
        }
    };

    const toggleTable = () => {
        const tableMenu = document.getElementById('menuLista2');
        if (tableMenu) {
            if (tableMenu.style.display === 'block') {
                tableMenu.style.display = 'none';
            } else {
                tableMenu.style.display = 'block';
            }
        }
    };

    return (
        <div>
            <div className="bienvenida-container">
                <div className="bienvenida">
                    <div className="Asistencia">
                        <h1>Bienvenido</h1>
                        <div><img src={imagen2} alt="Welcome" className='imagen2' /></div>
                    </div>
                </div>
                <div className="icono">
                    <FontAwesomeIcon icon={faBell} onClick={toggleMenu} />
                    <ul className="menu-lista" id="menuLista">
                        <a href="/notificaciones">Ver completo</a>
                    </ul>
                </div>
                <div className="Icono2" id="icono2">
                    <FontAwesomeIcon icon={faBars} onClick={toggleTable} />
                    <ul className="menu-listado" id="menuLista2">
                        <li><a href="/perfil">Perfil</a></li>
                        <a href="/">Cerrar sesion</a>
                    </ul>
                </div>
            </div>
            <nav>
                <ul>
                    <li><a href="/">Cerrar sesión</a></li>
                    <li><a href="/home">Principal</a></li>
                    <li><a href="/calendario">Calendario</a></li>
                    <li><a href="/registro-asistencias">Registrar asistencia</a></li>
                    <li><a href="/atrasos">Atrasos</a></li>
                </ul>
            </nav>
            <div className="ajuste">
                <h1>Registro de Asistencia</h1>
            </div>
            <div className="Ajuste">
                <div className="container">
                    <form id="attendanceForm" onSubmit={handleSubmit}>
                        <label htmlFor="name">Nombre:</label>
                        <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} required />
                        <label htmlFor="date">Fecha:</label>
                        <input type="date" id="date" name="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                        <button type="submit">Registrar Asistencia</button>
                    </form>
                    <div id="attendanceList" className="attendance-list">
                        <h2>Lista de Asistencias</h2>
                        <ul id="list">
                            {attendanceList.map((record, index) => (
                                <li key={index}>{`Nombre: ${record.name}, Fecha: ${record.date}`}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <footer>
                <p>Para más información o una demostración en vivo, no dudes en <a href="">contactarnos.</a></p>
            </footer>
        </div>
    );
};

export default Attendance;
