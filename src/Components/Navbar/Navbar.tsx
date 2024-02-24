import { NavLink } from "react-router-dom";
import "./Navbar.css"
import React from "react";
import logo from "../../Static/karma-systemlogo.png"


const NavbarComponent: React.FC = () => { 
    
    return ( 
        <header className="navbar-root">
            <NavLink to="/" className="home-link">
                <img src={logo} alt="" />
            </NavLink>
        </header>
    )
}

export default NavbarComponent; 
