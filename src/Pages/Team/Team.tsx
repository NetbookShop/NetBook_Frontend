import { NavProps } from "../../Utils/Types";
import data from "../../TestData/Team.json"
import "./Team.css"
import { AddUserModalCall } from "../../Modals/Team/AddUser";
import { NavLink, useNavigate } from "react-router-dom";
import addIcon from "../../Static/Images/add-icon.png"

const TeamPage: React.FC<NavProps> = (props: NavProps) => { 
    props.setCategory("teams")
    const team = data
    const navigate = useNavigate(); 

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
                    <div className="teampage-add-user teampage-button" onClick={AddUserModalCall}>
                        Добавить пользвателя
                    </div>
                    <div className="team-main-info">
                        <div className="team-groups-list">
                            {team.groups.map((value) => {
                                return ( 
                                    <div className="teampage-container">
                                        <div className="teampage-team-header">
                                            <h3>{value.name}</h3>
                                            <p className="team-members-counter">{value.users.length} Участников</p>
                                        </div>
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
                    <div className="teampage-attendance-user teampage-button" onClick={() => navigate(`/team/${team.id}/attendance`)}>
                        Успеваемость сотрудников
                    </div>
                    <div className="teampage-button" onClick={() => navigate(`/team/${team.id}/timetable`)}>
                        Добавить график
                    </div>
                </div>
                <div className="team-activity">
                    <div className="team-tasks">
                        <h3 className="team-info-header">Активность на работе</h3>
                        {data.tasks.map((task) => { 
                            return ( 
                                <div className="team-task">
                                    <p className="team-task-name">{task.name}</p>
                                    <div className="team-task-metainfo">
                                        <p className="team-project-name">
                                            {task.projectName}
                                        </p>
                                        <p>•</p>
                                        <p className="team-project-data">
                                            {task.createdAt}
                                        </p>
                                    </div>  
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TeamPage; 
