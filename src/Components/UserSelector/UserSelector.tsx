import { Dispatch, useState, useEffect } from "react";
import checkMark from "../../Static/Images/check-mark.png"
import "./UserSelector.css"
import { UserControllersApi, UserModel } from "task-manager";
import { ApiConfig, asFileUrl } from "../../Gateway/Config";

type props = { users: Array<UserModel>, selectedUsers: Array<string>, setSelectedUsers: Dispatch<Array<string>> }

const UserSelectorComponent: React.FC<props> = (props: props) => { 
    const [usersList, setUsersList] = useState<Array<UserModel>>([])
    const MarkUserAsSelected = (id: string) => { 
        if (props.selectedUsers.indexOf(id) !== -1) { 
            props.setSelectedUsers(props.selectedUsers.filter(v => { 
                return v !== id
            }))
        } else { 
            props.setSelectedUsers([...props.selectedUsers, id])
        } 
    }
    useEffect(() => { 
        (async () => {
            let userApi = new UserControllersApi(ApiConfig) 
            try { 
                let usersResponse = await userApi.getUsers()
                setUsersList(usersResponse.data)
            } catch (e) { 
                console.error(e)
            }
        })()
    }, [])

    return ( 
        <div className="users-list">
            <div className="users-list-container">
                {usersList.map((value) => { 
                    return (
                        <div className="user-list-selector">
                            <div className="user-list-container">
                                <img src={asFileUrl(value.avatar?.filePath)} alt="" className="avatar-icon"/>
                                <p>{value.fullName}</p>
                            </div>

                            <div className="check-mark-container" onClick={() => MarkUserAsSelected(value.id || "")}>
                                {props.selectedUsers.indexOf(value.id || "") !== -1 ?
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
