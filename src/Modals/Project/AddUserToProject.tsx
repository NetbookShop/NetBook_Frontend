import { Dispatch, useState } from "react";
import data from "../../TestData/CreateUser.json"
import UserSelectorComponent from "../../Components/UserSelector/UserSelector";
import ActionsButtonsComponent from "../../Components/Actions/Actions";

type ModalProps = { setIsOpenModal: Dispatch<boolean>, projectId: string}

const AddUserToProjectModal: React.FC<ModalProps> = (props: ModalProps) => { 
    const assignTaskAction = () => { 
        props.setIsOpenModal(false)
    } 
    const usersList = data; 
    const [ selectedUsers, setSelectedUsers ] = useState<Array<string>>([])
    
    return ( 
        <div className="project-add-user-root">
            <h2>Выбрите сотрудника</h2>
            <p>Для назначения на этот проект</p>
            <UserSelectorComponent users={usersList} selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers}/>
            <ActionsButtonsComponent submitAction={() => assignTaskAction()} cancelAction={() => props.setIsOpenModal(false)}/>
        </div>
    )
}

export default AddUserToProjectModal; 
