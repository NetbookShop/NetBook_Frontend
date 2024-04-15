import { NavLink } from "react-router-dom";
import "./Footer.css"
import React from "react";
import { NavigationCategoryTypes } from "../../Utils/Types";
import { UserModel } from "restclient";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-svg-core/styles.css";

type props = { navigationCategory?: NavigationCategoryTypes, user: UserModel | undefined | null }


const FooterComponent: React.FC<props> = (props: props) => { 
    return (
        <footer className='footer'>
          <div className='contact_info'>
            <h2>Контактная информация:</h2>
            <h4>Адрес: Туран 10</h4> <br />
            <h4>Номер телефона: +7 (777) 777-77-77</h4>
          </div>
          <div className='schedule'>
            <h2>График работы:</h2>
            <h4>Ежедневно 9:00 - 21:00</h4>
          </div>
        </footer>
    )
}

export default FooterComponent; 
