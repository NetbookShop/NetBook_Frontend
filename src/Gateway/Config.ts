// import { AUTH_KEY } from "./consts";

// export const Instance = new ApiClient()
// export const basePath = "http://localhost:8000"
// if (process.env.BACKEND_HOST === null || process.env.BACKEND_HOST === undefined) {
//     Instance.basePath = basePath
// } else { 
//     Instance.basePath = process.env.BACKEND_HOST
// }
// let OAuth2PasswordBearer = Instance.authentications['OAuth2PasswordBearer'];



import { Configuration } from "task-manager";
import { AuthKey, baseDownloadPath } from "./Consts";


export let ApiConfig = new Configuration();  

export function setToken(token: string, setCookie: any) { 
    setAccessTokenForClient(token)
    setCookie(AuthKey, token, {
        path: '/', 
    }); // Устанавливаем cookie с access_token
}

function setAccessTokenForClient(token: string) { 
    if (
        ApiConfig.accessToken === null ||
        ApiConfig.accessToken === undefined ||
        ApiConfig.accessToken !== token
    ) { 
        ApiConfig.accessToken = token 
    }
}

export function isAuthorized(cookies: any) { 
    const cookie = cookies.get(AuthKey); 
    if (cookie) { 
        setAccessTokenForClient(cookie)
        return true; 
    } else { 
        return false;
    }
}

export function asFileUrl(fileUrl: string) { 
    return baseDownloadPath + fileUrl
}
