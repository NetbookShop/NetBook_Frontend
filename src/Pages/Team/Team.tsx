import { NavProps } from "../../Utils/Types";
import data from "../../TestData/Team.json"
import "./Team.css"
import { AddUserModalCall } from "../../Modals/Team/AddUser";
import { NavLink } from "react-router-dom";

const TeamPage: React.FC<NavProps> = (props: NavProps) => { 
    props.setCategory("teams")
    const team = data

    const GroupAddUser = (id: string) => { 

    }

    return ( 
        <div className="team-root">
            <div className="team-banner">
                <img src={team.avatar.fileUrl} alt="banner" width={"100%"} height={"200px"}/>
            </div>
            <div className="team-container">
                <div className="team-left-navbar-main">
                    <div className="team-left-navbar-info">
                        <h2 className="teampage-teamname">
                            {team.name}
                        </h2>
                        <p className="teampage-description">
                            {team.description}
                        </p>
                    </div>
                    <div className="teampage-add-user" onClick={AddUserModalCall}>
                        Добавить пользвателя
                    </div>
                    <div className="team-main-info">
                        <div className="team-groups-list">
                            {team.groups.map((value) => {
                                return ( 
                                    <div className="teampage-container">
                                        <h4>{value.name}</h4>
                                        <p>{value.users.length}</p>
                                        <hr />
                                        <div className="teampage-group-users">
                                            {value.users.map((user) => { 
                                                return ( 
                                                    <NavLink to={`/user/${user.id}`} className="group-user">
                                                        <img src={user.avatar.fileUrl} alt="" className="avatar-icon"/>
                                                        <p>{user.name}</p>
                                                    </NavLink>
                                                )
                                            })}
                                            <div className="group-add-user" onClick={() => {GroupAddUser(value.id)}}>
                                                <img src={addIcon} alt="" className="avatar-icon"/>
                                                <p>Добавить сотрудника</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TeamPage; 
