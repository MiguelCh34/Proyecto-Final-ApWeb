import React, { useState } from 'react';
import '../../assets/css/registro.css';

const Register: React.FC = () => {
    const [nombres, setNombres] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [correo, setCorreo] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [confirmarContraseña, setConfirmarContraseña] = useState('');
    const [cedula, setCedula] = useState('');
    const [facultad, setFacultad] = useState('');

    const [errores, setErrores] = useState({
        nombres: '',
        apellidos: '',
        correo: '',
        contraseña: '',
        confirmarContraseña: '',
        cedula: '',
        facultad: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (formValido()) {
            const user = { nombres, apellidos, correo, contraseña, cedula, facultad };
            localStorage.setItem('user', JSON.stringify(user));
            alert('Usuario registrado con éxito');
        } else {
            alert('Por favor complete correctamente todos los campos.');
        }
    };

    const formValido = (): boolean => {
        let valid = true;

        // Validación de nombres
        if (nombres.trim() === '' || nombres.length < 3 || nombres.length > 60) {
            setErrores((prevState) => ({ ...prevState, nombres: 'Ingrese un nombre válido (entre 3 y 15 caracteres)' }));
            valid = false;
        } else {
            setErrores((prevState) => ({ ...prevState, nombres: '' }));
        }

        // Validación de apellidos
        if (apellidos.trim() === '' || apellidos.length < 3 || apellidos.length > 60) {
            setErrores((prevState) => ({ ...prevState, apellidos: 'Ingrese un apellido válido (entre 3 y 15 caracteres)' }));
            valid = false;
        } else {
            setErrores((prevState) => ({ ...prevState, apellidos: '' }));
        }

        // Validación de correo electrónico
        if (!validarCorreo(correo)) {
            setErrores((prevState) => ({ ...prevState, correo: 'Ingrese un correo válido' }));
            valid = false;
        } else {
            setErrores((prevState) => ({ ...prevState, correo: '' }));
        }

        // Validación de contraseña
        if (contraseña.length < 6) {
            setErrores((prevState) => ({ ...prevState, contraseña: 'La contraseña debe tener al menos 6 caracteres' }));
            valid = false;
        } else {
            setErrores((prevState) => ({ ...prevState, contraseña: '' }));
        }

        // Validación de confirmación de contraseña
        if (contraseña !== confirmarContraseña) {
            setErrores((prevState) => ({ ...prevState, confirmarContraseña: 'Las contraseñas no coinciden' }));
            valid = false;
        } else {
            setErrores((prevState) => ({ ...prevState, confirmarContraseña: '' }));
        }

        // Validación de cédula
        if (cedula.trim() === '' || cedula.length !== 10) {
            setErrores((prevState) => ({ ...prevState, cedula: 'Ingrese una cédula válida (10 caracteres)' }));
            valid = false;
        } else {
            setErrores((prevState) => ({ ...prevState, cedula: '' }));
        }

        // Validación de facultad
        if (facultad.trim() === '' || facultad.length < 3 || facultad.length > 60) {
            setErrores((prevState) => ({ ...prevState, facultad: 'Ingrese una facultad válida (entre 3 y 15 caracteres)' }));
            valid = false;
        } else {
            setErrores((prevState) => ({ ...prevState, facultad: '' }));
        }

        return valid;
    };

    // Función para validar el formato del correo electrónico
    const validarCorreo = (correo: string): boolean => {
        // Expresión regular para validar el formato de correo electrónico
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(correo);
    };

    return (
        <section className="form-register">
            <h4>Registro</h4>
            <form onSubmit={handleSubmit}>
                <label htmlFor="idnombre">Nombres</label>
                <input
                    className={`controls ${errores.nombres ? 'invalid' : ''}`}
                    type="text"
                    name="Nombres"
                    id="Nombres"
                    placeholder="Ingrese su nombre"
                    value={nombres}
                    onChange={(e) => setNombres(e.target.value)}
                    required
                />
                {errores.nombres && <p className="error-message">{errores.nombres}</p>}

                <label htmlFor="idapellidos">Apellidos</label>
                <input
                    className={`controls ${errores.apellidos ? 'invalid' : ''}`}
                    type="text"
                    name="Apellidos"
                    id="Apellidos"
                    placeholder="Ingrese su Apellido"
                    value={apellidos}
                    onChange={(e) => setApellidos(e.target.value)}
                    required
                />
                {errores.apellidos && <p className="error-message">{errores.apellidos}</p>}

                <label htmlFor="idcorreo">Correo</label>
                <input
                    className={`controls ${errores.correo ? 'invalid' : ''}`}
                    type="email"
                    name="Correo"
                    id="Correo"
                    placeholder="Ingrese su Correo"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    required
                />
                {errores.correo && <p className="error-message">{errores.correo}</p>}

                <label htmlFor="idcontraseña">Contraseña</label>
                <input
                    className={`controls ${errores.contraseña ? 'invalid' : ''}`}
                    type="password"
                    name="Contraseña"
                    id="Contraseña"
                    placeholder="Ingrese su Contraseña"
                    value={contraseña}
                    onChange={(e) => setContraseña(e.target.value)}
                    required
                />
                {errores.contraseña && <p className="error-message">{errores.contraseña}</p>}

                <label htmlFor="idconfirmarcontraseña">Confirmar Contraseña</label>
                <input
                    className={`controls ${errores.confirmarContraseña ? 'invalid' : ''}`}
                    type="password"
                    name="ConfirmarContraseña"
                    id="ConfirmarContraseña"
                    placeholder="Confirme su Contraseña"
                    value={confirmarContraseña}
                    onChange={(e) => setConfirmarContraseña(e.target.value)}
                    required
                />
                {errores.confirmarContraseña && <p className="error-message">{errores.confirmarContraseña}</p>}

                <label htmlFor="idcedula">Cedula</label>
                <input
                    className={`controls ${errores.cedula ? 'invalid' : ''}`}
                    type="text"
                    name="Cedula"
                    id="Cedula"
                    placeholder="Ingrese su Cedula"
                    value={cedula}
                    onChange={(e) => setCedula(e.target.value)}
                    required
                />
                {errores.cedula && <p className="error-message">{errores.cedula}</p>}

                <label htmlFor="idfacultad">Facultad</label>
                <input
                    className={`controls ${errores.facultad ? 'invalid' : ''}`}
                    type="text"
                    name="Facultad"
                    id="Facultad"
                    placeholder="Ingrese su Facultad"
                    value={facultad}
                    onChange={(e) => setFacultad(e.target.value)}
                    required
                />
                {errores.facultad && <p className="error-message">{errores.facultad}</p>}

                <p>Estoy de acuerdo <a href="https://policies.google.com/terms?hl=es">Terminos y Condiciones</a></p>
                <input className="botons" type="submit" value="Registrar" />
                <p><a href="/">¿Ya tienes una cuenta?</a></p>
            </form>
        </section>
    );
};

export default Register;
