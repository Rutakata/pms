import { Badge, Container } from "react-bootstrap";
import { useAppSelector } from "../../hooks";


const HotelEmployeeCode = () => {
    const { employeeCode } = useAppSelector(state => state.hotelReducer);

    return <Container>
        <h3>Hotel code for employee's registration <Badge bg='secondary'>{employeeCode}</Badge>
        </h3>
    </Container>
}

export default HotelEmployeeCode;