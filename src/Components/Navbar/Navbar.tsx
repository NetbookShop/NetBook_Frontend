import { NavLink } from "react-router-dom";
import "./Navbar.css"
import React from "react";
import logo from "../../Static/Images/karma-systemlogo.png"
import { NavigationCategoryTypes } from "../../Utils/Types";

type props = { navigationCategory?: NavigationCategoryTypes }


const NavbarComponent: React.FC<props> = (props: props) => { 
    return (
        <div>
            { props.navigationCategory != "none" ?  
            <header className="navbar-root">
                <div className="navbar-left-content">
                    <NavLink to="/" className={"navbar-home-link"}>
                        <img src={logo} alt="something" className="logo"/>
                    </NavLink>
                    <NavLink to="/projects" className={"navbar-projects-link " + (props.navigationCategory == "projects" ? "current-link" : "")}>
                        <p className="projects-link">Проекты</p>
                    </NavLink>
                    <NavLink to="/" className={"navbar-projects-link " + (props.navigationCategory == "work" ? "current-link" : "")}>
                        <p className="projects-link">Моя работа</p>
                    </NavLink>
                    <NavLink to="/teams" className={"navbar-projects-link " + (props.navigationCategory == "teams" ? "current-link" : "")}>
                        <p className="projects-link">Команды</p>
                    </NavLink>
                </div>
            </header>
            : null } 
        </div>
    )
}

export default NavbarComponent; 
