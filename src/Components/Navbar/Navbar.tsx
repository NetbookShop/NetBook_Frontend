import { NavLink } from "react-router-dom";
import "./Navbar.css"
import React from "react";
import logo from "../../Static/Images/karma-systemlogo.png"
import { NavigationCategoryTypes } from "../../Utils/Types";
import SearchComponent from "../Search/Search";
import NotificationComponent from "../Notification/Notification";
import ProfileComponent from "../Profile/Profile";

type props = { navigationCategory?: NavigationCategoryTypes }


const NavbarComponent: React.FC<props> = (props: props) => { 
    return (
        <div>
            { props.navigationCategory !== "none" ?  
            <header className="navbar-root">
                <div className="navbar-left-content">
                    <NavLink to="/" className="navbar-home-link logo-link">
                        <img src={logo} alt="something" className="logo" width={40} height={40}/>
                    </NavLink>
                    <NavLink to="/" className={"navbar-projects-link " + (props.navigationCategory === "work" ? "current-link" : "")}>
                        <p className="projects-link">Моя работа</p>
                    </NavLink>
                    <NavLink to="/projects" className={"navbar-projects-link " + (props.navigationCategory === "projects" ? "current-link" : "")}>
                        <p className="projects-link">Проекты</p>
                    </NavLink>
                    <NavLink to="/teams" className={"navbar-projects-link " + (props.navigationCategory === "teams" ? "current-link" : "")}>
                        <p className="projects-link">Команды</p>
                    </NavLink>
                </div>
                <div className="navbar-right-content">
                    <SearchComponent width={260}/>
                    <NotificationComponent />
                    <ProfileComponent userId="1234567" avatarUrl="static/fuckyou"/>
                </div>
            </header>
            : null } 
        </div>
    )
}

export default NavbarComponent; 
