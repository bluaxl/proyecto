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
import { CrudState } from './components/admin/state/CrudState';
import { CrudProyects } from './components/admin/proyects/CrudProyects';
import { NewState } from './components/admin/state/NewState';
import { NewProyect } from './components/admin/proyects/NewProyect';
import { CrudUsers } from "./components/admin/users/CrudUsers";
import { UserProfile } from './components/admin/users/UserProfile';
import { ProfileAdvisory } from './components/advisor/users/ProfileAdvisory';
import { CrudStates } from './components/advisor/state/CrudState';
import { NewStates } from './components/advisor/state/NewStates';
import { UploadProyect } from './components/admin/proyects/UploadProyect';
import { ViewState } from './components/admin/state/ViewState';
import { CrudReservation } from './components/advisor/reservation/CrudReservation';
import { NotificationReservation } from './components/advisor/reservation/NotificationReservation';
import { SolicitudReservation } from './components/advisor/reservation/SolicitudReservation';
import { CalendarReservation } from './components/advisor/reservation/CalendarReservation';
import { AccesDenied } from './components/client/other/AccesDenied';

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
            <Route path="propierty-list" element={<CrudState/>}/>
            <Route path="publish-new-propierty" element={<NewState/>}/>
            <Route path="create-proyect" element={<NewProyect/>}/>
            <Route path="proyects-list" element={<CrudProyects/>}/>
            <Route path="users-list" element={<CrudUsers/>}/>
            <Route path="user-profile" element={<UserProfile/>}/>
            <Route path="publish-proyect" element={<UploadProyect/>}/>
            <Route path="view-state" element={<ViewState/>}/>
        </Route>
        <Route path="advisory" element={<ProtectedRoute2><DashboardAdvisory/></ProtectedRoute2>}>
            <Route path=""/>
            <Route path="user-profile" element={<ProfileAdvisory/>}/>
            <Route path="propierty-list" element={<CrudStates/>}/>
            <Route path="publish-new-propierty" element={<NewStates/>}/>
            <Route path="requests-reserves" element={<CrudReservation/>}/> 
            <Route path="request" element={<SolicitudReservation/>}/> 
            <Route path="create-menssage" element={<NotificationReservation/>}/> 
            <Route path="show-reserves" element={<CalendarReservation/>}/> 
        </Route>

        <Route path="access-denied" element={<AccesDenied/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
