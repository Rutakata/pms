import { Button, Modal } from "react-bootstrap";


type Props = {
    show: boolean, 
    handleModalShow: () => void
}

const CleaningScheduleModal = ({show, handleModalShow}: Props) => {
    return <Modal show={show} onHide={handleModalShow}>
        <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body></Modal.Body>
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