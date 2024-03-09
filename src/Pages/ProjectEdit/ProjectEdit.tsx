import React, { useState, useEffect } from "react";
import { NavProps } from "../../Utils/Types";
import NavigationMapComponent from "../../Components/NavigationMap/NavigationMap";
import "./ProjectEdit.css"
import { useNavigate, useParams } from "react-router-dom";
import { FileApi, FileModel, Project, ProjectControllersApi, UserControllersApi, UserModel } from "task-manager";
import { ApiConfig, asFileUrl } from "../../Gateway/Config";
import checkMark from "../../Static/Images/check-mark.png"
import ErrorMessage from "../../Components/ErrorMessage/ErrorMessage";
import ActionsButtonsComponent from "../../Components/Actions/Actions";

const ProjectEditPage: React.FC<NavProps> = (props: NavProps) => { 
    props.setCategory("projects")
    let elements = new Map<string, string>()


    const { id } = useParams()
    const [ project, setProject ] = useState<Project>()
    const [ description, setDescription ] = useState<string>(); 
    const [ name, setName ] = useState<string>()
    const [ usersList, setUsersList ] = useState<Array<UserModel>>([])
    const [ searchRequest, setSearchRequest ] = useState('')
    const [ owner, setOwner ] = useState<UserModel>() 
    const [ uploadedIcon, setUploadedIcon ] = useState<FileModel>()
    const [ image, setImage ] = useState<string | ArrayBuffer | null>()
    const [ errorMessage, setErrorMessage ] = useState<string>()
    const navigate = useNavigate()
    const filteredUsers = usersList.filter(user =>
        user.fullName.toLowerCase().includes(searchRequest.toLowerCase())
    );

    elements.set("Проекты", "/projects")
    elements.set(project?.name || "", `/project/${id}`)
    elements.set("Редактировать", `/project/${id}/edit`)

    useEffect(() => {
        (async () => { 
            let projectApi = new ProjectControllersApi(ApiConfig)
            let userApi = new UserControllersApi(ApiConfig) 

            try { 
                let projectResponse = await projectApi.getProject(id || "")
                setProject(projectResponse.data)
                if (project !== undefined) { 
                    setName(project.name)
                    setDescription(project.description)
                    setOwner(projectResponse.data.createdBy)
                }
                let usersResponse = await userApi.getUsers()
                setUsersList(usersResponse.data)
            } catch (e) { 
                console.error(e)
            }
        })()
    }, [props.user])

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

    const submitProjectEdit = async () => {
        let projectApi = new ProjectControllersApi(ApiConfig)
        try { 
            projectApi.updateProject(
                id || "", 
                { 
                    name: name,
                    description: description,  
                    iconId: uploadedIcon?.id, 
                }
            )
        } catch { 

        }
        setTimeout(() => navigate(`/project/${id}`), 400)
    }

    return ( 
        <div className="projectedit-root">
            <NavigationMapComponent elements={elements}/>
            <div className="projectedit-form">
                <div className="projectedit-project-image-container">
                    <img src={
                        (
                            image === null ||
                            image === undefined
                        )
                        ? asFileUrl(project?.icon?.filePath)
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
                        <div className="projectedit-icon-button">Изменить значок</div>
                    </label>
                </div>
                <div className="projectedit-fields">
                    <div className="project-edit-name edit-project-field">
                        <p>Название</p>
                        <input
                            type="text" 
                            placeholder="Название проекта" 
                            onChange={(e) => setName(e.target.value)} 
                            value={name}
                        />
                    </div>
                    <div className="project-edit-description edit-project-field">
                        <p>Описание</p>
                        <input
                            type="text" 
                            placeholder="Описание проекта" 
                            onChange={(e) => setDescription(e.target.value)} 
                            value={description}
                        />
                    </div>
                    <div className="project-edit-owner edit-project-field">
                        <p>Руководитель</p>
                        <div className="input-owner">
                            {owner !== undefined ? 
                                <div className="owner-user">
                                    <img src={asFileUrl(owner.avatar?.filePath)} alt="" className="avatar-icon-projectedit"/>
                                    <p>{ owner.fullName }</p>
                                </div>
                            : null }
                            { searchRequest !== undefined ?
                            <div className="found-users">
                                {filteredUsers.map((user) => { 
                                    return (
                                        <div className="found-user-result" onClick={() => setOwner(user)}>
                                            <div className="left-content-user">
                                                <img src={asFileUrl(user.avatar?.filePath)} alt="" className="found-user-icon"/>
                                                <p>{ user.fullName }</p>
                                            </div>
                                            {owner?.id === user.id ? 
                                                <div className="check-mark-active">
                                                    <img src={checkMark} alt="" width={26} height={24}/>
                                                </div>
                                                : 
                                                <div className="check-mark-inactive">
                
                                                </div>
                                            }
                                        </div>

                                    )
                                })}
                            </div> 
                        : null }
                        </div>
                    </div>
                </div>
                <ErrorMessage errorMessage={errorMessage} setErrorMessage={setErrorMessage}/> 
                
                <ActionsButtonsComponent submitAction={() => submitProjectEdit()} cancelAction={() => navigate("/projects")} submitText="Сохранить"/>
            </div>
        </div>
    )
}

export default ProjectEditPage; 
