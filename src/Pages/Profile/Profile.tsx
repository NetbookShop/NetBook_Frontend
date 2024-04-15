import { NavProps } from "../../Utils/Types";
import "./Profile.css"
import { Link } from "react-router-dom";
import { UserControllersApi, UserModel } from "restclient";
import { ApiConfig, asFileUrl } from "../../Gateway/Config";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import authCheck from "../../Utils/AuthCheck";
import { AuthKey } from "../../Gateway/Consts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { faUser } from "@fortawesome/free-solid-svg-icons";



const ProfilePage: React.FC<NavProps> = (props: NavProps) => { 
    const [user, setUser] = useState<UserModel>();
    const [auth, setAuth, deleteC] = useCookies([AuthKey])
    const deleteAuth = () => {

        deleteC(AuthKey)
    }
    const refreshPage = () => {
        window.location.reload();
    }
    useEffect(() => {(async () => {  
        
        const userApi = new UserControllersApi(ApiConfig)
        try {
            let response = await userApi.getMe()
            setUser(response.data)
        } catch (e) { 
            console.error()
        }
    })()}, [props.user])
    return (
            <div className="profile">
                <div className="profile_card">
                    <FontAwesomeIcon icon={faUser} className="profile_photo" />
                    <div className="profile_info">
                        <h1>{user?.fullName}</h1>
                        <h2>E-mail: {user?.email}</h2>
                        <Link onClick={refreshPage} to='/'><button onClick={(e) => deleteAuth()}>Выйти</button></Link>
                    </div>
                </div>
            </div>
    )
}

export default ProfilePage; 