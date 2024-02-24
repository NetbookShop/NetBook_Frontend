import React from "react";
import { NavProps } from "../../Utils/Types";


const ProjectEditPage: React.FC<NavProps> = (props: NavProps) => { 
    props.setCategory("projects")

    return ( 
        <div className="projectedit-root">
            
        </div>
    )
}

export default ProjectEditPage; 
