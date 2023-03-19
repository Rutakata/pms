import { Accordion, Container, Form } from "react-bootstrap";
import { useAppSelector } from "../../hooks";
import RoomTypeAccordion from "./RoomTypeAccordion";


const RoomsAssignment = () => {
    const { roomTypes } = useAppSelector(state =>  state.hotelReducer);

    return <Container className='d-flex justify-content-center align-items-center' style={{height: '100vh'}}>
        <Form className="border p-3" style={{width: '500px'}}>
            <h1>Rooms assignment</h1>
            <Accordion defaultActiveKey='0'>
                {Object.keys(roomTypes).map(
                    (roomTypesKey, index) => <RoomTypeAccordion eventKey={index} 
                                                                roomTypeName={roomTypesKey} 
                                                                roomsNumber={roomTypes[roomTypesKey].roomsNumber}
                                                                rooms={roomTypes[roomTypesKey].rooms} />
                )}
            </Accordion>
        </Form>
        
    </Container>
}

export default RoomsAssignment;