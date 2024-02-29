import { NavProps } from "../../Utils/Types";
import data from "../../TestData/User.json"

const UserPage: React.FC<NavProps> = (props: NavProps) => { 
    props.setCategory("teams")

    return (
        <div className="user-root">
            <div className="user-banner">
                <img src={data.banner.fileUrl} alt="banner" width={"100%"} height={"200px"}/>
            </div>
        </div>
    )
}

export default UserPage; 
