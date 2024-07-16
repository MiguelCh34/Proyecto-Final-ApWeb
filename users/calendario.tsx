import React, { useState, useEffect } from 'react';
import '../../assets/css/calendario.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faBars } from '@fortawesome/free-solid-svg-icons';
import imagen2 from '../../assets/img/logo_ULEAM_2017_horizontal.png';

const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

const Calendar: React.FC = () => {
    const [now, setNow] = useState(new Date());
    const [day, setDay] = useState(now.getDate());
    const [month, setMonth] = useState(now.getMonth());
    const [year, setYear] = useState(now.getFullYear());

    useEffect(() => {
        initCalendar();
    }, [month, year]);

    const initCalendar = () => {
        document.getElementById('text_day')!.innerText = day.toString();
        document.getElementById('text_month')!.innerText = monthNames[month];
        document.getElementById('text_month_02')!.innerText = monthNames[month];
        document.getElementById('text_year')!.innerText = year.toString();

        const containerDays = document.querySelector('.container_days')!;
        containerDays.innerHTML = '';

        for (let i = startDay(); i > 0; i--) {
            containerDays.innerHTML += `<span class="week_days_item item_day prev_days">${getTotalDays(month - 1) - (i - 1)}</span>`;
        }

        for (let i = 1; i <= getTotalDays(month); i++) {
            if (i === day && month === now.getMonth() && year === now.getFullYear()) {
                containerDays.innerHTML += `<span class="week_days_item item_day today">${i}</span>`;
            } else {
                containerDays.innerHTML += `<span class="week_days_item item_day">${i}</span>`;
            }
        }
    };

    const getNextMonth = () => {
        if (month !== 11) {
            setMonth(month + 1);
        } else {
            setYear(year + 1);
            setMonth(0);
        }
    };

    const getPrevMonth = () => {
        if (month !== 0) {
            setMonth(month - 1);
        } else {
            setYear(year - 1);
            setMonth(11);
        }
    };

    const startDay = () => {
        const start = new Date(year, month, 1);
        return ((start.getDay() - 1) === -1) ? 6 : start.getDay();
    };

    const leapMonth = () => {
        return ((year % 400 === 0) || (year % 4 === 0) && (year % 100 !== 0));
    };

    const getTotalDays = (month: number) => {
        if (month === -1) month = 11;
        const numMonthReal = month + 1;
        if (numMonthReal === 3 || numMonthReal === 5 || numMonthReal === 8 || numMonthReal === 10) {
            return 31;
        } else if (numMonthReal === 0 || numMonthReal === 2 || numMonthReal === 4 || numMonthReal === 6 || numMonthReal === 7 || numMonthReal === 9 || numMonthReal === 10) {
            return 30;
        } else {
            return leapMonth() ? 29 : 28;
        }
    };

    const toggleMenu = () => {
        const menu = document.getElementById('menuLista');
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
                    <div className="Calendario">
                        <h1>Calendario</h1>
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
            <div className="container_calendar">
                <div className="header_calendar">
                    <h1 id="text_day">00</h1>
                    <h5 id="text_month">Null</h5>
                </div>
                <div className="body_calendar">
                    <div className="container_details">
                        <div className="detail_1">
                            <div className="detail">
                                <div className="circle">
                                    <div className="column"></div>
                                </div>
                            </div>
                            <div className="detail">
                                <div className="circle">
                                    <div className="column"></div>
                                </div>
                            </div>
                        </div>
                        <div className="detail_2">
                            <div className="detail">
                                <div className="circle">
                                    <div className="column"></div>
                                </div>
                            </div>
                            <div className="detail">
                                <div className="circle">
                                    <div className="column"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container_change_month">
                        <button id="last_month" onClick={getPrevMonth}>&lt;</button>
                        <div>
                            <span id="text_month_02">Null</span>
                            <span id="text_year">0000</span>
                        </div>
                        <button id="next_month" onClick={getNextMonth}>&gt;</button>
                    </div>
                    <div className="container_weedays">
                        <span className="week_days_item">DOM</span>
                        <span className="week_days_item">LUN</span>
                        <span className="week_days_item">MAR</span>
                        <span className="week_days_item">MIE</span>
                        <span className="week_days_item">JUE</span>
                        <span className="week_days_item">VIE</span>
                        <span className="week_days_item">SAB</span>
                    </div>
                    <div className="container_days">
                        {/* Days will be appended here */}
                    </div>
                </div>
            </div>
            <footer>
                <p>Para más información o una demostración en vivo, no dudes en <a href="">contactarnos.</a></p>
            </footer>
        </div>
    );
};

export default Calendar;
