import "./CreateTeam.css"
import data from "../../TestData/CreateUser.json"
import { useState, Dispatch } from "react";
import UserSelectorComponent from "../../Components/UserSelector/UserSelector";
import ActionsButtonsComponent from "../../Components/Actions/Actions";
import "./CreateTeam.css"
import bannerForPlacement from "../../Static/Images/banner-for-place.svg"

type props = { setIsOpenModal: Dispatch<boolean>} 

const CreateTeamModal = (props: props) => {
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
                        <ActionsButtonsComponent submitAction={() => addUsers()} cancelAction={() => props.setIsOpenModal(false)}/>
                    </div>
                </div>
            </div>
        </div>
    )
} 

export default CreateTeamModal; 