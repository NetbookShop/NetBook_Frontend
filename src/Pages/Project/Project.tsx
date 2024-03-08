import NavigationMapComponent from "../../Components/NavigationMap/NavigationMap";
import { NavProps } from "../../Utils/Types";
import data from "../../TestData/Project.json"
import SearchComponent from "../../Components/Search/Search";
import closeIcon from "../../Static/Images/close-icon.svg"
import CreateTaskModal from "../../Modals/Task/CreateTask";
import "./Project.css"
import { FileScheme } from "../../Schemes/File";
import ArrowIcon from "../arrow";
import { NavLink, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Modal from "../../Modals/Base/Base";
import { Project, ProjectControllersApi, TaskControllersApi, TaskModel, UserControllersApi, UserModel } from "task-manager";
import { ApiConfig, asFileUrl } from "../../Gateway/Config";

const ProjectPage: React.FC<NavProps> = (props: NavProps) => { 
    const [project, setProject] = useState<Project>()
    const [tasks, setTasks] = useState<Array<TaskModel>>([])
    let usersNames: Array<string> = []
    let users: Array<UserModel> = [] 
    tasks.map((value) => { 
        if (value !== undefined && value.assignedUser !== undefined) { 
            if (usersNames.indexOf(value.assignedUser?.fullName || "") === -1) { 
                users.push(value.assignedUser)
                usersNames.push(value.assignedUser.fullName || "")
            }
        } 
    })
    let { projectId } = useParams() 
    props.setCategory("projects")
    let elemMaps = new Map<string, string>()
    elemMaps.set("Проекты", "/projects")
    if (project !== undefined) { 
        elemMaps.set(project.name || "", `/project/` + project.name)
    } 
    const tasksStatus: Array<string> = tasks.map((value) => { 
        return value.status || ""
    })
    const [isOepnCreateTask, setIsCreateTaskOpen] = useState(false)
    const tasksGroups = tasksStatus.filter((item, i, ar) => ar.indexOf(item) === i)
    const [currentUserId, setCurrentUserId] = useState('')
    const [currentStatusName, setCurrentStatusName] = useState('')
    const openCreateTaskModal = (user: any, group: string) => { 
        setCurrentUserId(user.id)
        setCurrentStatusName(group)
        setIsCreateTaskOpen(true)
    }
    const projectApi = new ProjectControllersApi(ApiConfig)
    const tasksApi = new TaskControllersApi(ApiConfig)
    const userApi = new UserControllersApi(ApiConfig)
    useEffect(() => { 
        const getData = async () => { 
            try { 
                let response = await projectApi.getProject(undefined, projectId)
                setProject(response.data)
                let tasksResponse = await tasksApi.getTasks(project?.id)
                setTasks(tasksResponse.data)
            } catch (e) { 
                console.error(e)
            }
        }

        getData()
    }, [])

    return (
        <div className="projectpage-root">
            <Modal onClose={() => setIsCreateTaskOpen(false)} isOpen={isOepnCreateTask}>
                <CreateTaskModal 
                    setIsOpenModal={setIsCreateTaskOpen} 
                    projectId={projectId || ""} 
                    assigedUserId={currentUserId} 
                    taskStatus={currentStatusName}
                />
            </Modal>
            <NavigationMapComponent elements={elemMaps}/>
                <h1>Доска проекта</h1>
            <div className="projectpage-navbar">
                <SearchComponent width={234} placeholder="Поиск по доске" />
            </div>
            <div className="project-board-container">
                <div className="tasks-groups">
                    {tasksGroups.map((value) => { 
                            return (
                                <div className="task-group">
                                    <p className="task-group-name">{value}</p>
                                </div>
                            )
                        }
                    )}
                </div>
                <div className="tasks">
                    {users.map((user) => {
                        return (
                            <div>
                                <div className="users-info">
                                    <ArrowIcon width={28} height={28}/>
                                    <img src={asFileUrl(user.avatar?.filePath)} alt="fuckyou" className="profile-image"></img>
                                    <p>{user.fullName}</p>
                                </div>
                                <div className="user-tasks-container">
                                {tasksGroups.map((group) => {
                                    return (
                                        <div className="grouped-tasks-window">
                                            {tasks.map((task) => { 
                                                if (task.status !== group) { 
                                                    return null 
                                                } 
                                                return (
                                                    <div className="group-task">
                                                        <NavLink to={`/task/${task.id}`}>
                                                            <h4 className="task-name">{task.title}</h4>
                                                            <p>{task.description?.slice(0, 40)}</p>
                                                        </NavLink>
                                                    </div>
                                                )
                                            })}
                                            <div className="create-task" onClick={() => openCreateTaskModal(user, group)}>
                                                <img src={closeIcon} alt="close-icon" />
                                                <p>Создать задачу</p>
                                            </div>
                                        </div>
                                    )
                                })}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default ProjectPage; 
