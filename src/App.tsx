import './App.css';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
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

function App() {	
	const [cookies] = useCookies([AuthorizationCookieKey]);
	const navigate = useNavigate() 

	const localAuthCheck = () => { 
		return authCheck(navigate, cookies)
	}

	return (
		<Routes>
			<Route path="/login" element={<LoginPage />}/>
			<Route path="/register" element={<RegisterPage />} action={localAuthCheck}/>
			<Route path="/" element={<HomePage />} action={localAuthCheck}/>
			<Route path="/user/:id" element={<UserPage />} action={localAuthCheck}/>
			<Route path="/project/:id" element={<ProjectPage />} action={localAuthCheck}/> 
			<Route path='/project/:id/edit' element={<ProjectEditPage />} action={localAuthCheck}/>
			<Route path="/project/create" element={<ProjectCreatePage />} action={localAuthCheck}/>
			<Route path="/projects" element={<ProjectsListPage />} action={localAuthCheck}/>
			<Route path="/teams" element={<TeamsListPage />} action={localAuthCheck}/>
			<Route path="/team/:id" element={<TeamPage />} action={localAuthCheck}/>
			<Route path='/task/:id' element={<TaskPage />} action={localAuthCheck}/> 
			<Route path="/team/:id/performance" element={<WorkersPerformancePage />} action={localAuthCheck}/>
			<Route path='/team/:id/time' element={<SchedulePage />} action={localAuthCheck}/>
			<Route path="*" element={<NotFoundPage/>}/>
		</Routes>
	);
}

export default App;
