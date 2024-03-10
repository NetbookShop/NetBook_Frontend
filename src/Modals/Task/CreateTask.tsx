import { ChangeEvent, Dispatch, useState } from "react";
import ActionsButtonsComponent from "../../Components/Actions/Actions";
import arrowIcon from "../../Static/Images/arrow-icon-long.png" 
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
    const [startDate, setStartDate] = useState<Date>()
    const [endDate, setEndDate] = useState<Date>() 

    const handleDateSet = (e: ChangeEvent<HTMLInputElement>, setSomething: Dispatch<Date>) => { 
        if (e.target.valueAsDate !== null) { 
            setSomething(e.target.valueAsDate)
        }
    }

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
                    endsAt: endDate, 
                    startsAt: startDate, 
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
            <div className="datetime-field">
                <input 
                    type="date" 
                    className="create-task-date" 
                    placeholder="Начало" 
                    onChange={(e) => handleDateSet(e, setStartDate)}
                />
                <img src={arrowIcon} alt="чтото" className="" width={30} height={24}/>
                <input 
                    type="date" 
                    className="create-task-date" 
                    placeholder="До этой даты" 
                    onChange={(e) => handleDateSet(e, setEndDate)}/>
            </div>
            <ActionsButtonsComponent submitAction={() => createTask()} cancelAction={() => props.setIsOpenModal(false)}/>
        </div>
    )
}

export default CreateTaskModal; 
