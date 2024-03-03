import { ChangeEventHandler, Dispatch, useState } from "react";
import { UserScheme } from "../../Schemes/User";
import checkMark from "../../Static/Images/check-mark.png"
import "./UserSelector.css"

type props = { users: Array<UserScheme>, selectedUsers: Array<string>, setSelectedUsers: Dispatch<Array<string>> }

const UserSelectorComponent: React.FC<props> = (props: props) => { 
    const usersList = props.users; 
    const MarkUserAsSelected = (id: string) => { 
        if (props.selectedUsers.indexOf(id) !== -1) { 
            props.setSelectedUsers(props.selectedUsers.filter(v => { 
                return v !== id
            }))
        } else { 
            props.setSelectedUsers([...props.selectedUsers, id])
        } 
    }

    return ( 
        <div className="users-list">
            <div className="users-list-container">
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
                                    <img src={checkMark} alt="" width={26} height={24}/>
                                </div>: 
                                <div className="check-mark-inactive">

                                </div> }
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default UserSelectorComponent; 
