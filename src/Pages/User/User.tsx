import { NavProps } from "../../Utils/Types";
import data from "../../TestData/User.json"
import "./User.css"
import organizationIcon from "../../Static/Images/organization-icon.png"
import emailIcon from "../../Static/Images/email-icon.png"
import jobIcon from "../../Static/Images/job-icon.png"
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { TaskControllersApi, TaskModel, Team, TeamControllersApi, UserControllersApi, UserModel, WorkVisit } from "task-manager";
import { ApiConfig, asFileUrl } from "../../Gateway/Config";

const UserPage: React.FC<NavProps> = (props: NavProps) => { 
    props.setCategory("teams")
    const navigate = useNavigate();
    const [userTeams, setUserTeams] = useState<Array<Team>>([]); 
    const { id } = useParams();   
    const [user, setUser] = useState<UserModel>();
    const [workVisits, setWorkVisists] = useState<Array<WorkVisit>>([])
    const [tasks, setTasks] = useState<Array<TaskModel>>([])

    useEffect(() => { 
        const teamApi = new TeamControllersApi(ApiConfig)
        const taskApi = new TaskControllersApi(ApiConfig)
        const userApi = new UserControllersApi(ApiConfig)
        const getData = async () => { 
            if (props.user !== undefined) { 
                try { 
                    let _tasks = await taskApi.getTasks(props.user.id || "", undefined, undefined, true)
                    setTasks(_tasks.data)
                    let teams = await teamApi.getTeamsAll(props.user.id)
                    setUserTeams(teams.data)
                } catch (e) { 
                    console.error(e)
                }
            } 
            if (props.user?.id === id && props.user !== undefined) { 
                setUser(props.user)
                return 
            } 
            if (id !== undefined) { 
                let _user = await userApi.getUser(id)
                setUser(_user.data)
                return 
            } 
            setWorkVisists(user?.workVisits || [])
        }

        getData().catch((error) => console.error(error)).then((id) => 1); 
    }, [props.user])

    return (
        <div className="user-root">
            <div className="user-banner">
                <img src={data.banner.fileUrl} alt="banner" width={"100%"} height={"200px"}/>
            </div>
            {user !== undefined ? 
            <div className="user-container">
                <div className="user-left-navbar-main">
                    <div className="user-avatar">
                        {user.avatar !== null ? 
                            <img src={asFileUrl(user.avatar?.filePath || "")} alt="" className="user-avatar-icon" width={"160px"} height={"160px"}/>
                        : null } 
                    </div>
                    <div className="user-left-navbar-info">
                        <h1 className="userpage-username">
                            {user.fullName}
                        </h1>   
                        <div className="account-control">
                            Управление аккаунтом
                        </div>
                        <div className="account-info-container">
                            <div className="account-main-info">
                                <h3 className="account-info-header">Сведения</h3>
                                <hr className="account-info-line"/>
                                <div className="organization-info account-info-field">
                                    <img src={organizationIcon} alt="org" className="organization-icon"/>
                                    <p>{data.organization}</p>
                                </div>
                                <div className="account-info-job account-info-field">
                                    <img src={jobIcon} alt="org" className="organization-icon"/>
                                    <p>{data.job}</p>
                                </div>
                            </div>
                            <div className="account-contacts">
                                <h3 className="account-info-header">Контакты</h3>
                                <hr className="account-info-line"/>
                                <div className="account-email account-info-field">
                                    <img src={emailIcon} alt="org" className="organization-icon"/>
                                    <p>{user.email}</p>
                                </div>
                            </div>
                            <div className="account-teams">
                                <h3 className="account-info-header">Команды</h3>
                                <hr className="account-info-line"/>
                                    {userTeams.map((value) => { 
                                        return ( 
                                            <div className="account-team-container" onClick={() => navigate(`/team/${value.id}`)}>
                                                <img src={asFileUrl(value.avatar?.filePath || "")} alt="" className="account-team-logo" width={30} height={30}/>
                                                <div className="account-team-info">
                                                    <p>{value.name}</p>
                                                    {/* <p className="account-team-memebers-count">{value.membersCount} Участника</p> */}
                                                    <p className="account-team-memebers-count">2 Участника</p>
                                                </div>
                                            </div>
                                        )
                                    })}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="account-activity">
                    <div className="account-tasks">
                        <h3 className="account-info-header">Активность на работе</h3>
                        {tasks.map((task) => { 
                            return ( 
                                <div className="account-task" onClick={() => navigate(`/task/${task.id}`)}>
                                    <p className="account-task-name">{task.title}</p>
                                    <div className="account-task-metainfo">
                                        <p className="account-project-name">
                                            {task.project?.name}
                                        </p>
                                        <p>•</p>
                                        <p className="account-project-data">
                                            "Сегодня"
                                        </p>
                                    </div>  
                                </div>
                            )
                        })}
                    </div>

                    <div className="account-attendance">
                        <h3 className="account-info-header">Посещаемость</h3>
                        <div className="attendance-list">
                            {workVisits.map((visit) => { 
                                return <div className="account-work-visit">
                                    <p>Посщение работы</p>
                                    <p>{visit.visitedAt?.toString()}</p>
                                </div>
                            })}
                        </div>
                    </div>
                </div>
            </div>
            : null } 
        </div>
    )
}

export default UserPage; 
