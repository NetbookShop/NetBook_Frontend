import { NavigateFunction } from 'react-router-dom';

type CookieType = {Authorization?: string}

const authCheck = async (navigate: NavigateFunction, cookies: CookieType) =>  {    
    if (!cookies.Authorization) { 
        return navigate("/login")
    } else { 
        return 
    }
}

export default authCheck;