import React, { useState, useEffect } from "react";
import "./Bycash.css"
import { NavProps } from "../../../Utils/Types";
import { Link } from "react-router-dom";
import { Product } from "restclient";
import { asFileUrl } from "../../../Gateway/Config";
import { useCookies } from "react-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-svg-core/styles.css";

interface ModalProps {
    onClose: () => void;
  }
  
  const Modal: React.FC<ModalProps> = ({ onClose }) => {
    return (
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={onClose}>&times;</span>
          <p>Ваш заказ одобрен</p>
        </div>
      </div>
    );
  };

const BycashPage: React.FC<NavProps> = (props: NavProps) => {

    const [showModal, setShowModal] = useState<boolean>(false);

    const openModal = () => {
        setShowModal(true);
      };
    
    const closeModal = () => {
        setShowModal(false);
    };

  return (
    <div className="by_card">
        <div className="by_card_container">
            <h2>Информация о доставке</h2>
            <form>
                <div className="form-group">
                    <label>Имя получателя</label>
                    <input type="text" id="card-number" name="card-number" placeholder="Напишите свое имя" required />
                </div>
                <div className="form-group">
                    <label>Адрес доставки</label>
                    <input type="text" id="card-holder" name="card-holder" placeholder="Напишите адрес доставки" required />
                </div>
                <div className="form-group">
                    <label>Номер телефона</label>
                    <input type="text" id="expiry-date" name="expiry-date" placeholder="Напишите номер телефона" required />
                </div>
                <h2>Оформить</h2>
                <Link to='/by_card'><button className="submit_button">Картой</button></Link>
                <button className="submit_button" onClick={openModal}>Наличными</button>
                {showModal && <Modal onClose={closeModal} />}
            </form>
        </div>
    </div>
    
  );
};

export default BycashPage;

