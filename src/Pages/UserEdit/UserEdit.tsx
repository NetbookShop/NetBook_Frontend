import { useState } from "react";
import { NavProps } from "../../Utils/Types";
import NavigationMapComponent from "../../Components/NavigationMap/NavigationMap";
import "./UserEdit.css"
import ActionsButtonsComponent from "../../Components/Actions/Actions";
import { useNavigate } from "react-router-dom";

const UserEditPage: React.FC<NavProps> = (props: NavProps) => { 
    const navigate = useNavigate()

    props.setCategory("nochoice")

    const [email, setEmail] = useState(props.user?.email)
    const [name, setName] = useState(props.user?.fullName)
    const [password, setPassword] = useState<string>()
    const [repeatPassword, setReapeatPassword] = useState<string>() 

    const editUserSubmit = async () => { 

    }
    if (props.user === undefined) { 
        return <div></div> 
    }
    const user = props.user
    
    let elements = new Map<string, string>()
    elements.set("Проекты", "/projects")
    elements.set(user.fullName || "", `/user/${user.id}/edit`)


    return (
        <div className="useredit-root">
            <NavigationMapComponent elements={elements}/> 
            <div className="useredit-container">
                <h1 className="useredit-header">Управление аккаунтом</h1>

                <div className="useredit-fields">
                    <div className="useredit-input-field">
                        <label htmlFor="name">Имя пользвателя</label>
                        <input 
                            type="text" 
                            className="useredit-input" 
                            id="name" 
                            placeholder="Ваше имя" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="useredit-input-field">
                        <label htmlFor="email">Email пользвателя</label>
                        <input 
                            type="email" 
                            className="useredit-input" 
                            id="email" 
                            placeholder="Ваше эмейл" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="useredit-input-field">
                        <label htmlFor="password">Введите новый пароль</label>
                        <input 
                            type="password" 
                            className="useredit-input" 
                            id="password" 
                            placeholder="Ваш новый пароль" 
                            value={email}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="useredit-input-field">
                        <label htmlFor="password-repeat">Повторите новый пароль</label>
                        <input 
                            type="password" 
                            className="useredit-input" 
                            id="password-repeat" 
                            placeholder="Повторите пароль" 
                            value={email}
                            onChange={(e) => setReapeatPassword(e.target.value)}
                        />
                    </div>
                </div>

                <ActionsButtonsComponent submitAction={editUserSubmit} cancelAction={() => navigate("/")} /> 
            </div>
        </div>
    )
}

export default UserEditPage; 
