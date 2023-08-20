import "../../css/login-form.css"
import LoginForm from "./LoginForm"
import RegisterForm from "./RegisterForm"

export function Login(){
    return (
    <div className="form-container">
        <LoginForm/>
    </div>
    )
}

export function Register(){
    return (
    <div className="form-container">
        <RegisterForm/>
    </div>
    )
}