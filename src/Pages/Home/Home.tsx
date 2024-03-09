import { useEffect, useState } from "react";
import Data from "../../TestData/Home.json"  
import { NavProps } from "../../Utils/Types";
import "./Home.css"
import PaginationNavigation from "../../Components/Pagination/Pagination";
import { NavLink, useNavigate } from "react-router-dom";
import { Project, ProjectControllersApi, TaskControllersApi, TaskModel } from "task-manager";
import { ApiConfig, asFileUrl } from "../../Gateway/Config";

const HomePage: React.FC<NavProps> = (props: NavProps) => { 
    const [currentTasks, setCurrentTasks] = useState<Array<TaskModel>>([]); 
    const [projects, setProjects] = useState<Array<Project>>([]); 
    const tasksStatus = currentTasks.map((value) => { 
        return value.status 
    })
    const tasksCategories = tasksStatus.filter((item, i, ar) => ar.indexOf(item) === i)
    props.setCategory("work")
    const [currentTasksCategory, setCurrentTasksCategory] = useState(tasksCategories.length > 1 ? tasksCategories[0] : '');  
    const tasksCounterByCategory: { [key: string]: number } = currentTasks.reduce((counter: { [key: string]: number }, task) => {
        counter[task.status] = (counter[task.status] || 0) + 1;
        return counter;
    }, {});
    const [currentPage, setCurrentPage] = useState<number>(0); 
    const navigate = useNavigate()

    useEffect(() => { 
        const projectApi = new ProjectControllersApi(ApiConfig)

        const getData = async () => { 
            try { 
                let projectResponse = await projectApi.getProjectsList()
                setProjects(projectResponse.data)
  
            } catch (e) { 
                console.error(e)
            }
        }

        getData()
    }, [props.user]) 
    useEffect(() => { 
        (async () => {
            const taskApi = new TaskControllersApi(ApiConfig)
 
            try { 
                let tasksResponse = await taskApi.getTasks(props.user?.id || "")
                setCurrentTasks(tasksResponse.data)          
            } catch (e) { 
                console.error(e)
            }
        })()
    }, [props.user])

    return (
        <div className="home-root">
            <h1 className="your-work">Ваша работа</h1>
            <h3 className="recent-projects">Недавние проекты</h3>
            <div className="projects-container">
                {projects.map((project) => { 
                    return (
                        <div className="project-card">
                            <div className="project-content">
                                <div className="project-header">
                                    <img src={asFileUrl(project.icon?.filePath)} alt="" width={24} height={24}/>
                                    <h3 className="project-name">{project.name}</h3>
                                </div>
                                <p className="fast-links">Быстрые ссылки</p>
                                <ul>
                                    <li className="tasks-group" onClick={() => navigate(`/project/${project.id}`)}>
                                        <p className="tasks-type">Открытые задачи </p>
                                        <p className="tasks-count">{tasksCounterByCategory['open'] || 0}</p>
                                    </li>
                                    <li className="tasks-group" onClick={() => navigate(`/project/${project.id}`)}>
                                        <p className="tasks-type">Завершенные задачи</p>
                                        <p className="tasks-count">{tasksCounterByCategory["completed"] || 0}</p>
                                    </li>
                                    <li className="tasks-group" onClick={() => navigate(`/project/${project.id}`)}>
                                        <p className="tasks-type">Назначеные задачи</p>
                                        <p className="tasks-count">{tasksCounterByCategory['onWork'] || 0}</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className="tasks">
                <div className="tasks-navbar">
                    {tasksCategories.map((group) => { 
                        return (
                            <div className="tasks-navbar-link">
                                <button
                                    onClick={() => setCurrentTasksCategory(group)} 
                                    className={
                                        "tasks-navbar-choice " + 
                                        (group === currentTasksCategory ? "current-link" : "")
                                    }
                                >
                                    {group} 
                                    <span className="tasks-navbar-counter">
                                        {tasksCounterByCategory[group]}
                                    </span>
                                </button>
                            </div>
                        )
                    })}
                </div>
                <ul className="tasks-list">
                    <div className="task-timestmp">Сегодня</div>
                    {currentTasks.map((task) => {
                        return (
                            <div>
                                {task.status === currentTasksCategory ? 
                                <li className="home-task-container">
                                    <NavLink to={`/task/${task.id}`}>
                                        <div className="task-content">
                                            <div className="left-content">
                                                <img src={asFileUrl(task.project.icon?.filePath)} alt={task.project.icon?.fileName} className="project-icon"/>
                                                <div className="task-metadata">
                                                    <h4 className="task-title">{task.title}</h4>
                                                    <span className="task-project">{task.project.name}</span>
                                                </div>
                                            </div>
                                            <div className="right-content">
                                                <h4 className="task-project">Создано</h4>
                                                <img src={asFileUrl(task.createdBy.avatar?.filePath)} alt={task.createdBy.avatar?.fileName} className="avatar-owner-icon"/>
                                            </div>
                                        </div>
                                    </NavLink>
                                </li>
                                : null}
                            </div>
                        )
                    })} 
                </ul>
                <div className="pagination-pages">
                    <PaginationNavigation pageCounter={1} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
                </div>
            </div>
        </div>
    )
}

export default HomePage; 