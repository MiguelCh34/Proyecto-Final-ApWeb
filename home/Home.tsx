import React from 'react';
import '../../assets/css/home.css';
import imagen1 from '../../assets/img/home.png';   
import imagen2 from '../../assets/img/logo_ULEAM_2017_horizontal.png';

const Home: React.FC = () => {
    const toggleMenu = (menuId: string) => {
        const menu = document.getElementById(menuId);
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
                    <h1>Bienvenido</h1>
                    <div><img src={imagen2} alt="Welcome" className='imagen2' /></div>
                </div>
                <div className="icono">
                    <i className="fa-solid fa-bell" onClick={() => toggleMenu('menuLista1')}></i>
                    <ul className="menu-lista" id="menuLista1">
                        <li><a href="#">Notificacion nueva</a></li>
                        <li><a href="#">Notificacion nueva</a></li>
                        <li><a href="#">Notificacion nueva</a></li>
                        <a href="/notificaciones">Ver completo</a>
                    </ul>
                </div>
                <div className="Icono2" id="icono2">
                    <i className="fa-solid fa-bars" onClick={toggleTable}></i>
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
            <div className="contenido">
                <div className="articulos">
                    <div className="secciones">
                        <div>
                            <h2>Bienvenidos al Sistema de Control de Asistencia de Docentes</h2>
                            <p>En nuestra institución, valoramos profundamente la dedicación y el compromiso de nuestros docentes...</p>
                        </div>
                        <div><img src={imagen1} alt="Welcome" /></div>
                    </div>
                    <div className="secciones">
                        <div>
                            <h2>¿Por Qué Elegir Nuestro Sistema?</h2>
                            <p>Nuestra solución de Control de Asistencia de Docentes ha sido diseñada pensando en las necesidades 
                                específicas del entorno educativo. No solo ofrecemos una herramienta tecnológica avanzada, sino también 
                                un soporte constante para asegurar que la implementación y el uso del sistema sean lo más sencillos y 
                                efectivos posible. Nos comprometemos a trabajar de la mano con nuestros docentes para construir una institución 
                                educativa más organizada, eficiente y centrada en el aprendizaje de calidad.</p>
                            <p>¡Explora nuestro sistema y descubre cómo podemos ayudarte a transformar la gestión de la asistencia en tu institución!</p>
                        </div>
                    </div>
                </div>
                <div className="menu-secundario">
                        <a href="">Mas articulos</a>
                        <a href="">Mas articulos</a>
                        <a href="">Mas articulos</a>
                        <a href="">Mas articulos</a>
                        <a href="">Mas articulos</a>
                        <a href="">Mas articulos</a>
                        <a href="">Mas articulos</a>
                  </div>
            </div>
            <footer>
                <p>Para más información o una demostración en vivo, no dudes en <a href="">contactarnos.</a></p>
            </footer>
        </div>
    );
};

export default Home;
