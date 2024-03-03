import "./CreateTeam.css"
import data from "../../TestData/CreateUser.json"
import { useState, Dispatch } from "react";
import checkMark from "../../Static/Images/check-mark.png"
import "./AddUser.css"
import UserSelectorComponent from "../../Components/UserSelector/UserSelector";
import ActionsButtonsComponent from "../../Components/Actions/Actions";

type props = { setIsOpenModal: Dispatch<boolean>} 

export const AddUserModel: React.FC<props> = (props: props) => {
    const usersList = data; 
    const [ selectedUsers, setSelectedUsers ] = useState<Array<string>>([])
    const [searchTerm, setSearchTerm] = useState('');
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };
    
    const addUsers = () => { 
        props.setIsOpenModal(false)
    }
    
    const filteredUsers = usersList.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="add-user-modal">
            <div className="add-user-cotainer">
                <h1 className="add-user-header">Добавление участников команды </h1>
                <p className="add-user-text">Расширяйте свою команду и оптимизируйте совместную работу. При добавлении в команду новых участников они получают доступ ко всей работе команды</p>
                <input type="text" className="search-input-field" onChange={handleSearchChange}/>
                <UserSelectorComponent users={usersList} selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers}/>
                <ActionsButtonsComponent submitAction={() => addUsers()} cancelAction={() => props.setIsOpenModal(false)}/>
            </div>
        </div>
    )
}