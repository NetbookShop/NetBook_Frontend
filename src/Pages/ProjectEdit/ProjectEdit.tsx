import React, { useState } from "react";
import { NavProps } from "../../Utils/Types";
import NavigationMapComponent from "../../Components/NavigationMap/NavigationMap";
import "./ProjectEdit.css"
import data from "../../TestData/ProjectEdit.json"
import { UserScheme } from "../../Schemes/User";
import { FileScheme } from "../../Schemes/File";

const ProjectEditPage: React.FC<NavProps> = (props: NavProps) => { 
    props.setCategory("projects")
    let elements = new Map<string, string>()
    elements.set("Проекты", "/projects")
    elements.set(data.name, `/project/${data.id}`)
    elements.set("Редактировать", `/project/${data.id}/edit`)
    const [ description, setDescription ] = useState<string>(''); 
    const [ name, setName ] = useState('')
    const [ foundUsers, setFoundUsers ] = useState<Array<UserScheme>>([]); 
    const [ searchRequest, setSearchRequest ] = useState()
    const [ owner, setOwner ] = useState(data.owner) 
    const [ uploadedIcon, setUploadedIcon ] = useState<FileScheme>()
    const [ image, setImage ] = useState<string | ArrayBuffer | null>()

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => { 
        if (event.target.files === null) { 
            return  
        }
        const file = event.target.files[0]

        const reader = new FileReader();
        reader.readAsDataURL(file)

        reader.onloadend = () => {
            setImage(reader.result);
        }
    }

    const serachUsersToSelect = (event: React.ChangeEvent<HTMLInputElement>) => { 
        
    }

    const submitProjectEdit = () => { 
        // TODO: будет выполнен запрос к бекенду 
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
                        ? data.icon.fileUrl
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
                        <p className="projectedit-icon-button">Изменить значок</p>
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
                                    <img src={owner.avatar.fileUrl} alt="" className="avatar-icon-projectedit"/>
                                    <p>{ owner.name }</p>
                                </div>
                            : null }
                            { searchRequest !== undefined ?
                            <div className="found-users">
                                {foundUsers.map((user) => { 
                                    return (
                                        <div className="found-user-result">
                                            <img src={user.avatar.fileUrl} alt="" className="found-user-icon"/>
                                            <p>{ user.name }</p>
                                        </div>
                                    )
                                })}
                            </div> 
                        : null }
                        </div>
                    </div>
                </div>
                <div className="projectedit-submit" onClick={submitProjectEdit}>
                    Сохранить
                </div>
            </div>
        </div>
    )
}

export default ProjectEditPage; 
