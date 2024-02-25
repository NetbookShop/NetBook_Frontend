import Data from "../../TestData/Home.json"  
import { range } from "../../Utils/Range";
import { NavProps } from "../../Utils/Types";
import "./Home.css"

const HomePage: React.FC<NavProps> = (props: NavProps) => { 
    const currentTasks = Data.tasks; 
    const projects = Data.projects; 
    const listCount = range(1, 1)
    props.setCategory("work")
 
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
                <ul>
                    {currentTasks.map((task) => {
                        return (
                            <li className="task-container">
                                <div className="task-content">
                                    <div className="left-content">
                                        <img src={task.projectIcon.fileUrl} alt={task.projectIcon.fileName} className="project-icon"/>
                                        <h4 className="task-title">{task.title}</h4>
                                        <h4 className="task-project">{task.projectName}</h4>
                                    </div>
                                    <div className="right-content">
                                        <h4 className="task-project">Создано</h4>
                                        <img src={task.assignedTo.avatar.fileUrl} alt={task.assignedTo.avatar.fileName} className="avatar-icon"/>
                                    </div>
                                </div>
                            </li>
                        )
                    })} 
                </ul>
                <div className="pagination-pages">
                    <ul>
                        <li><div className="left-arrow"><img src="" alt="" /></div></li>
                        {listCount.map((value) => {
                            return (
                                <li className="page">{value}</li>
                            )
                        })}
                        <li><div className="right-arrow"><img src="" alt="" /></div></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default HomePage; 