import { Accordion, Container } from "react-bootstrap";
import { useAppSelector } from "../../../hooks";
import AccordionItemContainer from "./AccordionItemContainer";


type Props = {
    currentDate: string
}

const RoomsStateContainer = ({currentDate}: Props) => {
    const { roomTypes } = useAppSelector(state => state.hotelReducer);

    return <Container className='mt-3'>
        <Accordion defaultActiveKey='0'>
            {Object.keys(roomTypes).map((roomType: string, index: number) => (
                <AccordionItemContainer roomTypeName={roomType} 
                                        index={`${index}`} 
                                        roomType={roomTypes[roomType]}
                                        currentDate={currentDate} />
            ))}
        </Accordion>
    </Container>
}

export default RoomsStateContainer;