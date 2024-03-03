import "./CreateTeam.css"
import data from "../../TestData/CreateUser.json"
import { useState } from "react";
import checkMark from "../../Static/Images/check-mark.png"

export const AddUserModel = () => {
    const usersList = data; 
    const [ selectedUsers, setSelectedUsers ] = useState<Array<string>>([])
    const MarkUserAsSelected = (id: string) => { 
        setSelectedUsers([...selectedUsers, id])
    }

    return (
        <div className="create-team-modal">
            <div className="create-team-cotainer">
                <input type="text" className="search-input-field"/>
                <div className="users-list">
                    {usersList.map((value) => { 
                        return (
                            <div className="user-list-selector">
                                <div className="user-list-container">
                                    <img src={value.avatar.fileUrl} alt="" className="avatar-icon"/>
                                    <p>{value.name}</p>
                                </div>

                                <div className="check-mark-container" onClick={() => MarkUserAsSelected(value.id)}>
                                    {selectedUsers.indexOf(value.id) !== -1 ?
                                    <div className="check-mark-active">
                                        <img src={checkMark} alt="" width={24} height={24}/>
                                    </div>: null }
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}