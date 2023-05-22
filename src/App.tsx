import { useEffect } from 'react';
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
import { useAppDispatch, useAppSelector } from './hooks';
import { getHotelData } from './store/hotelReducer';
import { Container, Spinner } from 'react-bootstrap';
import './App.css';
import ReservationContainer from './components/Reservation/ReservationContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import EmployeesContainer from './components/Employees/EmployeesContainer';
import { getUserData } from './store/userReducer';
import BookingsContainer from './components/Bookings/BookingsContainer';
import CleaningContainer from './components/Cleaning/CleaningContainer';
import OwnerRegistration from './components/Registration/OwnerRegistration';


const App = () => {
  const { currentUser } = useAuth();
  const { hotel, roles } = useAppSelector(state => state.userReducer);
  const { loading } = useAppSelector(state => state.hotelReducer)
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser && currentUser.email) {
      dispatch(getUserData(currentUser.email));
      // dispatch(getHotelData(hotel));
    }else {
      navigate('/');
    }
  }, [currentUser])

  useEffect(() => {
    if (hotel) {
      dispatch(getHotelData(hotel));
    }
  }, [hotel]);

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
          <>
          {
            roles.owner ? 
            <Routes>
              <Route path='/' element={<UserType />} />
              <Route path='/signup' element={<Registration />} />
              <Route path='owner-signup' element={<OwnerRegistration />} />
              <Route path='/login' element={<Authorization />} />
              <Route path='/setup' element={<HotelSetup />} />
              <Route path='/roomsetup' element={<RoomTypesSetup />} />
              <Route path='/roomassignment' element={<RoomsAssignment />} />
              <Route path='/home' element={<Home />} />
              <Route path='/reservation' element={<ReservationContainer />} />
              <Route path='/bookings' element={<BookingsContainer />} />
              <Route path='/profile' element={<ProfileContainer />} />
              <Route path='/employees' element={<EmployeesContainer />} />
              <Route path='/cleaning' element={<CleaningContainer />} />
              <Route path='*' element={<NotFound />} />
            </Routes> : 
            roles.cleaner ? 
            <Routes>
              <Route path='/' element={<UserType />} />
              <Route path='/signup' element={<Registration />} />
              <Route path='owner-signup' element={<OwnerRegistration />} />
              <Route path='/login' element={<Authorization />} />
              <Route path='/cleaning' element={<CleaningContainer />} />
              <Route path='/profile' element={<ProfileContainer />} />
            </Routes> : 
            roles.receptionist ? 
            <Routes>
              <Route path='/' element={<UserType />} />
              <Route path='/signup' element={<Registration />} />
              <Route path='owner-signup' element={<OwnerRegistration />} />
              <Route path='/login' element={<Authorization />} />
              <Route path='/home' element={<Home />} />
              <Route path='/reservation' element={<ReservationContainer />} />
              <Route path='/bookings' element={<BookingsContainer />} />
              <Route path='/profile' element={<ProfileContainer />} />
            </Routes> : 
            <Routes>
              <Route path='/' element={<UserType />} />
              <Route path='/signup' element={<Registration />} />
              <Route path='owner-signup' element={<OwnerRegistration />} />
              <Route path='/login' element={<Authorization />} />
              <Route path='/setup' element={<HotelSetup />} />
              <Route path='/roomsetup' element={<RoomTypesSetup />} />
              <Route path='/roomassignment' element={<RoomsAssignment />} />
            </Routes>
          }
          </>
      }
    </div>
  )
}

export default App
