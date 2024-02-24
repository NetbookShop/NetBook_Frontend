import './App.css';
import {useState} from 'react'; 
import { Route, Routes, useNavigate } from 'react-router-dom';
import HomePage from './Pages/Home/Home';
import UserPage from './Pages/User/User';
import NotFoundPage from './Pages/NotFound/NotFound';
import { useCookies } from 'react-cookie';
import authCheck from './Utils/AuthCheck';
import LoginPage from './Pages/Login/Login';
import ProjectPage from './Pages/Project/Project';
import ProjectCreatePage from './Pages/ProjectCreate/ProjectCreate';
import TeamPage from './Pages/Team/Team';
import RegisterPage from './Pages/Register/Register';
import WorkersPerformancePage from './Pages/WorkersPerformance/WorkersPerformance';
import ProjectEditPage from './Pages/ProjectEdit/ProjectEdit';
import ProjectsListPage from './Pages/ProjectsList/ProjectList';
import TaskPage from './Pages/Task/Task';
import SchedulePage from './Pages/Schedule/Schedule';
import TeamsListPage from './Pages/TeamList/TeamList';
import { AuthorizationCookieKey } from './Utils/Consts';
import NavbarComponent from './Components/Navbar/Navbar';
import { NavigationCategoryTypes } from './Utils/Types';

function App() {	
	const [cookies] = useCookies([AuthorizationCookieKey]);
	const navigate = useNavigate() 
	const [navigationCategory, setNavigationCategory] = useState<NavigationCategoryTypes>("work")

	const localAuthCheck = () => { 
		return authCheck(navigate, cookies)
	}

	const localRegisteredCheck = async () => { 
		if (cookies.Authorization) { 
			navigate("/")
		}
	}

	return (
		<div>
			<NavbarComponent navigationCategory={navigationCategory}/>
			<div className='content'>
				<Routes>
					<Route path="/login" element={<LoginPage setCategory={setNavigationCategory}/>} action={localRegisteredCheck}/>
					<Route path="/register" element={<RegisterPage  setCategory={setNavigationCategory}/>} action={localRegisteredCheck}/>
					<Route path="/" element={<HomePage  setCategory={setNavigationCategory}/>} action={localAuthCheck}/>
					<Route path="/user/:id" element={<UserPage  setCategory={setNavigationCategory}/>} action={localAuthCheck}/>
					<Route path="/project/:id" element={<ProjectPage setCategory={setNavigationCategory}/>} action={localAuthCheck}/> 
					<Route path='/project/:id/edit' element={<ProjectEditPage setCategory={setNavigationCategory}/>} action={localAuthCheck}/>
					<Route path="/project/create" element={<ProjectCreatePage setCategory={setNavigationCategory}/>} action={localAuthCheck}/>
					<Route path="/projects" element={<ProjectsListPage setCategory={setNavigationCategory}/>} action={localAuthCheck}/>
					<Route path="/teams" element={<TeamsListPage setCategory={setNavigationCategory}/>} action={localAuthCheck}/>
					<Route path="/team/:id" element={<TeamPage setCategory={setNavigationCategory}/>} action={localAuthCheck}/>
					<Route path='/task/:id' element={<TaskPage setCategory={setNavigationCategory}/>} action={localAuthCheck}/> 
					<Route path="/team/:id/performance" element={<WorkersPerformancePage setCategory={setNavigationCategory}/>} action={localAuthCheck}/>
					<Route path='/team/:id/time' element={<SchedulePage setCategory={setNavigationCategory}/>} action={localAuthCheck}/>
					<Route path="*" element={<NotFoundPage setCategory={setNavigationCategory}/>}/>
				</Routes>
			</div>
		</div>
	);
}

export default App;
