import './App.css';
import 'react-toastify/dist/ReactToastify.css'
import {useEffect, useState} from 'react'; 
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { AuthorizationCookieKey } from './Utils/Consts';
import { NavigationCategoryTypes } from './Utils/Types';
import { UserControllersApi, UserModel, Product } from 'restclient';
import { Link } from 'react-router-dom';
import NavbarComponent from './Components/Navbar/Navbar';
import LoginPage from './Pages/Login/Login';
import RegisterPage from './Pages/Register/Register';
import authCheck from './Utils/AuthCheck';
import HomePage from './Pages/Home/Home';
import CatalogPage from './Pages/Catalog/Catalog';
import AboutPage from './Pages/About-us/About';
import ArticlesPage from './Pages/Articles/Articles';
import ProfilePage from './Pages/Profile/Profile';
import ProductPage from './Pages/Product/Product';
import CartPage from './Pages/Cart/Cart';
import FooterComponent from './Components/Footer/Footer';
import { setAccessTokenForClient, removeToken, ApiConfig } from './Gateway/Config';
import { ToastContainer } from 'react-toastify';

function App() {	
	const [cart, setCart] = useState<Product[]>([]);
	const [cookies, setCookies, removeCookies] = useCookies([AuthorizationCookieKey]);
	const navigate = useNavigate() 
	const addToCart = (product: Product) => {
		setCart([...cart, product]);
	};
	const [navigationCategory, setNavigationCategory] = useState<NavigationCategoryTypes>("nochoice")
	const [currentUser, setCurrentUser] = useState<UserModel>(); 
	const location = useLocation()
	const localAuthCheck = () => { 
		return authCheck(navigate, cookies)
	};

	useEffect(() => { 
		setAccessTokenForClient(cookies.Authorization); 
		let userApi = new UserControllersApi(ApiConfig)
		userApi.getMe()
			.then((value) => {
				setCurrentUser(value.data)
				setAccessTokenForClient(cookies.Authorization)
			})
			.catch((error) => {
				if (error.response) { 
					if (error.response.status === 400) { 
						removeToken(removeCookies)
					} 	
				} 
			})
	}, [cookies.Authorization]) 

	return (
		<div className='wrapper'>
			<div className="content">
			<ToastContainer/>
			<NavbarComponent navigationCategory={navigationCategory} user={currentUser}/>
				<Routes>
					<Route path="/login" element={<LoginPage setCategory={setNavigationCategory} user={currentUser} />}/>
					<Route path="/register" element={<RegisterPage  setCategory={setNavigationCategory} user={currentUser}/>}/>
					<Route path="/" element={<HomePage  setCategory={setNavigationCategory} user={currentUser}/>} action={localAuthCheck}/>
					<Route path="/catalog" element={<CatalogPage  setCategory={setNavigationCategory} user={currentUser}/>} action={localAuthCheck}/>
					<Route path="/about_us" element={<AboutPage  setCategory={setNavigationCategory} user={currentUser}/>} action={localAuthCheck}/>
					<Route path="/articles" element={<ArticlesPage  setCategory={setNavigationCategory} user={currentUser}/>} action={localAuthCheck}/>
					<Route path="/profile" element={<ProfilePage  setCategory={setNavigationCategory} user={currentUser}/>} action={localAuthCheck}/>
					<Route path="/product" element={<ProductPage  setCategory={setNavigationCategory} user={currentUser} addToCart={addToCart}/>} action={localAuthCheck}/>
					<Route path="/product/:productId" element={<ProductPage  setCategory={setNavigationCategory} user={currentUser} addToCart={addToCart}/>} action={localAuthCheck}/>
					<Route path="/cart" element={<CartPage  setCategory={setNavigationCategory} user={currentUser} />} action={localAuthCheck}/>
			</Routes>
			</div>
			<FooterComponent user={currentUser}/>
		</div>
	);
}

export default App;
