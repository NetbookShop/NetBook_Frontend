import { useEffect, useState } from "react";
import { NavProps } from "../../Utils/Types";
import NavigationMapComponent from "../../Components/NavigationMap/NavigationMap";
import "./UserEdit.css"
import ActionsButtonsComponent from "../../Components/Actions/Actions";
import { useNavigate, useParams } from "react-router-dom";
import { FileApi, FileModel, UserControllersApi } from "task-manager";
import { ApiConfig, asFileUrl } from "../../Gateway/Config";
import ErrorMessage from "../../Components/ErrorMessage/ErrorMessage";
import { upload } from "@testing-library/user-event/dist/upload";

const UserEditPage: React.FC<NavProps> = (props: NavProps) => { 
    const navigate = useNavigate()
    const { id } = useParams()

    props.setCategory("nochoice")

    const [email, setEmail] = useState<string>('')
    const [name, setName] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [repeatPassword, setReapeatPassword] = useState<string>('') 
    const [ uploadedIcon, setUploadedIcon ] = useState<FileModel>()
    const [ image, setImage ] = useState<string | ArrayBuffer | null>()
    const [errorMessage, setErrorMessage] = useState<string>()

    const userApi = new UserControllersApi(ApiConfig)

    const editUserSubmit = async () => { 
        if (password !== undefined || password !== "") { 
            if (password !== repeatPassword) { 
                setErrorMessage("Пароли не совпадают")
                return
            }
        }
        try { 
            if (props.user !== undefined) { 
                await userApi.updateUser(id || "", { 
                    email: props.user.email !== email ? email : null,
                    fullName: props.user.fullName !== name ? name : null, 
                    password: password !== undefined || password !== null || password != "" ? password : null,  
                    avatarId: uploadedIcon?.id, 
                })
                navigate("/"); 
            } 
        } catch (e) { 
            console.error(e)
        }
    }

    useEffect(() => { 
        (async () => { 
            try { 
                console.log(email, name)
                if (email !== "" || name !== "") { 
                    return 
                }
                let response = await userApi.getMe()        
                setEmail(response.data.email)   
                setName(response.data.fullName)
            } catch (e) { 
                console.error(e)
            }
        })()
    }, [])

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => { 
        if (event.target.files === null) { 
            return  
        }

        const fileApi = new FileApi(ApiConfig)
        const file = event.target.files[0]
    

        const reader = new FileReader();
        reader.readAsDataURL(file)

        reader.onloadend = () => {
            setImage(reader.result);
        }
        let fileResponse = await fileApi.uploadFileForm(structuredClone(file))
        setUploadedIcon(fileResponse.data)
    }

    
    let elements = new Map<string, string>()
    elements.set("Проекты", "/projects")
    elements.set(props.user?.fullName || "", `/user/${props.user?.id}/edit`)


    return (
        <div className="useredit-root">
            <NavigationMapComponent elements={elements}/> 
            <div className="useredit-container">
                <h1 className="useredit-header">Управление аккаунтом</h1>

                <img src={
                        (
                            image === null ||
                            image === undefined
                        )
                        ? asFileUrl(props.user?.avatar?.filePath)
                        : String(image)}
                        alt=""
                        className="projectedit-project-icon"
                    />
                    <label htmlFor="photoInput" className='projectedit-project-icon-change'>
                        <input
                            type="file"
                            id="photoInput"
                            accept="image/*"
                            onChange={handleFileChange}
                            style={{ display: 'none' }}
                        />
                        <div className="projectedit-icon-button">Изменить аватар</div>
                    </label>
                <div className="useredit-fields">
                    <div className="useredit-input-field">
                        <label htmlFor="name">Имя пользвателя</label>
                        <input 
                            type="text" 
                            autoComplete="new-password"
                            className="useredit-input" 
                            id="name" 
                            placeholder="Ваше имя" 
                            value={name}
                            onChange={(e) => { e.preventDefault(); setName(e.target.value)} }
                        />
                    </div>
                    <div className="useredit-input-field">
                        <label htmlFor="email">Email пользвателя</label>
                        <input 
                            type="email" 
                            autoComplete="new-password"
                            className="useredit-input" 
                            id="email" 
                            placeholder="Ваше эмейл" 
                            value={email}
                            onChange={(e) => { e.preventDefault(); setEmail(e.target.value)} }
                        />
                    </div>
                    <div className="useredit-input-field">
                        <label htmlFor="password">Введите новый пароль</label>
                        <input 
                            autoComplete="new-password"
                            type="password" 
                            className="useredit-input" 
                            id="password" 
                            placeholder="Ваш новый пароль" 
                            value={password}
                            onChange={(e) => { e.preventDefault(); setPassword(e.target.value)} }
                        />
                    </div>
                    <div className="useredit-input-field">
                        <label htmlFor="password-repeat">Повторите новый пароль</label>
                        <input 
                            autoComplete="new-password"
                            type="password" 
                            className="useredit-input" 
                            id="password-repeat" 
                            placeholder="Повторите пароль" 
                            value={repeatPassword}
                            onChange={(e) => { e.preventDefault(); setReapeatPassword(e.target.value)} }
                        />
                    </div>
                </div>
                <ErrorMessage errorMessage={errorMessage} setErrorMessage={setErrorMessage}/> 
                <ActionsButtonsComponent submitAction={editUserSubmit} cancelAction={() => navigate("/")} submitText="Сохранить"/> 
            </div>
        </div>
    )
}

export default UserEditPage; 
