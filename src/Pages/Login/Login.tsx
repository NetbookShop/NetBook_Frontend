import React, { useState, Dispatch } from 'react';
import { NavProps, NavigationCategoryTypes } from '../../Utils/Types';

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
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Пароль:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={handlePasswordChange}
                            required
                        />
                    </div>
                    <button type="submit">Войти</button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;