import { useEffect } from 'react';
import { Container } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getHotelEmployees } from '../../store/employeesReducer';
import EmployeesTable from './EmployeesTable/EmployeesTable';
import HotelEmployeeCode from "./HotelEmployeeCode";


const EmployeesContainer = () => {
    const { hotelId } = useAppSelector(state => state.hotelReducer);
    const { employees } = useAppSelector(state => state.employeesReducer);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getHotelEmployees(hotelId));
    }, [hotelId])

    return <Container className="mt-3">
        <HotelEmployeeCode />
        <EmployeesTable employees={employees} />
    </Container>
}

export default EmployeesContainer;