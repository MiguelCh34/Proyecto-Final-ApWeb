import React, { useState } from 'react';
import '../../assets/css/login.css';

const Login: React.FC = () => {
    const [usuario, setUsuario] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [correoValido, setCorreoValido] = useState(true); // Estado para manejar la validación del correo

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
        if (storedUser.correo === usuario && storedUser.contraseña === contraseña) {
            alert('Inicio de sesión exitoso');
            localStorage.setItem('session', JSON.stringify(storedUser));
            window.location.href = '/home';
        } else {
            alert('Usuario o contraseña incorrectos');
        }
    };

    // Función para validar el formato del correo electrónico
    const validarCorreo = (correo: string): boolean => {
        // Expresión regular para validar el formato de correo electrónico
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(correo);
    };

    // Función para manejar el cambio en el campo de correo electrónico
    const handleCorreoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const valorCorreo = e.target.value;
        setUsuario(valorCorreo);
        setCorreoValido(validarCorreo(valorCorreo)); // Actualizar el estado de correoValido
    };

    return (
        <section className="form-login">
            <h5>Iniciar sesión</h5>
            <form onSubmit={handleSubmit}>
                <label htmlFor="Idusuario">Correo</label>
                <input
                    className={`controls ${correoValido ? '' : 'invalid'}`} // Aplicar estilo si el correo no es válido
                    type="text"
                    name="Usuario"
                    placeholder="Usuario"
                    id="Usuario"
                    value={usuario}
                    onChange={handleCorreoChange}
                    required
                />
                {!correoValido && <p className="error-message">Por favor ingresa un correo válido.</p>}
                <label htmlFor="Idcontraseña">Contraseña</label>
                <input
                    className="controls"
                    type="password"
                    name="Contraseña"
                    placeholder="Contraseña"
                    id="Contraseña"
                    value={contraseña}
                    onChange={(e) => setContraseña(e.target.value)}
                    required
                />
                <input className="buttons" type="submit" value="Ingresar" />
                <p><a href="#">¿Olvidaste tu contraseña?</a></p>
                <p>O</p>
                <a href="/registro"><input className="button" type="button" value="Registrarse" /></a>
            </form>
        </section>
    );
};

export default Login;
