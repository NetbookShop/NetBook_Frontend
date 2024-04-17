import React, { useState, useEffect } from "react";
import "./Cash.css"
import { NavProps } from "../../../Utils/Types";
import { Link } from "react-router-dom";
import { Product } from "restclient";
import { asFileUrl } from "../../../Gateway/Config";
import { useCookies } from "react-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-svg-core/styles.css";

const СashPage: React.FC<NavProps> = (props: NavProps) => {

  return (
    <div className="by_card">
        <h1>Ваш заказ обработан, ожидайте доставки</h1>
    </div>
  );
};

export default СashPage;

