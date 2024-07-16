import React, { useState, useEffect } from 'react';
import '../../assets/css/notificacion.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faBars } from '@fortawesome/free-solid-svg-icons';
import imagen2 from '../../assets/img/logo_ULEAM_2017_horizontal.png';

interface NotificacionRecord {
    id: number;
    fecha: string;
    mensaje: string;
    estado: string;
    cedula: string;
}

const Notificacion: React.FC = () => {
    const [notificacionesList, setNotificacionesList] = useState<NotificacionRecord[]>([]);
    const [fecha, setFecha] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [cedula, setCedula] = useState('');
    const [userCedula, setUserCedula] = useState<string | null>(null); // Cédula del usuario actual

    useEffect(() => {
        const storedList = JSON.parse(localStorage.getItem('notificacionesList') || '[]');
        setNotificacionesList(storedList);

        const session = JSON.parse(localStorage.getItem('session') || '{}');
        setUserCedula(session.cedula || null);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formValido()) {
            const newNotificacion = {
                id: notificacionesList.length + 1,
                fecha,
                mensaje,
                estado: 'No leído',
                cedula
            };
            const newList = [...notificacionesList, newNotificacion];
            setNotificacionesList(newList);
            localStorage.setItem('notificacionesList', JSON.stringify(newList));
            setFecha('');
            setMensaje('');
            setCedula('');
        } else {
            alert('Por favor complete correctamente todos los campos.');
        }
    };

    const formValido = (): boolean => {
        let valid = true;

        // Validación de fecha
        if (!validateDate(fecha)) {
            alert('Formato de fecha inválido. Por favor, utiliza el formato correcto.');
            valid = false;
        }

        // Validación de mensaje
        if (mensaje.trim().length < 3 || mensaje.trim().length > 60) {
            alert('El mensaje debe tener entre 3 y 20 caracteres.');
            valid = false;
        }

        // Validación de cédula
        if (cedula.trim().length !== 10) {
            alert('La cédula debe tener exactamente 10 caracteres.');
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

    const filteredNotificaciones = notificacionesList.filter(
        (notificacion) => notificacion.cedula === userCedula
    );

    return (
        <div>
            <div className="bienvenida-container">
                <div className="bienvenida">
                    <h1>Notificaciones</h1>
                    <div><img src={imagen2} alt="Welcome" className='imagen2' /></div>
                </div>
                <div className="icono">
                    <FontAwesomeIcon icon={faBell} onClick={toggleMenu} />
                    <ul className="menu-lista" id="menuLista">
                        {filteredNotificaciones.slice(0, 3).map((notificacion) => (
                            <li key={notificacion.id}><a href="#">{notificacion.mensaje}</a></li>
                        ))}
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
                <h2>Enviar Notificación</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="fecha">Fecha:</label>
                    <input
                        type="date"
                        id="fecha"
                        value={fecha}
                        onChange={(e) => setFecha(e.target.value)}
                        required
                    />
                    <label htmlFor="mensaje">Mensaje:</label>
                    <input
                        type="text"
                        id="mensaje"
                        value={mensaje}
                        onChange={(e) => setMensaje(e.target.value)}
                        required
                    />
                    <label htmlFor="cedula">Cédula del Destinatario:</label>
                    <input
                        type="text"
                        id="cedula"
                        value={cedula}
                        onChange={(e) => setCedula(e.target.value)}
                        required
                    />
                    <button type="submit">Enviar Notificación</button>
                </form>
            </div>
            <div className="tabla-notificaciones-container">
                <h2>Notificaciones</h2>
                <table className="tabla-notificaciones">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Fecha</th>
                            <th>Mensaje</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredNotificaciones.map((notificacion) => (
                            <tr key={notificacion.id}>
                                <td>{notificacion.id}</td>
                                <td>{notificacion.fecha}</td>
                                <td>{notificacion.mensaje}</td>
                                <td className={`estado-${notificacion.estado.toLowerCase()}`}>{notificacion.estado}</td>
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

export default Notificacion;
