import "./CreateTeam.css"
import { useState, Dispatch, useEffect } from "react";
import UserSelectorComponent from "../../Components/UserSelector/UserSelector";
import ActionsButtonsComponent from "../../Components/Actions/Actions";
import "./CreateTeam.css"
import bannerForPlacement from "../../Static/Images/banner-for-place.svg"
import { TeamControllersApi, UserControllersApi, UserModel } from "task-manager";
import { ApiConfig } from "../../Gateway/Config";

type props = { setIsOpenModal: Dispatch<boolean>} 

const CreateTeamModal = (props: props) => {
    const [usersList, setUsersList] = useState<Array<UserModel>>([])
    const [teamName, setTeamName] = useState<string>('')
    const [description, setDescription] = useState<string>('')    
    const [ selectedUsers, setSelectedUsers ] = useState<Array<string>>([])
    const [searchTerm, setSearchTerm] = useState('');
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };
    
    useEffect(() => { 
        (async () => { 
            let userApi = new UserControllersApi(ApiConfig)

            try {  
                let userResponse = await userApi.getUsers()
                setUsersList(userResponse.data)
            } catch (e) { 
                console.error(e)
            }
        })()
    }, [ ])
    
    const submitTeam = async () => { 
        let teamApi = new TeamControllersApi(ApiConfig)
        try { 
            await teamApi.createTeam({ 
                name: teamName, 
                userIds: selectedUsers, 
                description: description, 
            })
            props.setIsOpenModal(false)

        } catch (e) { 
            console.error(e)
        } 
    }
    
    const filteredUsers = usersList.filter(user =>
        user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return (
        <div className="create-team-modal">
            <h2>Создайте команду</h2>
            <div className="create-team-cotainer">
                <img src={bannerForPlacement} alt="" className="create-team-banner"/>
                <div className="create-team-form">
                    <div className="create-team-field">
                        <label htmlFor="name">Название команды <span className="required-field">*</span></label>
                        <input 
                            type="text" 
                            id="name" 
                            placeholder="Например, отдел кадров, тестровщики и т.д." 
                            className="create-team-field-input"
                            onChange={(e) => setTeamName(e.target.value)}
                        />
                    </div>
                    <div className="create-team-field">
                        <label htmlFor="name">Описание команды <span className="required-field">*</span></label>
                        <input 
                            type="text" 
                            id="name" 
                            placeholder="Например чем занимается ваша команда" 
                            className="create-team-field-input"
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className="create-team-field">
                        <label htmlFor="name">Пригласите участников в свою команду <span className="required-field">*</span></label>
                        <input 
                            type="text" 
                            id="name" 
                            placeholder="Выберите участников" 
                            className="create-team-field-input"
                            onChange={handleSearchChange}
                        />
                    </div>
                    <UserSelectorComponent users={filteredUsers} selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers}/>
                    <div className="create-team-actions">
                        <ActionsButtonsComponent submitAction={() => submitTeam()} cancelAction={() => props.setIsOpenModal(false)}/>
                    </div>
                </div>
            </div>
        </div>
    )
} 

export default CreateTeamModal; 