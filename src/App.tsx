import React, { useEffect } from 'react';
import UserType from './components/UserType/UserType';
import { Routes, Route, useNavigate } from 'react-router-dom';
import NotFound from './components/NotFound/NotFound';
import Registration from './components/Registration/Registration';
import Authorization from './components/Authorization/Authorization';
import HotelSetup from './components/HotelSettings/HotelSetup';
import { useAuth } from './contexts/AuthContext';
import './App.css';
import Home from './components/Home/Home';
import RoomTypesSetup from './components/RoomTypesSetup/RoomTypesSetup';
import RoomsAssignment from './components/RoomsAssignment/RoomsAssignment';


function App() {
  // const { currentUser } = useAuth();
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (currentUser === null) {
  //     navigate('/login');
  //   }else {
  //     navigate('/home');
  //   }
  // }, [])

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<UserType />} />
        <Route path='/signup' element={<Registration />} />
        <Route path='/login' element={<Authorization />} />
        <Route path='/setup' element={<HotelSetup />} />
        <Route path='/roomsetup' element={<RoomTypesSetup />} />
        <Route path='/roomsassignment' element={<RoomsAssignment />} />
        <Route path='/home' element={<Home />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
