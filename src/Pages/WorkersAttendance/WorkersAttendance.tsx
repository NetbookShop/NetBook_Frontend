import { NavLink, useParams } from "react-router-dom";
import NavigationMapComponent from "../../Components/NavigationMap/NavigationMap";
import { NavProps } from "../../Utils/Types";
import "./WorkersAttendance.css"
import data from "../../TestData/WorkersAttendance.json"
import { useState } from "react";
import PaginationNavigation from "../../Components/Pagination/Pagination";

const WorkersAttendancePage: React.FC<NavProps> = (props: NavProps) => { 
    props.setCategory("teams")
    const { id } = useParams()
    let elements = new Map<string, string>() 
    elements.set("Команды", "/teams")
    elements.set(data.team.name, `/team/${id}`)
    elements.set("Посещения", `/team/${id}/attendance`)
    const workers = data.workers
    const workersCategories = ["office", "online", "unable"] 
    const [currentWorkersCategory, setCurrentWorkersCategory] = useState<string>();  
    const tasksCounterByCategory: { [key: string]: number } = workers.reduce((counter: { [key: string]: number }, worker) => {
        counter[worker.workType] = (counter[worker.workType] || 0) + 1;
        return counter;
    }, {});
    const [currentPage, setCurrentPage] = useState<number>(0); 

    return ( 
        <div className="workersperattendance-root">
            <NavigationMapComponent elements={elements}/>
            <div className="workersperattendance-container">
                <h1>Успеваемость</h1>
                <div className="wokers-categories-navbar">
                    {workersCategories.map((group) => { 
                        return (
                            <div className="tasks-navbar-link">
                                <button
                                    onClick={() => setCurrentWorkersCategory(group)} 
                                    className={
                                        "tasks-navbar-choice " + 
                                        (group === currentWorkersCategory ? "current-link" : "")
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
                    {workers.map((worker) => {
                        return (
                            <div>
                                {worker.workType === currentWorkersCategory ? 
                                <li className="home-task-container">
                                    <NavLink to={`/user/${worker.id}`}>
                                        <div className="task-content">
                                            <div className="left-content">
                                                <img src={worker.avatar.fileUrl} alt={worker.avatar.fileName} className="project-icon"/>
                                                <div className="task-metadata">
                                                    <h4 className="task-title">{worker.name}</h4>
                                                </div>
                                            </div>
                                            <div className="right-content">
                                                <h4 className="task-project">Команда</h4>
                                                <img src={data.team.logo.fileUrl} alt="" className="avatar-owner-icon"/>
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

export default WorkersAttendancePage; 
