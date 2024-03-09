import { TaskControllersApi, UserControllersApi, UserModel } from "task-manager";
import ActionsButtonsComponent from "../../Components/Actions/Actions";
import UserSelectorComponent from "../../Components/UserSelector/UserSelector";
import { ModalProps } from "../../Utils/Types";
import "./AssignTask.css"
import { useState, useEffect } from 'react'
import { ApiConfig } from "../../Gateway/Config";
import ErrorMessage from "../../Components/ErrorMessage/ErrorMessage";

const AssignTask: React.FC<ModalProps> = (props: ModalProps) => {
    const assignTaskAction = async () => { 
        let taskApi = new TaskControllersApi(ApiConfig)
        if (oneUser !== undefined) { 
            try { 
                let response = await taskApi.assignUserToTask(oneUser)
            } catch (e) { 
                setErrorMessage("Ошибка в обработке запроса")
                console.error(e)
            }
        } else { 
            setErrorMessage('Вы не выбрали пользвтаеля')
            return 
        }
            
        props.setIsOpenModal(false)
    } 
    const [errorMessage, setErrorMessage] = useState<string>()
    const [ selectedUsers, setSelectedUsers ] = useState<Array<string>>([])
    const [ oneUser, setOneUser] = useState<string>()
    const [usersList, setUsersList] = useState<Array<UserModel>>([])

    const cursomSelect = (value: string[]) => { 
        setOneUser(value[-1])
        setSelectedUsers([value[-1]])
    }

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
        <div className="assigntask-root">
            <h2>Выбрите сотрудника</h2>
            <p>Кому назначить вашу задачу</p>
            <UserSelectorComponent users={usersList} selectedUsers={selectedUsers} setSelectedUsers={cursomSelect}/>
            <ErrorMessage errorMessage={errorMessage} setErrorMessage={setErrorMessage}/> 
            <ActionsButtonsComponent submitAction={() => assignTaskAction()} cancelAction={() => props.setIsOpenModal(false)}/>
        </div>
    )
}

export default AssignTask; 
