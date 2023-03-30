import { useEffect, useState } from 'react';
import UserType from './components/UserType/UserType';
import { Routes, Route, useNavigate } from 'react-router-dom';
import NotFound from './components/NotFound/NotFound';
import Registration from './components/Registration/Registration';
import Authorization from './components/Authorization/Authorization';
import HotelSetup from './components/HotelSettings/HotelSetup';
import { useAuth } from './contexts/AuthContext';
import Home from './components/Home/Home';
import RoomTypesSetup from './components/RoomTypesSetup/RoomTypesSetup';
import RoomsAssignment from './components/RoomsAssignment/RoomsAssignment';
import NavBar from './components/NavBar/NavBar';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from './firebase';
import { useAppDispatch, useAppSelector } from './hooks';
import { getHotelData, setHotelData } from './store/hotelReducer';
import { Container, Spinner } from 'react-bootstrap';
import './App.css';
import ReservationContainer from './components/Reservation/ReservationContainer';
import { setRoomTypes } from './store/reservationReducer';
import ProfileContainer from './components/Profile/ProfileContainer';
import EmployeesContainer from './components/Employees/EmployeesContainer';
import { getUserData } from './store/userReducer';


const App = () => {
  const { currentUser } = useAuth();
  const { hotel } = useAppSelector(state => state.userReducer);
  const { loading } = useAppSelector(state => state.hotelReducer)
  // const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser && currentUser.email) {
      // setLoading(true);
      dispatch(getUserData(currentUser.email));
      dispatch(getHotelData(hotel));
      // setLoading(false);
    }else {
      navigate('/');
    }
  }, [currentUser, hotel])

  // useEffect(() => {
  //   setLoading(true);
  //   dispatch(getHotelData(hotel));
  //   setLoading(false);
  // }, [hotel]);

  return (
    <div className="App">
      <NavBar />
      {
        loading ?
          <Container className='mt-3' style={{ minHeight: '100vh' }}>
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
            <Route index path='/home' element={<Home />} />
            <Route path='/reservation' element={<ReservationContainer />} />
            <Route path='/profile' element={<ProfileContainer />} />
            <Route path='/employees' element={<EmployeesContainer />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
      }

    </div>
  )
}

export default App
