import { ChangeEventHandler, Dispatch, useState } from "react";
import { UserScheme } from "../../Schemes/User";
import checkMark from "../../Static/Images/check-mark.png"

type props = { users: Array<UserScheme>, selectedUsers: Array<string>, setSelectedUsers: Dispatch<Array<string>>, searchChangeHandler: ChangeEventHandler }

const UserSelector: React.FC<props> = (props: props) => { 
    const usersList = props.users; 
    const MarkUserAsSelected = (id: string) => { 
        props.setSelectedUsers([...props.selectedUsers, id])
    }

    return ( 
        <div className="users-list">
            <input type="text" className="search-input-field" onChange={props.searchChangeHandler}/>
            <div className="users-list">
                {usersList.map((value) => { 
                    return (
                        <div className="user-list-selector">
                            <div className="user-list-container">
                                <img src={value.avatar.fileUrl} alt="" className="avatar-icon"/>
                                <p>{value.name}</p>
                            </div>

                            <div className="check-mark-container" onClick={() => MarkUserAsSelected(value.id)}>
                                {props.selectedUsers.indexOf(value.id) !== -1 ?
                                <div className="check-mark-active">
                                    <img src={checkMark} alt="" width={24} height={24}/>
                                </div>: null }
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default UserSelector; 
