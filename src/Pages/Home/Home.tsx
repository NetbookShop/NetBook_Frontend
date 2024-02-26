import { useState } from "react";
import Data from "../../TestData/Home.json"  
import { range } from "../../Utils/Range";
import { NavProps } from "../../Utils/Types";
import arrowIcon from "../../Static/Images/arrow-icon.png"
import "./Home.css"
import ArrowIcon from "../arrow";

const HomePage: React.FC<NavProps> = (props: NavProps) => { 
    const currentTasks = Data.tasks; 
    const projects = Data.projects; 
    const listCount = range(1, 1)
    const tasksStatus = Data.tasks.map((value) => { 
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
                                    <img src={project.photo.fileUrl} alt="" width={24} height={24}/>
                                    <h3 className="project-name">{project.name}</h3>
                                </div>
                                <p className="fast-links">Быстрые ссылки</p>
                                <ul>
                                    <li className="tasks-group">
                                        <p className="tasks-type">Открытые задачи </p>
                                        <p className="tasks-count">{project.openTasks}</p>
                                    </li>
                                    <li className="tasks-group">
                                        <p className="tasks-type">Завершенные задачи</p>
                                        <p className="tasks-count">{project.closedTasks}</p>
                                    </li>
                                    <li className="tasks-group">
                                        <p className="tasks-type">Назначеные задачи</p>
                                        <p className="tasks-count">{project.assignedTasks}</p>
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
                                        (group == currentTasksCategory ? "current-link" : "")
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
                                {task.status == currentTasksCategory ? 
                                <li className="task-container">
                                <div className="task-content">
                                    <div className="left-content">
                                        <img src={task.projectIcon.fileUrl} alt={task.projectIcon.fileName} className="project-icon"/>
                                        <div className="task-metadata">
                                            <h4 className="task-title">{task.title}</h4>
                                            <span className="task-project">{task.projectName}</span>
                                        </div>
                                    </div>
                                    <div className="right-content">
                                        <h4 className="task-project">Создано</h4>
                                        <img src={task.assignedTo.avatar.fileUrl} alt={task.assignedTo.avatar.fileName} className="avatar-icon"/>
                                    </div>
                                </div>
                                </li>
                                : null}
                            </div>
                        )
                    })} 
                </ul>
                <div className="pagination-pages">
                    <ul className="pagination-list">
                        <li>
                            <div className="left-arrow">
                                <button className="arrow-button" onClick={() => setCurrentPage(currentPage - 1)}>
                                    <ArrowIcon />
                                </button>
                            </div>
                        </li>
                        {listCount.map((value) => {
                            return (
                                <li className="page">{value}</li>
                            )
                        })}
                        <li>
                            <div className="right-arrow">
                                <button className="arrow-button" onClick={() => setCurrentPage(currentPage + 1)}>
                                    <ArrowIcon />
                                </button>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default HomePage; 