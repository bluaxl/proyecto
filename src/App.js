import './App.css';
import {Nav} from './components/nav/Nav';
import {Nav2} from './components/nav/Nav2';
import {Login, Register} from './components/login-form/PageLR';
import { Booking } from './components/booking/Booking';
import { Router, Route } from "react-router-dom";


function App() {
 
  return (
    <div>
      <Router>
        <Route path="/" element={<Nav/>}>
            <Route path="login" element={<Login/>} />
            <Route path="register" element={<Register/>} />
        </Route>
        {/* <Route path="/" element={<Nav2/>}>
            <Route path="reservation" element={<Booking/>} />
        </Route> */}
      </Router>
    </div>
  );
}

export default App;
