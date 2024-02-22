import { useState } from "react"

const LoginPage: React.FC = () => { 
    const [username, setUsername] = useState<string>()
    const [email, setEmail] = useState<string>()
    const [password, setPassword] = useState<string>()
    const [repeatPassword, setRepeatPassword] = useState<string>()

    const SetPassword = (e: Event) => { 
        e.preventDefault() 
        
    }
    
    return (
        <div className="login-root">
            <input></input>
        </div>
    )
}

export default LoginPage; 