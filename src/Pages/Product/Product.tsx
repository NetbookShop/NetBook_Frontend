import { NavProps } from "../../Utils/Types";
import "./Product.css"
import { ApiConfig, asFileUrl } from "../../Gateway/Config";
import { Product, ProductApi } from 'restclient'
import { useState } from "react";
import { useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import { useParams } from "react-router-dom"; 
import { useCookies } from "react-cookie";

interface ProductPageProps extends NavProps {
    addToCart: (product: Product) => void; // Принимаем функцию addToCart как проп
}

const ProductPage: React.FC<ProductPageProps> = (props: ProductPageProps) => { 
    const { productId } = useParams(); // Получаем идентификатор товара из URL
    const [Product, SetProduct] = useState<Product>();
    const [cookies] = useCookies(["cart"]);
  
    useEffect(() => {        
      const productApi = new ProductApi(ApiConfig)
      const getData = async () => { 
          try { 
            if (productId) {
                let response = await productApi.getproduct(productId);
                SetProduct(response.data);
            } else {
                console.error("ProductId is undefined");
            }
          } catch (e) { 
              console.error(e)
          }
      }
  
      getData()
    }, [props.user, productId])

    const addToCart = () => {
        if (Product) {
          document.cookie = `cart=${JSON.stringify([...(cookies.cart || []), Product])}`;
        }
    };

    return (
        <div className="product_main">
            <div className="product__card">
                <div className="product_content">
                    <aside>
                        <section>
                            <Carousel className="product_photos">
                                <div>
                                {Product !== undefined && (
                                    <img src={asFileUrl(Product.photo?.id)} />
                                )}
                                </div>
                                <div>
                                {Product !== undefined && (
                                    <img src={asFileUrl(Product.photo?.id)} />
                                )}
                                </div>
                                <div>
                                {Product !== undefined && (
                                    <img src={asFileUrl(Product.photo?.id)} />
                                )}
                                </div>
                            </Carousel>
                        </section>
                    </aside>
                    <article>
                        <div className="product_info">
                            <h1>{Product?.name}</h1>
                            {Product !== undefined && (
                            <h2>{Product.price} ₸</h2>
                            )}

                            <button onClick={addToCart}>В корзину</button>
                            <button>Купить</button>
                        </div>
                    </article> 
                </div>
                <div className="product_detail">
                    <h2>Характеристики</h2>
                    <h3>Процессор - {Product?.processor}</h3>
                    <hr />
                    <h3>Видеокарта - {Product?.gpu}</h3>
                    <hr />
                    <h3>ОЗУ - {Product?.ramCapacity} ГБ</h3>
                    <hr />
                    <h3>Дисплей - {Product?.displayType}, {Product?.displayResolution}, {Product?.displayDiagonal}, {Product?.refreshRate} ГЦ</h3>
                    <hr />
                    <h3>Объем SSD - {Product?.ssdCapacity} ГБ</h3>
                    <hr />
                    <h3>Операционная система - {Product?.operatingSystem}</h3>
                </div>
            </div>
        </div>
    )
}

export default ProductPage; 