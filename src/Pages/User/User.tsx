import { NavProps } from "../../Utils/Types";

const UserPage: React.FC<NavProps> = (props: NavProps) => { 
    props.setCategory("teams")

    return (
        <div className="user-root">
            
        </div>
    )
}

export default UserPage; 
