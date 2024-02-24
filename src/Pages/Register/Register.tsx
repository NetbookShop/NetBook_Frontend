import { useState } from "react"
import { useCookies } from "react-cookie";
import { AuthorizationCookieKey } from "../../Utils/Consts";
import data from "../../TestData/User.json"
import { NavProps } from "../../Utils/Types";


const generateAuthorizationCookie = () => { 
    return "12345678910"
}


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
                <h2>Регистрация</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username">Имя пользователя:</label>
                        <input type="text" id="username" value={username} onChange={handleUsernameChange} required />
                    </div>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" value={email} onChange={handleEmailChange} required />
                    </div>
                    <div>
                        <label htmlFor="password">Пароль:</label>
                        <input type="password" id="password" value={password} onChange={handlePasswordChange} required />
                    </div>
                    <div>
                        <label htmlFor="repeatPassword">Повторите пароль:</label>
                        <input type="password" id="repeatPassword" value={repeatPassword} onChange={handleRepeatPasswordChange} required />
                    </div>
                    <button type="submit">Зарегистрироваться</button>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage; 
