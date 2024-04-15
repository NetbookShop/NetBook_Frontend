import { NavProps } from "../../Utils/Types";
import "./Home.css"
import { Link } from "react-router-dom";
import ad1 from '../../Static/Images/asus-ad.png'
import office from '../../Static/Images/office-category.png'
import gaming from '../../Static/Images/gaming-category.png'
import ultra from '../../Static/Images/ultrabook-category.png'
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';


const HomePage: React.FC<NavProps> = (props: NavProps) => { 
    return (
    <div className="main_page">
    <Carousel>
      <div>
          <img src={ad1} />
      </div>
      <div>
          <img src={ad1} />
      </div>
      <div>
          <img src={ad1} />
      </div>
      </Carousel>
      <div className="categories">
        <h1>Категории</h1>
        <div className="categories_cards">
          <div className="categories_card">
            <Link to="gaming_laptops">
              <div className="card_img">
                <img src={gaming} alt="" />
              </div>
            </Link>
            <Link to="gaming-laptops"><h2>Игровые</h2></Link>
            <div className="card_items">
              <Link to="#"><h4>Asus ROG</h4></Link>
              <Link to="#"><h4>Asus TUF</h4></Link>
              <Link to="#"><h4>Lenovo Legion</h4></Link>
              <Link to="#"><h4>Acer Nitro</h4></Link>
            </div>
          </div>
          <div className="categories_card">
            <Link to="gaming_laptops">
              <div className="card_img">
                <img src={office} alt="" />
              </div>
            </Link>
            <Link to="gaming-laptops"><h2>Офисные</h2></Link>
            <div className="card_items">
              <Link to="#"><h4>HP</h4></Link>
              <Link to="#"><h4>Asus VivoBook</h4></Link>
              <Link to="#"><h4>Lenovo</h4></Link>
              <Link to="#"><h4>Acer Aspire</h4></Link>
            </div>
          </div>
          <div className="categories_card">
            <Link to="gaming_laptops">
              <div className="card_img">
                <img src={ultra} alt="" />
              </div>
            </Link>
            <Link to="gaming-laptops"><h2>Ульрабуки</h2></Link>
            <div className="card_items">
              <Link to="#"><h4>Asus ZenBook</h4></Link>
              <Link to="#"><h4>MacBook</h4></Link>
              <Link to="#"><h4>Lenovo ThinkPad</h4></Link>
            </div>
          </div>
        </div>
      </div>
      <div className="why_us">
        <h1>Почему именно мы?</h1>
        <p>Мы предлагаем широкий ассортимент ноутбуков от лучших производителей, <br /> 
          гарантируя высокое качество и надежность каждой модели. Наши профессиональные <br />
          консультанты помогут вам сделать правильный выбор, а удобный процесс покупки обеспечит 
          приятный опыт. <br />
          Покупайте у нас и получайте уверенность в своем выборе.</p>
      </div>
    </div>
    )
}

export default HomePage; 