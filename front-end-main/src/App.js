import './App.css';
import Nav2 from './components/nav/Nav2'
import LoginForm from './components/login-form/LoginForm'
import RegisterForm from './components/login-form/RegisterForm';

function App() {
 
  return (
    <div className="App" style={{ 
      backgroundImage: `url('/img/Fondo.png')`,
      backgroundRepeat: 'no-repeat',
      width:"100%",
      backgroundAttachment: 'fixed',
      backgroundSize: '100% 100%'
    }}>
      <Nav2 />
      <div className="form-container">
      <RegisterForm />
      </div>
    </div>
  );
}

export default App;
