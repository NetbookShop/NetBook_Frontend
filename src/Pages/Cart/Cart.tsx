import React, { useState, useEffect } from "react";
import "./Cart.css"
import { NavProps } from "../../Utils/Types";
import { Link } from "react-router-dom";
import { Product } from "restclient";
import { asFileUrl } from "../../Gateway/Config";
import { useCookies } from "react-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-svg-core/styles.css";

const CartPage: React.FC<NavProps> = (props: NavProps) => {
  const [cart, setCart] = useState<Product[]>([]);
  const [cookies] = useCookies(["cart"]);

  useEffect(() => {
    // Загрузка данных корзины при монтировании компонента
    // Пример загрузки корзины из cookies
    const savedCart = cookies["cart"];
    if (savedCart) {
      setCart(savedCart);
    }
  }, [cookies]);

  useEffect(() => {
    // Сохранение данных корзины при изменении
    // Пример сохранения корзины в cookies
    document.cookie = `cart=${JSON.stringify(cart)}`;
  }, [cart]);

  // Функция для удаления товара из корзины
  const removeFromCart = (productId: string | undefined) => {
    if (productId !== undefined) {
      setCart(cart.filter((product) => product.id !== productId));
    }
  };
  

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  // Функция для расчета общей стоимости товаров в корзине
  const calculateTotal = () => {
    return cart.reduce((total, product) => total + (product.price || 0), 0);
  };

  return (
    <div className="cart">
        <div className="cart_card">
            <h1>Корзина</h1>
        {cart.length === 0 ? (
            <p>Ваша корзина пуста.</p>
        ) : (
            <>
            {cart.map((product) => (
                <div className="product_cards_cart">
                    <div key={product.id} className="product_card_cart">
                        <Link to={`/product/${product.id}`}>
                            <div className="product_card_img">
                            <img src={asFileUrl(product.photo?.id) || ""} alt="" />
                            </div>
                        </Link>
                        <Link to={`/product/${product.id}`}>
                            <h2>{product.name}</h2>
                        </Link>
                        <div className="product_card_items">
                            <div className="price_cart">
                            <p>{product.price || 0} ₸</p>
                            <button onClick={() => removeFromCart(product.id)}>
                                Удалить
                            </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            <p className="itogo">Итого: {calculateTotal()} ₸</p>
            </>
        )}
        </div>
    </div>
  );
};

export default CartPage;
