import './App.css';
import {Nav} from './components/client/nav/Nav';
import {Nav2} from './components/client/nav/Nav2';
import {Login, Register} from './components/client/login-form/PageLR';
import { Booking } from './components/client/reservation/Booking';
import { Routes, Route } from "react-router-dom";
import { Appraise } from "./components/client/reservation/Appraise";
import { LegalAdvice } from './components/client/reservation/LegalAdvise';
import { Design } from './components/client/reservation/Design';
import { Documents } from './components/client/reservation/Documents';
import { Property } from './components/client/reservation/Property';
import { Home } from './components/client/home/Home';
import { DashboardAdmin } from './components/admin/dashboard/Dashboard';
import { DashboardAdvisory } from './components/advisor/dashboard/Dashboard'
import { Profile } from './components/client/profile/Profile';
import {ProtectedRoute ,ProtectedRoute2} from './auth/ProtectedRoute';

function App() {
 
  return (
    <div>
      <Routes>
        <Route path="/" element={<Nav/>}>
            <Route path="login" element={<Login/>} />
            <Route path="register" element={<Register/>} />
            <Route path="" element={<Home/>}/>
            <Route path="profile" element={<Profile/>}/>
        </Route>
        <Route path="/" element={<Nav2/>}>
            <Route path="reservation" element={<Booking/>} />
            <Route path="appraise" element={<Appraise/>} />
            <Route path="legal-advice" element={<LegalAdvice/>} />
            <Route path="design" element={<Design/>} />
            <Route path="documents" element={<Documents/>} />
            <Route path="search" element={<Property/>} />
        </Route>
        <Route path="/admin" element={<ProtectedRoute><DashboardAdmin/></ProtectedRoute>} >
            <Route path="admin/state"/>
        </Route>
        <Route path="advisory" element={<ProtectedRoute2><DashboardAdvisory/></ProtectedRoute2>}>
            <Route path="admin/state"/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
