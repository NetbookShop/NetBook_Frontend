import "./CreateTeam.css"
import { useState, Dispatch, useEffect } from "react";
import "./AddUser.css"
import UserSelectorComponent from "../../Components/UserSelector/UserSelector";
import ActionsButtonsComponent from "../../Components/Actions/Actions";
import { TeamControllersApi, UserControllersApi, UserModel } from "task-manager";
import { ApiConfig } from "../../Gateway/Config";
import ErrorMessage from "../../Components/ErrorMessage/ErrorMessage";

type props = { setIsOpenModal: Dispatch<boolean>, teamId: string} 

export const AddUserToTeamModel: React.FC<props> = (props: props) => {
    const [ selectedUsers, setSelectedUsers ] = useState<Array<string>>([])
    const [searchTerm, setSearchTerm] = useState('');
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };
    const [errorMessage, setErrorMessage] = useState<string>()
    const [usersList, setUsersList] = useState<Array<UserModel>>([])
    
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
    

    const addUsers = async () => { 
        let teamApi = new TeamControllersApi(ApiConfig)
        try { 
            await teamApi.addUserToTeam(props.teamId, { 
                userIds: selectedUsers, 
            })
        } catch (e) { 
            setErrorMessage("Повторите попытку или закройте окно")
            console.error(e)
            return 
        } 

        props.setIsOpenModal(false)
    }
    
    const filteredUsers = usersList.filter(user =>
        user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="add-user-modal">
            <div className="add-user-cotainer">
                <h1 className="add-user-header">Добавление участников команды </h1>
                <p className="add-user-text">Расширяйте свою команду и оптимизируйте совместную работу. При добавлении в команду новых участников они получают доступ ко всей работе команды</p>
                <input type="text" className="search-input-field" onChange={handleSearchChange}/>
                <UserSelectorComponent users={filteredUsers} selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers}/>
                <ErrorMessage errorMessage={errorMessage} setErrorMessage={setErrorMessage}/>
                <ActionsButtonsComponent submitAction={() => addUsers()} cancelAction={() => props.setIsOpenModal(false)}/>
            </div>
        </div>
    )
}

type groupModalProps = { setIsOpenModal: Dispatch<boolean>, groupName: string, teamId: string }

export const AddUserToGroupModal: React.FC<groupModalProps> = (props: groupModalProps) => { 
    const [ selectedUsers, setSelectedUsers ] = useState<Array<string>>([])
    const [searchTerm, setSearchTerm] = useState('');
    const [errorMessage, setErrorMessage] = useState<string>()
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };
    const [usersList, setUsersList] = useState<Array<UserModel>>([])

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
    
    const addUsers = async () => { 
        let teamApi = new TeamControllersApi(ApiConfig)
        try { 
            await teamApi.addUserToTeam(props.teamId, { 
                userIds: selectedUsers, 
                group: props.groupName
            })
        } catch (e) { 
            setErrorMessage("Повторите попытку или закройте окно")
            console.error(e)
            return 
        } 

        props.setIsOpenModal(false)
    }
    
    const filteredUsers = usersList.filter(user =>
        user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return ( 
        <div className="add-user-modal">
            <div className="add-user-cotainer">
                <h1 className="add-user-header">Добавление участников команды </h1>
                <p className="add-user-text">Добавьте ваших сотрудников в группу {props.groupName} для улучшения вашей команды</p>
                <input type="text" className="search-input-field" onChange={handleSearchChange}/>
                <UserSelectorComponent users={filteredUsers} selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers}/>
                <ActionsButtonsComponent submitAction={() => addUsers()} cancelAction={() => props.setIsOpenModal(false)}/>
            </div>
        </div>
    )
}
