// Importación de estilos
import "../../../css/Client/login-form.css"
// Importación de componentes
import LoginForm from "./LoginForm"
import RegisterForm from "./RegisterForm"

// Componente de inicio de sesión
export function Login(){
    return (
        <div className="form-container">
            <LoginForm/>
        </div>
    )
}

// Componente de registro
export function Register(){
    return (
        <div className="form-container">
            <RegisterForm/>
        </div>
    )
}
