import './App.css';
import {Nav} from './components/nav/Nav';
import {Nav2} from './components/nav/Nav2';
import {Login, Register} from './components/login-form/PageLR';
import { Booking } from './components/reservation/Booking';
import { Routes, Route } from "react-router-dom";
import { Appraise } from "./components/reservation/Appraise";
import { LegalAdvice } from './components/reservation/LegalAdvise';
import { Design } from './components/reservation/Design';
import { Documents } from './components/reservation/Documents';
import { Property } from './components/reservation/Property';
import { Home } from './components/home/Home';

function App() {
 
  return (
    <div>
      <Routes>
        <Route path="/" element={<Nav/>}>
            <Route path="login" element={<Login/>} />
            <Route path="register" element={<Register/>} />
            <Route path="" element={<Home/>}/>
        </Route>
        <Route path="/" element={<Nav2/>}>
            <Route path="reservation" element={<Booking/>} />
            <Route path="appraise" element={<Appraise/>} />
            <Route path="legal-advice" element={<LegalAdvice/>} />
            <Route path="design" element={<Design/>} />
            <Route path="documents" element={<Documents/>} />
            <Route path="search" element={<Property/>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
