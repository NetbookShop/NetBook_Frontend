import { NavProps } from "../../Utils/Types";
import "./NotFound.css"

import { NavLink } from "react-router-dom"

const NotFoundPage: React.FC<NavProps> = (props: NavProps) => { 
    props.setCategory("none")
    return ( 
        <div className="notfound-root">
            <h1>404</h1>
            <p className="notfound-text">Мы не нашли страницу которую вы искали</p>
            <p className="notfound-text-2">Вы можете посетить <NavLink to='/' className="home-link">Главная страницу</NavLink></p>
        </div>
    )
}

export default NotFoundPage; 
