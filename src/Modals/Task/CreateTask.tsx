import { Dispatch, useState } from "react";
import ActionsButtonsComponent from "../../Components/Actions/Actions";
import { ModalProps } from "../../Utils/Types";
import "./CreateTask.css"
import { TaskControllersApi } from "task-manager";
import { ApiConfig } from "../../Gateway/Config";

type CreateTaskProps = { 
    setIsOpenModal: Dispatch<boolean>
    taskStatus: string, 
    projectId: string, 
    assigedUserId: string
    
}

const CreateTaskModal: React.FC<CreateTaskProps> = (props: CreateTaskProps) => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')


    const createTask = async () => { 
        let taskApi = new TaskControllersApi(ApiConfig)

        try { 
            await taskApi.createTask(
                { 
                    projectId: props.projectId, 
                    assignToUserId: props.assigedUserId, 
                    title: title, 
                    description: description, 
                    status: props.taskStatus, 
                }
            )
            props.setIsOpenModal(false)
        } catch (e) { 
            console.error(e)
        }
    }
    
    return ( 
        <div className="create-task-root">
            <h1>Создание задачи для ваших сотрудников</h1>
            <input 
                type="text" 
                className="create-task-input" 
                placeholder="Название задачи"
                onChange={(e) => setTitle(e.target.value)}
            />
            <input
                type="textarea"
                className="create-task-input-description create-task-input" 
                placeholder="Описание задачи" 
                onChange={(e) => setDescription(e.target.value)}
            />
            <ActionsButtonsComponent submitAction={() => createTask()} cancelAction={() => props.setIsOpenModal(false)}/>
        </div>
    )
}

export default CreateTaskModal; 
