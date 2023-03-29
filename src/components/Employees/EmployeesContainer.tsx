import { useEffect } from 'react';
import { Container } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getHotelEmployees } from '../../store/employeesReducer';
import HotelEmployeeCode from "./HotelEmployeeCode";

const EmployeesContainer = () => {
    const { hotelId } = useAppSelector(state => state.hotelReducer);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getHotelEmployees(hotelId));
    }, [hotelId])

    return <Container className="mt-3">
        <HotelEmployeeCode />
    </Container>
}

export default EmployeesContainer;