import { NavProps } from "../../Utils/Types";
import "./Product.css"
import { ApiConfig, asFileUrl } from "../../Gateway/Config";
import { Product, ProductApi, Comment, CommentApi, CreateCommentScheme } from 'restclient'
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
    const [comments, setComments] = useState<Comment[]>([]);
    const [cookies] = useCookies(["cart"]);
    const [newComment, setNewComment] = useState<CreateCommentScheme>({ text: "", productId: productId || "" });
  
    useEffect(() => {        
      const productApi = new ProductApi(ApiConfig)
      const commentApi = new CommentApi(ApiConfig);
      const getData = async () => { 
          try { 
            if (productId) {
                let response = await productApi.getproduct(productId);
                SetProduct(response.data);
                let commentResponse = await commentApi.getComments(productId);
                setComments(commentResponse.data);
      
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

      // Функция для отправки нового отзыва
    const submitComment = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const commentData: CreateCommentScheme = {
                text: newComment.text,
                productId: productId || "" // Передаем идентификатор продукта
            };
            const commentApi = new CommentApi(ApiConfig);
            const response = await commentApi.createComment(commentData);
            
            if (response.data) {
                // Обновление списка отзывов
                setComments([...comments, response.data]);
                alert("Отзыв успешно добавлен!");
            } else {
                alert("Ошибка при добавлении отзыва!");
            }
        } catch (error) {
            console.error("Ошибка:", error);
        }
    };

    const deleteComment = async (productId: string, commentId: string) => {
        try {
            const commentApi = new CommentApi(ApiConfig);
            const response = await commentApi.deleteComment(commentId);
            if (response.data) {
                // Обновить список отзывов
                setComments(comments.filter(comment => comment.id !== commentId));
                alert("Отзыв успешно удален!");
            } else {
                alert("Ошибка при удалении отзыва!");
            }
        } catch (error) {
            console.error("Ошибка:", error);
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setNewComment({ ...newComment, [name]: value });
    };


    return (
        <div className="product_very_main">
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
            <div className="reviews">
                <form onSubmit={submitComment}>
                    <textarea name="text" placeholder="Ваш отзыв" value={newComment.text} onChange={handleInputChange} />
                    <button type="submit">Отправить отзыв</button>
                </form>
                <div className="product_reviews">
                    <h1>Отзывы</h1>
                    {comments.map((comment: Comment) => (
                        <div key={comment.id}>
                            <p>{comment.content}</p>
                            <p>{comment.createdAt ? new Date(comment.createdAt).toLocaleString() : ""}</p>
                            <button onClick={() => comment.id && deleteComment(productId || "", comment.id)}>Удалить отзыв</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ProductPage; 