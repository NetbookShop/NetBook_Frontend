import { useState } from "react"
import { useCookies } from "react-cookie";
import { AuthorizationCookieKey } from "../../Utils/Consts";
import { NavProps } from "../../Utils/Types";
import "./Register.css"
import logo from "../../Static/Images/karma-systemlogo.png"
import googleLogo from "../../Static/Images/google.png"
import { NavLink, useNavigate } from "react-router-dom";
import { RegisterUserApi } from "task-manager";
import { ApiConfig, setToken } from "../../Gateway/Config";


const RegisterPage: React.FC<NavProps> = (props: NavProps) => {
    props.setCategory("none")
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [repeatPassword, setRepeatPassword] = useState<string>('');
    const [cookies, setCookie] = useCookies([AuthorizationCookieKey])
    const [error, setError] = useState<string>()
    const navigate = useNavigate()

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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (password !== repeatPassword) { 
            setError("Ваш пароль не совпадает с повторенным паролем")
            return 
        }
        let authApi = new RegisterUserApi(ApiConfig)
        try { 
        await authApi.apiAuthRegisterPost(
            { 
                email: email, 
                password: password, 
                fullName: username, 
            }
        )
        } catch (e: any) { 
            setError("Такой пользватель уже существует")
            return
        }
        let response = await authApi.apiAuthLoginPost(
            { 
                email: email, 
                password: password, 
            }
        )
        setToken(response.data.accessToken || "", setCookie)
        setTimeout(() => navigate("/"), 500)
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
                    {error !== undefined ?
                    <div className="error-message">
                        {error}
                    </div>: null}
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
