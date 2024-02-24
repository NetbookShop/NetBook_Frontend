import React, { useState, Dispatch } from 'react';
import { NavProps, NavigationCategoryTypes } from '../../Utils/Types';
import { NavLink } from 'react-router-dom';
import googleLogo from "../../Static/Images/google.png"

const LoginPage: React.FC<NavProps> = (props: NavProps) => {
    props.setCategory("none")
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLoginEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Добавьте здесь логику для отправки данных на сервер или их обработки
    };

    return (
        <div className="login-root">
            <div className="login-container">
                <form onSubmit={handleFormSubmit}>
                    <div>
                        <label htmlFor="loginEmail">Email:</label>
                        <input
                            type="text"
                            id="loginEmail"
                            value={email}
                            onChange={handleLoginEmailChange}
                            required
                            placeholder='Введите электронную почту'
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Пароль:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={handlePasswordChange}
                            placeholder='Введите пароль'
                            required
                        />
                    </div>
                    <button type="submit">Войти</button>
                </form>
                <hr className="line"/>
                <h3 className="continue-with">Или продолжить с помощью:</h3>
                <div className="oauth2">
                    <div className="oauth2-google">
                        <div className="google-content">
                            <img src={googleLogo} alt="" width={30} height={30}/>
                            <p>Google</p>
                        </div>
                    </div>
                </div>
                <NavLink to="/login" className="login-link">Уже есть аккаунт? Войти</NavLink>
            </div>
        </div>
    );
};

export default LoginPage;