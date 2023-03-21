import React, { useEffect, useState } from 'react';
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
import NavBar from './components/NavBar/NavBar';
import Reservation from './components/Reservation/Reservation';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from './firebase';
import { useAppDispatch } from './hooks';
import { setHotelData } from './store/hotelReducer';
import { Container, Spinner } from 'react-bootstrap';


function App() {
  const { currentUser } = useAuth();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const hotelsRef = collection(db, 'hotels');
  
  useEffect(() => {
    if (currentUser) {
      setLoading(true);
      const q = query(hotelsRef, where('owner', '==', currentUser.email));
      
      getDocs(q).then(snapshot => {
        snapshot.forEach(doc => {
          dispatch(setHotelData(doc.data()));
          setLoading(false);
        });
      }).catch(err => console.log(err))
    }
  }, [])
  
  return (
    <div className="App">
      <NavBar />
      {
        loading ? 
        <Container className='mt-3' style={{minHeight: '100vh'}}>
          <Spinner animation="border" role="status" className='mx-auto'>
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </Container>
         :
        <Routes>
          <Route path='/' element={<UserType />} />
          <Route path='/signup' element={<Registration />} />
          <Route path='/login' element={<Authorization />} />
          <Route path='/setup' element={<HotelSetup />} />
          <Route path='/roomsetup' element={<RoomTypesSetup />} />
          <Route path='/roomassignment' element={<RoomsAssignment />} />
          <Route path='/home' element={<Home />} />
          <Route path='/reservation' element={<Reservation />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      }
      
    </div>
  )
}

export default App
