import { Dispatch, useState, useEffect } from "react";
import data from "../../TestData/CreateUser.json"
import UserSelectorComponent from "../../Components/UserSelector/UserSelector";
import ActionsButtonsComponent from "../../Components/Actions/Actions";
import { ProjectControllersApi, UserControllersApi, UserModel } from "task-manager";
import { ApiConfig } from "../../Gateway/Config";
import ErrorMessage from "../../Components/ErrorMessage/ErrorMessage";

type ModalProps = { setIsOpenModal: Dispatch<boolean>, projectId: string}

const AddUserToProjectModal: React.FC<ModalProps> = (props: ModalProps) => { 
    const addUserToProjectAction = async () => {
        let projectApi = new ProjectControllersApi(ApiConfig)
        try { 
            selectedUsers.forEach(async (element) => {
                let response = await projectApi.addUserToProject(props.projectId, {
                    userId: element
                });
            });
        } catch (e) { 
            setErrorMessage("Ошибка в обработке запроса")
            console.error(e)
        }
        
        props.setIsOpenModal(false)
    } 
    const [errorMessage, setErrorMessage] = useState<string>()
    const [usersList, setUsersList] = useState<Array<UserModel>>([])
    const [ selectedUsers, setSelectedUsers ] = useState<Array<string>>([])
    
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

    return ( 
        <div className="project-add-user-root">
            <h2>Выбрите сотрудника</h2>
            <p>Для назначения на этот проект</p>
            <UserSelectorComponent users={usersList} selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers}/>
            <ErrorMessage errorMessage={errorMessage} setErrorMessage={setErrorMessage}/> 
            <ActionsButtonsComponent submitAction={() => addUserToProjectAction()} cancelAction={() => props.setIsOpenModal(false)}/>
        </div>
    )
}

export default AddUserToProjectModal; 
