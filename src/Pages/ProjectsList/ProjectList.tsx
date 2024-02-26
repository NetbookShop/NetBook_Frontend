import { NavProps } from "../../Utils/Types";

const ProjectsListPage: React.FC<NavProps> = (props: NavProps) => { 
    props.setCategory("projects")

    return ( 
        <div className="projectslist-root">
            
        </div>
    )
}

export default ProjectsListPage; 
