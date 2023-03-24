import { Modal, Button, Form } from "react-bootstrap";
import { useAppSelector } from "../../../hooks";


type Props= {
    show: boolean,
    handleShow: () => void
}

const ClientDetails = ({show, handleShow}: Props) => {
    const { client } = useAppSelector(state => state.reservationReducer);

    return <Modal show={show} onHide={handleShow}>
        <Modal.Dialog style={{width: '100%', margin: '0'}}>
            <Modal.Header closeButton>
                <Modal.Title>Modal title</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form className="d-flex flex-column gap-3">
                    <Form.Group>
                        <Form.Label>Client name</Form.Label>
                        <Form.Control type='text' value={client.name} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Client surname</Form.Label>
                        <Form.Control type='text' value={client.surname} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Client phone number</Form.Label>
                        <Form.Control type='text' value={client.phone} />
                    </Form.Group>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary">Close</Button>
                <Button variant="primary">Save changes</Button>
            </Modal.Footer>
        </Modal.Dialog>
    </Modal>
}

export default ClientDetails;