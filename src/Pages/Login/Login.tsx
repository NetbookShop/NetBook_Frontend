import React, { useState } from 'react';
import { NavProps } from '../../Utils/Types';
import { NavLink, useNavigate } from 'react-router-dom';
import googleLogo from "../../Static/Images/google.png"
import logo from "../../Static/Images/karma-systemlogo.png"
import "./Login.css"
import { RegisterUserApi } from 'task-manager';
import { ApiConfig, setToken } from '../../Gateway/Config';
import { useCookies } from 'react-cookie';
import { AuthKey } from '../../Gateway/Consts';


const LoginPage: React.FC<NavProps> = (props: NavProps) => {
    props.setCategory("none")
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cookies, setCookie] = useCookies([AuthKey])
    const navigate = useNavigate()
    const [error, setError] = useState<string>()

    const handleLoginEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Добавьте здесь логику для отправки данных на сервер или их обработки 
        let authApi = new RegisterUserApi(ApiConfig)
        try { 
            let response = await authApi.apiAuthLoginPost(
                { 
                    email: email, 
                    password: password, 
                }, { method: "POST"}
            )
            setToken(response.data.accessToken || "", setCookie)
            setTimeout(() => navigate("/"), 500)
        } catch (e: any) { 
            setError("Ваш емейл или пароль не правильный")
        } 
    };

    return (
        <div className="login-root">
            <div className="login-container">
                <div className="login-header"><img src={logo} alt="logo" className="header-logo"></img><h3>Карма менеджмент</h3></div>
                <h2 className='login-header-login'>Войти</h2>
                <form onSubmit={handleFormSubmit}>
                    <div className="input-field">
                        <label htmlFor="loginEmail">Введите свою электронную почту <span className="required-field">*</span></label>
                        <input
                            type="text"
                            id="loginEmail"
                            value={email}
                            onChange={handleLoginEmailChange}
                            required
                            placeholder='Введите электронную почту'
                        />
                    </div>
                    <div className="input-field">
                        <label htmlFor="password">Пароль <span className="required-field">*</span></label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={handlePasswordChange}
                            placeholder='Введите пароль'
                            required
                        />
                    </div>
                    {error !== undefined ?
                    <div className="error-message">
                        {error}
                    </div>: null}
                    <button type="submit" className='login-button'>Войти</button>
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
                <NavLink to="/register" className="login-link">Нету аккаунта? Зарегистрироваться</NavLink>
            </div>
        </div>
    );
};

export default LoginPage;