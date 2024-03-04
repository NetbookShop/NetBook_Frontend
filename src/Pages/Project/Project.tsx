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
import { useState } from "react";
import Modal from "../../Modals/Base/Base";

type User = { id: string, name: string, avatar: FileScheme }

const ProjectPage: React.FC<NavProps> = (props: NavProps) => { 
    let project = data.project
    const tasks = data.tasks
    let usersNames: Array<string> = []
    let users: Array<User> = [] 
    data.tasks.map((value) => { 
        if (usersNames.indexOf(value.assiged_user.name) === -1) { 
            users.push(value.assiged_user)
            usersNames.push(value.assiged_user.name)
        }
    })
    let { projectId } = useParams() 
    props.setCategory("projects")
    let elemMaps = new Map<string, string>()
    elemMaps.set("Проекты", "/projects")
    elemMaps.set(project.name, `/project/` + project.name)
    const tasksStatus = data.tasks.map((value) => { 
        return value.status 
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

    return (
        <div className="projectpage-root">
            <Modal onClose={() => setIsCreateTaskOpen(false)} isOpen={isOepnCreateTask}>
                <CreateTaskModal 
                    setIsOpenModal={setIsCreateTaskOpen} 
                    projectId={projectId} 
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
                                    <img src={user.avatar.fileUrl} alt="fuckyou" className="profile-image"></img>
                                    <p>{user.name}</p>
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
                                                            <h4 className="task-name">{task.name}</h4>
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
