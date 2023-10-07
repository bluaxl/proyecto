// Importación de estilos
import "../../../css/Client/login-form.css"
// Importación de componentes
import LoginForm from "./LoginForm"
import RegisterForm from "./RegisterForm"
import { Footer } from "../footer/footer.js"

// Componente de inicio de sesión
export function Login() {
    return (
        <> 
        <div className="form-container">
            <LoginForm />
        </div>
            <Footer />
        </>

    )
}

// Componente de registro
export function Register() {
    return (
        <>
        <div className="form-container">
            <RegisterForm />
        </div>
        <Footer />
        </>

    )
}
