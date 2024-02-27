import NavigationMapComponent from "../../Components/NavigationMap/NavigationMap";
import { NavProps } from "../../Utils/Types";
import data from "../../TestData/Project.json"

const ProjectPage: React.FC<NavProps> = (props: NavProps) => { 
    let project = data.project
    props.setCategory("projects")
    let elemMaps = new Map<string, string>()
    elemMaps.set("Проекты", "/projects")
    elemMaps.set(project.name, "/")

    return (
        <div className="projectpage-root">
            <NavigationMapComponent elements={elemMaps}/>
        </div>
    )
}

export default ProjectPage; 
