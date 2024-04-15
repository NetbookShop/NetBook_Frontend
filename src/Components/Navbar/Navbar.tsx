import { NavLink } from "react-router-dom";
import "./Navbar.css"
import React from "react";
import { NavigationCategoryTypes } from "../../Utils/Types";
import { UserControllersApi, UserModel } from "restclient";
import { ApiConfig, asFileUrl } from "../../Gateway/Config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-svg-core/styles.css";
import {
  faCartShopping
} from "@fortawesome/free-solid-svg-icons";
import {
  faUser
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

type props = { navigationCategory?: NavigationCategoryTypes, user: UserModel | undefined | null }


const NavbarComponent: React.FC<props> = (props: props) => { 
  const [user, setUser] = useState<UserModel>();
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
        <header className="header">
          <div className="header_logo">
            <NavLink to="/"><h1>NetBook Shop</h1></NavLink>
          </div>
          <div className="header_list">
            <NavLink to="/">Главная</NavLink>
            <NavLink to="/catalog">Каталог</NavLink>
            <NavLink to="/about_us">О нас</NavLink>
            <NavLink to="/articles">Статьи</NavLink>
            <NavLink to="/cart"><FontAwesomeIcon icon={faCartShopping} /></NavLink>
            <NavLink to="/login"><FontAwesomeIcon icon={faUser} /></NavLink>
            <NavLink to="/profile">{user?.fullName}</NavLink>
          </div>
        </header>
    )
}

export default NavbarComponent; 
