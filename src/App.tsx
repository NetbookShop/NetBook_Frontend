import './App.css';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import HomePage from './Pages/Home/Home';
import UserPage from './Pages/User/User';
import NotFoundPage from './Pages/NotFound/NotFound';
import { useCookies } from 'react-cookie';
import authCheck from './Utils/AuthCheck';
import LoginPage from './Pages/Login/Login';

function App() {	
	const [cookies] = useCookies(['Authorization']);
	const navigate = useNavigate() 

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/login" element={<LoginPage />}/>
				<Route path="/" element={<HomePage />} action={() => authCheck(navigate, cookies)}/>
				<Route path="users/:id" element={<UserPage />} action={() => authCheck(navigate, cookies)}/>
				<Route path="*">
        			<NotFoundPage />
      			</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
