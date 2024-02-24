import { NavLink } from "react-router-dom";
import "./Navbar.css"
import React from "react";
import logo from "../../Static/Images/karma-systemlogo.png"


const NavbarComponent: React.FC = () => { 
    
    return ( 
        <header className="navbar-root">
            <div className="navbar-left-content">
                <NavLink to="/" className="navbar-home-link">
                    <img src={logo} alt="something" className="logo"/>
                </NavLink>
                <NavLink to="/projects" className="navbar-projects-link">
                    <p className="projects-link">Сотрудники</p>
                </NavLink>
            </div>
        </header>
    )
}

export default NavbarComponent; 
