import { NavProps } from "../../Utils/Types";

const TeamsListPage: React.FC<NavProps> = (props: NavProps) => { 
    props.setCategory("teams")

    return (
        <div className="teamslist-root">

        </div>
    )
}

export default TeamsListPage; 
