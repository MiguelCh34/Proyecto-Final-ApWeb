import React, { useState, useEffect } from 'react';
import '../../assets/css/atrasos.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faBars } from '@fortawesome/free-solid-svg-icons';
import imagen2 from '../../assets/img/logo_ULEAM_2017_horizontal.png';

interface AtrasoRecord {
    nombre: string;
    fecha: string;
    motivo: string;
    duracion: string;
}

const Atrasos: React.FC = () => {
    const [atrasosList, setAtrasosList] = useState<AtrasoRecord[]>([]);
    const [nombre, setNombre] = useState('');
    const [fecha, setFecha] = useState('');
    const [motivo, setMotivo] = useState('');
    const [duracion, setDuracion] = useState('');

    useEffect(() => {
        const storedList = JSON.parse(localStorage.getItem('atrasosList') || '[]');
        setAtrasosList(storedList);
    }, []);

    const handleMotivoChange = (index: number, newMotivo: string) => {
        const updatedList = [...atrasosList];
        updatedList[index].motivo = newMotivo;
        setAtrasosList(updatedList);
        localStorage.setItem('atrasosList', JSON.stringify(updatedList));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formValido()) {
            const newAtraso = { nombre, fecha, motivo, duracion };
            const newList = [...atrasosList, newAtraso];
            setAtrasosList(newList);
            localStorage.setItem('atrasosList', JSON.stringify(newList));
            setNombre('');
            setFecha('');
            setMotivo('');
            setDuracion('');
        } else {
            alert('Por favor completa correctamente todos los campos.');
        }
    };

    const formValido = (): boolean => {
        let valid = true;

        // Validación de nombre
        if (nombre.trim().length < 3 || nombre.trim().length > 60) {
            alert('El nombre del empleado debe tener entre 3 y 15 caracteres.');
            valid = false;
        }

        // Validación de fecha
        if (!validateDate(fecha)) {
            alert('Formato de fecha inválido. Por favor, utiliza el formato correcto.');
            valid = false;
        }

        // Validación de duración
        if (duracion.trim().length < 3 || duracion.trim().length > 10) {
            alert('La duración del atraso debe tener entre 3 y 10 caracteres.');
            valid = false;
        }

        return valid;
    };

    const validateDate = (date: string): boolean => {
        // Expresión regular para validar el formato de fecha YYYY-MM-DD
        const regex = /^\d{4}-\d{2}-\d{2}$/;
        return regex.test(date);
    };

    const toggleMenu = (menuId: string) => {
        const menu = document.getElementById(menuId);
        if (menu !== null && menu.style.display === 'block') {
            menu.style.display = 'none';
        } else if (menu !== null) {
            menu.style.display = 'block';
        }
    };

    const toggleTable = () => {
        const tableMenu = document.getElementById('menuLista2');
        if (tableMenu !== null && tableMenu.style.display === 'block') {
            tableMenu.style.display = 'none';
        } else if (tableMenu !== null) {
            tableMenu.style.display = 'block';
        }
    };

    return (
        <div>
            <div className="bienvenida-container">
                <div className="bienvenida">
                    <h1>Atrasos</h1>
                    <div><img src={imagen2} alt="Welcome" className='imagen2' /></div>
                </div>
                <div className="icono">
                    <FontAwesomeIcon icon={faBell} onClick={() => toggleMenu('menuLista1')} />
                    <ul className="menu-lista" id="menuLista1">
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
            <div className="form-container">
                <h2>Registrar Atraso</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="nombre">Nombre del Empleado:</label>
                    <input
                        type="text"
                        id="nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                    <label htmlFor="fecha">Fecha del Atraso:</label>
                    <input
                        type="date"
                        id="fecha"
                        value={fecha}
                        onChange={(e) => setFecha(e.target.value)}
                        required
                    />
                    <label htmlFor="motivo">Justificado:</label>
                    <select
                        id="motivo"
                        value={motivo}
                        onChange={(e) => setMotivo(e.target.value)}
                        required
                    >
                        <option value="">Selecciona...</option>
                        <option value="Si">Sí</option>
                        <option value="No">No</option>
                    </select>
                    <label htmlFor="duracion">Duración del Atraso:</label>
                    <input
                        type="text"
                        id="duracion"
                        value={duracion}
                        onChange={(e) => setDuracion(e.target.value)}
                        required
                    />
                    <button type="submit">Registrar Atraso</button>
                </form>
            </div>
            <div className="table-container">
                <h2>Tabla de Atrasos</h2>
                <table className="atrasos-table">
                    <thead>
                        <tr>
                            <th>Nombre del Empleado</th>
                            <th>Fecha del Atraso</th>
                            <th>Justificado</th>
                            <th>Duración del Atraso</th>
                        </tr>
                    </thead>
                    <tbody>
                        {atrasosList.map((record, index) => (
                            <tr key={index}>
                                <td>{record.nombre}</td>
                                <td>{record.fecha}</td>
                                <td>
                                    <select
                                        value={record.motivo}
                                        onChange={(e) => handleMotivoChange(index, e.target.value)}
                                    >
                                        <option value="Si">Sí</option>
                                        <option value="No">No</option>
                                    </select>
                                </td>
                                <td>{record.duracion}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <footer>
                <p>Para más información o una demostración en vivo, no dudes en <a href="">contactarnos.</a></p>
            </footer>
        </div>
    );
};

export default Atrasos;
