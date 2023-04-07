import { Accordion, Badge, Button, Container, ListGroup, OverlayTrigger, Popover } from "react-bootstrap";
import { Cleaner } from "../../../../store/cleaningReducer";
import { IoMdAddCircleOutline } from 'react-icons/io';


type Props = {
    weekday: string,
    index: number,
    rooms: number[],
    cleaners: Cleaner[]
    handleCleanerAddition: (email: string) => void
}

const WeekDayAccordionItem = ({weekday, index, rooms, cleaners, handleCleanerAddition}: Props) => {
    const popover = (
    <Popover id="popover-basic">
        <Popover.Header as="h3">Cleaners</Popover.Header>
        <Popover.Body>
            <ListGroup>
            {cleaners.map(cleaner => 
                <ListGroup.Item onClick={() => {handleCleanerAddition(cleaner.email)}}>
                    {cleaner.email}
                </ListGroup.Item>
            )}
            </ListGroup>
        </Popover.Body>
    </Popover>)

    return <Accordion.Item eventKey={`${index}`}>
        <Accordion.Header>{weekday}</Accordion.Header>
        <Accordion.Body>
            <Container className="d-flex flex-wrap gap-1">
                {rooms.map(room => <Badge>{room}</Badge>)}
            </Container>
            <Container className="mt-3">
                <Container className="d-flex justify-content-end gap-1 align-items-center">
                    <span>Add cleaner</span>
                    <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
                        <Button className="d-flex align-items-center">
                            <IoMdAddCircleOutline />
                        </Button>
                    </OverlayTrigger>
                </Container>
            </Container>
        </Accordion.Body>
    </Accordion.Item>
}

export default WeekDayAccordionItem;