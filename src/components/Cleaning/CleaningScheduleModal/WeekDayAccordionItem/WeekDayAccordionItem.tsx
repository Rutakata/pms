import { Accordion, Badge, Button, Container, ListGroup, OverlayTrigger, Popover } from "react-bootstrap";
import { Cleaner, CleaningSchedule } from "../../../../store/cleaningReducer";
import { GiHamburgerMenu } from 'react-icons/gi';


type Props = {
    weekday: string,
    index: number,
    rooms: number[],
    cleaners: Cleaner[],
    newCleaningSchedule: CleaningSchedule,
    handleCleanerAddition: (email: string) => void,
    handleSetCleanerActive: (email: string) => void,
    handleRoomAssignment: (room: number) => void,
    handleRoomAssignmentRemoval: (email: string, room: number) => void
}

const WeekDayAccordionItem = ({weekday, index, rooms, cleaners, newCleaningSchedule, 
                               handleCleanerAddition, 
                               handleSetCleanerActive,
                               handleRoomAssignment,
                               handleRoomAssignmentRemoval}: Props) => {
    const popover = (
    <Popover id="popover-basic">
        <Popover.Header as="h3">Cleaners</Popover.Header>
        <Popover.Body>
            <ListGroup>
            {cleaners.map((cleaner: Cleaner) => {
                return Object.keys(newCleaningSchedule[weekday]).includes(cleaner.email) ? 
                null :
                <ListGroup.Item onClick={() => {handleCleanerAddition(cleaner.email)}}>
                    {cleaner.email}
                </ListGroup.Item>
            })}
            </ListGroup>
        </Popover.Body>
    </Popover>)

    const weekdayAssignedCleaners = Object.keys(newCleaningSchedule[weekday]);

    return <Accordion.Item eventKey={`${index}`}>
        <Accordion.Header>{weekday}</Accordion.Header>
        <Accordion.Body>
            <Container className="d-flex flex-wrap gap-1">
                {rooms.map(room => <Badge onClick={() => handleRoomAssignment(room)}>{room}</Badge>)}
            </Container>
            <Container className="mt-3">
                <Container className="d-flex justify-content-end gap-1 align-items-center">
                    <span>Add cleaner</span>
                    <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
                        <Button className="d-flex align-items-center">
                            <GiHamburgerMenu />
                        </Button>
                    </OverlayTrigger>
                </Container>
                <Container className="p-0 mt-2">
                    {   
                        weekdayAssignedCleaners.length > 0 ? 
                        weekdayAssignedCleaners.map(cleaner => 
                            <Container className="p-0">
                                <span className={`m-0 ${newCleaningSchedule[weekday][cleaner].isActive ? 'text-success' : null}`} 
                                      onClick={() => handleSetCleanerActive(cleaner)}>
                                    {cleaner}
                                </span>
                                <p className="d-flex flex-wrap gap-1">
                                    {newCleaningSchedule[weekday][cleaner].assignedRooms.map(room => 
                                        <Badge onClick={() => handleRoomAssignmentRemoval(cleaner, room)}>
                                            {room}
                                        </Badge>
                                    )}
                                </p>
                            </Container>
                        ) : <Container>No assignments</Container>
                    }
                </Container>
            </Container>
        </Accordion.Body>
    </Accordion.Item>
}

export default WeekDayAccordionItem;