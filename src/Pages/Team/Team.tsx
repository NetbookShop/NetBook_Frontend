import { NavProps } from "../../Utils/Types";
import data from "../../TestData/Team.json"
import "./Team.css"
import { AddUserToGroupModal, AddUserToTeamModel } from "../../Modals/Team/AddUser";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import addIcon from "../../Static/Images/add-icon.png"
import { useEffect, useState } from "react";
import Modal from "../../Modals/Base/Base";
import { TaskControllersApi, TaskModel, Team, TeamControllersApi } from "task-manager";
import { ApiConfig, asFileUrl } from "../../Gateway/Config";

const TeamPage: React.FC<NavProps> = (props: NavProps) => { 
    props.setCategory("teams")
    const [team, setTeam] = useState<Team>()
    const navigate = useNavigate(); 
    const { id } = useParams()

    const GroupAddUser = (name: string, id: string) => { 
        setCurrentGroup(name)
        setIsOpenAddUserModal(true)
    }

    const [tasks, setTasks] = useState<Array<TaskModel>>([])
    const [isOpenAddUserModal, setIsOpenAddUserModal] = useState(false); 
    const [isOpenUserModal, setIsOpenUserModal] = useState(false); 
    const [currentGroup, setCurrentGroup] = useState(''); 
    const teamApi = new TeamControllersApi(ApiConfig)
    const taskApi = new TaskControllersApi(ApiConfig)


    useEffect(() => { 
        const getData = async () => { 
            try { 
                let teamResponse = await teamApi.getTeam(id || "")
                setTeam(teamResponse.data)
                let tasksResponse = await taskApi.getTasks(undefined, undefined, teamResponse.data.id)
                setTasks(tasksResponse.data)
            } catch (e) { 
                console.error(e)
            }
        }

        getData()
    }, [])

    return ( 
        <div className="team-root">
            <Modal isOpen={isOpenUserModal} onClose={() => setIsOpenUserModal(false)}> 
                <AddUserToTeamModel setIsOpenModal={setIsOpenUserModal} teamId={id || ""}/>
            </Modal>
            <Modal isOpen={isOpenAddUserModal} onClose={() => setIsOpenAddUserModal(false)}>
                <AddUserToGroupModal setIsOpenModal={setIsOpenAddUserModal} groupName={currentGroup} teamId={id || ""}/>
            </Modal>
            <div className="team-banner">
                {team?.avatar !== null ?
                    <img src={asFileUrl(team?.avatar?.id)} alt="banner" width={"100%"} height={"200px"}/>
                : <img src={data.avatar.fileUrl} alt="banner" width={"100%"} height={"200px"}/>} 
            </div>
            <div className="team-container">
                <div className="team-left-navbar-main">
                    <div className="team-left-navbar-info">
                        <h2 className="teampage-teamname">
                            {team?.name}
                        </h2>
                        <p className="teampage-description">
                            {team?.description}
                        </p>
                    </div>
                    <div className="teampage-add-user teampage-button" onClick={() => setIsOpenUserModal(true)}>
                        Добавить пользвателя
                    </div>
                    <div className="team-main-info">
                        <div className="team-groups-list">
                            {team?.groups?.map((value) => {
                                return ( 
                                    <div className="teampage-container">
                                        <div className="teampage-team-header">
                                            <h3>{value.name}</h3>
                                            <p className="team-members-counter">{value.users?.length} Участников</p>
                                        </div>
                                        <hr />
                                        <div className="teampage-group-users">
                                            {value.users?.map((user) => { 
                                                return ( 
                                                    <NavLink to={`/user/${user.id}`} className="group-user">
                                                        <img src={asFileUrl(user.avatar?.id)} alt="" className="team-avatar-icon"/>
                                                        <p>{user?.fullName}</p>
                                                    </NavLink>
                                                )
                                            })}
                                            <div className="group-add-user" onClick={() => {GroupAddUser(value.role, value.id || "")}}>
                                                <img src={addIcon} alt="" className="team-avatar-icon"/>
                                                <p>Добавить сотрудника</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="teampage-attendance-user teampage-button" onClick={() => navigate(`/team/${team?.id}/attendance`)}>
                        Успеваемость сотрудников
                    </div>
                    <div className="teampage-button" onClick={() => navigate(`/team/${team?.id}/schedule`)}>
                        Добавить график
                    </div>
                </div>
                <div className="team-activity">
                    <div className="team-tasks">
                        <h3 className="team-info-header">Активность на работе</h3>
                        {tasks?.map((task) => { 
                            return ( 
                                <div className="team-task" onClick={() => navigate(`/task/${task.id}`)}>
                                    <p className="team-task-name">{task.title}</p>
                                    <div className="team-task-metainfo">
                                        <p className="team-project-name">
                                            {task.project.name}
                                        </p>
                                        <p>•</p>
                                        <p className="team-project-data">
                                            {task.startedAt.toString().slice(0, 10)}
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
