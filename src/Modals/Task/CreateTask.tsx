import { Dispatch } from "react";
import ActionsButtonsComponent from "../../Components/Actions/Actions";
import { ModalProps } from "../../Utils/Types";
import "./CreateTask.css"

type CreateTaskProps = { 
    setIsOpenModal: Dispatch<boolean>
    taskStatus: string, 
    projectId: string, 
    assigedUserId: string
    
}

const CreateTaskModal: React.FC<CreateTaskProps> = (props: CreateTaskProps) => {
    const createTask = () => { 
        
    }
    
    return ( 
        <div className="create-task-root">
            <h1>Создание задачи для ваших сотрудников</h1>
            <input type="text" className="create-task-input" placeholder="Название задачи"/>
            <input type="textarea" className="create-task-input-description create-task-input" placeholder="Описание задачи"/>
            <ActionsButtonsComponent submitAction={() => createTask()} cancelAction={() => props.setIsOpenModal(false)}/>
        </div>
    )
}

export default CreateTaskModal; 
