import { NavProps } from "../../Utils/Types";

const TaskPage: React.FC<NavProps> = (props: NavProps) => { 
    props.setCategory("projects")

    return ( 
        <div className="task-root">

        </div>
    )
}

export default TaskPage; 
