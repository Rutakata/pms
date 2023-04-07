import { Accordion, Button, Modal } from "react-bootstrap";
import { Cleaner } from "../../../store/cleaningReducer";
import WeekDayAccordionItemContainer from "./WeekDayAccordionItem/WeekDayAccordionItemContainer";


type Props = {
    show: boolean,
    handleModalShow: () => void,
}

const CleaningScheduleModal = ({show, handleModalShow}: Props) => {
    const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    return <Modal show={show} onHide={handleModalShow}>
        <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Accordion defaultActiveKey='0'>
                {weekdays.map((weekday, index) => <WeekDayAccordionItemContainer weekday={weekday} index={index} key={weekday} />)}
            </Accordion>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleModalShow}>
                Close
            </Button>
            <Button variant="primary" onClick={handleModalShow}>
                Create schedule
            </Button>
        </Modal.Footer>
    </Modal>
}

export default CleaningScheduleModal;