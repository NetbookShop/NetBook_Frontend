import { NavProps } from "../../Utils/Types";
import data from "../../TestData/User.json"
import "./User.css"

const UserPage: React.FC<NavProps> = (props: NavProps) => { 
    props.setCategory("teams")

    return (
        <div className="user-root">
            <div className="user-banner">
                <img src={data.banner.fileUrl} alt="banner" width={"100%"} height={"200px"}/>
            </div>
            <div className="user-container">
                <div className="user-left-navbar-main">
                    <div className="user-avatar">
                        <img src={data.avatar.fileUrl} alt="" className="user-avatar-icon" width={"160px"} height={"160px"}/>
                    </div>
                    <div className="user-left-navbar-info">
                        <h1 className="">

                        </h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserPage; 
