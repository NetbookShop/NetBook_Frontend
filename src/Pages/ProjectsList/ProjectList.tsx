import { NavProps } from "../../Utils/Types";
import data from "../../TestData/ProjectList.json"
import NavigationMapComponent from "../../Components/NavigationMap/NavigationMap";
import SearchComponent from "../../Components/Search/Search";
import propertiesIcon from "../../Static/Images/propertiesIcon.svg"
import "./ProjectList.css"
import CreateTeamModalCall from "../../Modals/Team/CreateTeam";
import PaginationNavigation from "../../Components/Pagination/Pagination";
import { useState } from "react";

const ProjectsListPage: React.FC<NavProps> = (props: NavProps) => { 
    const projects = data.projects
    props.setCategory("projects")
    const elements = new Map<string, string>()
    elements.set("Проекты", "/projects")
    const [currentPage, setCurrentPage] = useState<number>(1)

    return ( 
        <div className="projectslist-root">
            <NavigationMapComponent elements={elements}/>
            <h1>Проекты</h1>
            <div className="projects-list-navbar">
                <SearchComponent width={234} placeholder="Введите название проекта"/>
                <div className="create-projects general-button">
                    <button className="create-project-button" onClick={() => CreateTeamModalCall()}>Создать команду</button>
                </div>
            </div>
            <div className="projects-list">
                <div className="projects-list-header">
                    <p>Имя</p>
                    <p>Время создания</p>
                    <p>Руководитель</p>
                    <p></p>
                </div>
                {projects.map((project) => {
                    return (
                        <div>
                            <li className="project-container">
                                <div className="project-content-list">
                                    <div className="left-content">
                                        <img src={project.projectIcon.fileUrl} alt="" className="project-icon"/>
                                        <div className="project-metadata">
                                            <h4 className="project-title">{project.name}</h4>
                                        </div>
                                    </div>
                                    <div className="center-content">
                                        <div className="created-at">{project.createdAt}</div>
                                    </div>
                                    <div className="owner">
                                        <img src={project.ownerIcon.fileUrl} alt="" className="avatar-icon" />
                                        <h4>{project.ownerName}</h4>
                                    </div>
                                    <div className="properties">
                                        <button className="properties-button"><img src={propertiesIcon} alt="" width={24} height={24}/></button>
                                    </div>
                                </div>
                            </li>
                        </div>
                    )
                })} 
            </div>
            <PaginationNavigation currentPage={currentPage} setCurrentPage={setCurrentPage} pageCounter={1}/>
        </div>
    )
}

export default ProjectsListPage; 
