import { NavProps } from "../../Utils/Types";
import NavigationMapComponent from "../../Components/NavigationMap/NavigationMap";
import SearchComponent from "../../Components/Search/Search";
import propertiesIcon from "../../Static/Images/propertiesIcon.svg"
import "./ProjectList.css"
import PaginationNavigation from "../../Components/Pagination/Pagination";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Project, ProjectControllersApi } from "task-manager";
import { ApiConfig, asFileUrl } from "../../Gateway/Config";

const ProjectsListPage: React.FC<NavProps> = (props: NavProps) => { 
    props.setCategory("projects")
    const elements = new Map<string, string>()
    elements.set("Проекты", "/projects")
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [selectedProjectProperties, setSelectedProjectProperties] = useState<string>()
    const [projects, setProjects] = useState<Array<Project>>([])
    const navigate = useNavigate()
    const showProjectControls = (id: string) => { 
        setSelectedProjectProperties(id)
    }
    useEffect(() => {        
        const projectApi = new ProjectControllersApi(ApiConfig)
        const getData = async () => { 
            try { 
                let response = await projectApi.getProjectsList() 
                setProjects(response.data)
            } catch (e) { 
                console.error(e)
            }
        }

        getData()
    }, [props.user])

    return ( 
        <div className="projectslist-root">
            <NavigationMapComponent elements={elements}/>
            <h1>Проекты</h1>
            <div className="projects-list-navbar">
                <SearchComponent width={234} placeholder="Введите название проекта"/>
                <div className="create-projects general-button">
                    <button className="create-project-button" onClick={() => navigate("/project/create")}>Создать команду</button>
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
                                        <img src={asFileUrl(project.icon?.id)} alt="" className="project-icon"/>
                                        <div className="project-metadata">
                                            <h4 className="project-title"><NavLink to={"/project/" + project.id} className={"project-link"}>{project.name}</NavLink></h4>
                                        </div>
                                    </div>
                                    <div className="center-content">
                                        <div className="created-at">{project.createdAt?.toString()}</div>
                                    </div>
                                    <div className="owner">
                                        <img src={asFileUrl(project.createdBy?.avatar?.id)} alt="" className="avatar-icon" />
                                        <h4>{project.createdBy?.fullName}</h4>
                                    </div>
                                    <div className="properties">
                                        <button
                                            className="properties-button" 
                                            // onClick={() => showProjectControls(project.id)} 
                                            onClick={() => navigate(`/project/${project.id}/edit`)}
                                        >
                                            <img src={propertiesIcon} alt="" width={24} height={24}/>
                                        </button>
                                        {selectedProjectProperties !== undefined ?
                                            <div className="properties-list" onClick={() => setSelectedProjectProperties(undefined)}>
                                                <div
                                                    className="properties-button" 
                                                    onClick={() => navigate(`/project/${project.id}/edit`)}
                                                >
                                                    Настройки проекта
                                                </div>
                                                {/* <div
                                                    className="properties-button"
                                                    onClick={() => deleteProject(project.id)}
                                                >
                                                    Переместить в корзину
                                                </div> */}
                                            </div> 
                                        : null }
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
