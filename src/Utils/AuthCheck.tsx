import { NavigateFunction, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

type CookieType = {Authorization?: string}

const authCheck = async (navigate: NavigateFunction, cookies: CookieType) =>  {    
    if (!cookies.Authorization) { 
        return navigate("/")
    } else { 
        return 
    }
}

export default authCheck;