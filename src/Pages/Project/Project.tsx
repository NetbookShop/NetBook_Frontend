import NavigationMapComponent from "../../Components/NavigationMap/NavigationMap";
import { NavProps } from "../../Utils/Types";
import SearchComponent from "../../Components/Search/Search";
import closeIcon from "../../Static/Images/close-icon.svg"
import CreateTaskModal from "../../Modals/Task/CreateTask";
import "./Project.css"
import ArrowIcon from "../arrow";
import { NavLink, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Modal from "../../Modals/Base/Base";
import { Project, ProjectControllersApi, TaskControllersApi, TaskModel, UserModel } from "task-manager";
import { ApiConfig, asFileUrl } from "../../Gateway/Config";
import AddUserToProjectModal from "../../Modals/Project/AddUserToProject";

const ProjectPage: React.FC<NavProps> = (props: NavProps) => { 
    const [project, setProject] = useState<Project>()
    const [tasks, setTasks] = useState<Array<TaskModel>>([])
    let usersNames: Array<string> = []
    let users: Array<UserModel> = [] 
    tasks.forEach((value) => { 
        if (value !== undefined && value.assignedUser !== null) {
            if (value.assignedUser !== undefined) {  
                if (usersNames.indexOf(value.assignedUser.fullName || "") === -1) { 
                    users.push(value.assignedUser)
                    usersNames.push(value.assignedUser.fullName || "")
                }
            } 
        } 
    })
    let { id } = useParams() 
    props.setCategory("projects")
    let elemMaps = new Map<string, string>()
    elemMaps.set("Проекты", "/projects")
    elemMaps.set(project?.name || "", `/project/` + project?.id)
    const [isOepnCreateTask, setIsCreateTaskOpen] = useState(false)
    const [tasksGroups, setTasksGroups] = useState<Array<string>>([])
    const [currentUserId, setCurrentUserId] = useState('')
    const [currentStatusName, setCurrentStatusName] = useState('')
    const [isAddUserOpen, setIsAddUserOpen] = useState(false)
    const openCreateTaskModal = (user: any, group: string) => { 
        setCurrentUserId(user.id)
        setCurrentStatusName(group)
        setIsCreateTaskOpen(true)
    }
    const projectApi = new ProjectControllersApi(ApiConfig)
    const tasksApi = new TaskControllersApi(ApiConfig)
    useEffect(() => { 
        const getData = async () => { 
            try { 
                let response = await projectApi.getProject(id || "")
                setProject(response.data)
                response.data.taskTypes?.forEach((value) => {
                    if (tasksGroups.indexOf(value.name) === -1) { 
                        setTasksGroups([...tasksGroups, value.name])
                    } 
                })
                let tasksResponse = await tasksApi.getTasks(project?.id || "")
                setTasks(tasksResponse.data)
            } catch (e) { 
                console.error(e)
            }
        }

        getData()
    }, [tasksGroups])

    return (
        <div className="projectpage-root">
            <Modal onClose={() => setIsCreateTaskOpen(false)} isOpen={isOepnCreateTask}>
                <CreateTaskModal 
                    setIsOpenModal={setIsCreateTaskOpen} 
                    projectId={id || ""} 
                    assigedUserId={currentUserId} 
                    taskStatus={currentStatusName}
                />
            </Modal>
            <Modal onClose={() => setIsAddUserOpen(false)} isOpen={isAddUserOpen}> 
                <AddUserToProjectModal setIsOpenModal={setIsAddUserOpen} projectId={project?.id || ""} />
            </Modal>
            <NavigationMapComponent elements={elemMaps}/>
            <h1>Доска проекта</h1>
            <div className="projectpage-navbar">
                <SearchComponent width={234} placeholder="Поиск по доске" />
                <div onClick={() => setIsAddUserOpen(true)} className="add-user-to-project">Добавить пользвателя</div>
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
