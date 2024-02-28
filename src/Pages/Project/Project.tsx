import NavigationMapComponent from "../../Components/NavigationMap/NavigationMap";
import { NavProps } from "../../Utils/Types";
import data from "../../TestData/Project.json"
import SearchComponent from "../../Components/Search/Search";

const ProjectPage: React.FC<NavProps> = (props: NavProps) => { 
    let project = data.project
    props.setCategory("projects")
    let elemMaps = new Map<string, string>()
    elemMaps.set("Проекты", "/projects")
    elemMaps.set(project.name, "/name")

    return (
        <div className="projectpage-root">
            <NavigationMapComponent elements={elemMaps}/>
                <h1>Доска проекта</h1>
            <div className="projectpage-navbar">
                <SearchComponent width={234} placeholder="Поиск по доске" />
            </div>
            <div className="project-board-container">

            </div>
        </div>
    )
}

export default ProjectPage; 
