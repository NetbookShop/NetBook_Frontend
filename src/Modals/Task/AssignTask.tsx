import ActionsButtonsComponent from "../../Components/Actions/Actions";
import UserSelectorComponent from "../../Components/UserSelector/UserSelector";
import { ModalProps } from "../../Utils/Types";
import "./AssignTask.css"
import{ useState } from 'react'
import data from "../../TestData/CreateUser.json"

const AssignTask: React.FC<ModalProps> = (props: ModalProps) => {
    const assignTaskAction = () => { 
        props.setIsOpenModal(false)
    } 
    const usersList = data; 
    const [ selectedUsers, setSelectedUsers ] = useState<Array<string>>([])
    // const [searchTerm, setSearchTerm] = useState('');
    // const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setSearchTerm(event.target.value);
    // };
    

    return (
        <div className="assigntask-root">
            <h2>Выбрите сотрудника</h2>
            <p>Кому назначить вашу задачу</p>
            <UserSelectorComponent users={usersList} selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers}/>
            <ActionsButtonsComponent submitAction={() => assignTaskAction()} cancelAction={() => props.setIsOpenModal(false)}/>
        </div>
    )
}

export default AssignTask; 
