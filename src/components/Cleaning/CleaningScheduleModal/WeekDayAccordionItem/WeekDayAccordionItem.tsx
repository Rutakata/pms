import { Accordion, Badge, Button, Container } from "react-bootstrap";
import { Cleaner } from "../../../../store/cleaningReducer";
import { IoMdAddCircleOutline } from 'react-icons/io';


type Props = {
    weekday: string,
    index: number,
    rooms: number[],
    cleaners: Cleaner[]
}

const WeekDayAccordionItem = ({weekday, index, rooms, cleaners}: Props) => {
    return <Accordion.Item eventKey={`${index}`}>
        <Accordion.Header>{weekday}</Accordion.Header>
        <Accordion.Body>
            <Container className="d-flex flex-wrap gap-1">
                {rooms.map(room => <Badge>{room}</Badge>)}
            </Container>
            <Container className="mt-3">
                <Container className="d-flex justify-content-end gap-1 align-items-center">
                    <span>Add cleaner</span>
                    <Button className="d-flex align-items-center">
                        <IoMdAddCircleOutline />
                    </Button>
                </Container>
            </Container>
        </Accordion.Body>
    </Accordion.Item>
}

export default WeekDayAccordionItem;