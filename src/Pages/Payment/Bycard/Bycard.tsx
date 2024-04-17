import React, { useState, useEffect } from "react";
import "./Bycard.css"
import { NavProps } from "../../../Utils/Types";
import { Link } from "react-router-dom";
import { Product } from "restclient";
import { asFileUrl } from "../../../Gateway/Config";
import { useCookies } from "react-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-svg-core/styles.css";

const BycardPage: React.FC<NavProps> = (props: NavProps) => {

  return (
    <div className="by_card">
        <div className="by_card_container">
            <h2>Bank Card Information</h2>
            <form action="#" method="post">
                <div className="form-group">
                    <label>Card Number</label>
                    <input type="text" id="card-number" name="card-number" placeholder="Enter your card number" required />
                </div>
                <div className="form-group">
                    <label>Card Holder</label>
                    <input type="text" id="card-holder" name="card-holder" placeholder="Enter the name on the card" required />
                </div>
                <div className="form-group">
                    <label>Expiry Date</label>
                    <input type="text" id="expiry-date" name="expiry-date" placeholder="MM/YYYY" required />
                </div>
                <div className="form-group">
                    <label>CVV</label>
                    <input type="text" id="cvv" name="cvv" placeholder="Enter CVV" required />
                </div>
                <button className="submit_button">Подтвердить</button>
            </form>
        </div>
    </div>
  );
};

export default BycardPage;
