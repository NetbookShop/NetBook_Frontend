import { useState } from "react"
import { useCookies } from "react-cookie";
import { AuthorizationCookieKey } from "../../Utils/Consts";
import { NavProps } from "../../Utils/Types";
import "./Register.css"
import logo from "../../Static/Images/karma-systemlogo.png"
import googleLogo from "../../Static/Images/google.png"
import { NavLink } from "react-router-dom";


const RegisterPage: React.FC<NavProps> = (props: NavProps) => {
    props.setCategory("none")
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [repeatPassword, setRepeatPassword] = useState<string>('');
    const [cookies, setCookie] = useCookies([AuthorizationCookieKey])

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleRepeatPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRepeatPassword(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setCookie(AuthorizationCookieKey, "Fuck you", {secure: true, maxAge: 3600 * 24})
        // Добавьте здесь логику обработки отправки данных (например, отправка на сервер)
    };

    return (
        <div className="register-root">
            <div className="register-container">
                <div className="register-header"><img src={logo} alt="logo" className="header-logo"></img><h3>Карма менеджмент</h3></div>
                <h2>Регистрация</h2>
                <form onSubmit={handleSubmit} className="register-form">
                    <div className="input-field">
                        <label htmlFor="username">Введите свое имя для пользвателя <span className="required-field">*</span></label>
                        <input type="text" id="username" value={username} onChange={handleUsernameChange} required placeholder="Введите свое имя"/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="email">Введите свою электронную почту <span className="required-field">*</span></label>
                        <input type="email" id="email" value={email} onChange={handleEmailChange} required placeholder="Введите электронную почту"/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="password">Введите пароль для своего аккаунта <span className="required-field">*</span></label>
                        <input type="password" id="password" value={password} onChange={handlePasswordChange} required placeholder="Введите пароль"/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="repeatPassword">Повторите пароль <span className="required-field">*</span></label>
                        <input type="password" id="repeatPassword" value={repeatPassword} onChange={handleRepeatPasswordChange} required placeholder="Введите пароль обратно"/>
                    </div>
                    <button type="submit" className="register-button">Зарегистрироваться</button>
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

export default RegisterPage; 
