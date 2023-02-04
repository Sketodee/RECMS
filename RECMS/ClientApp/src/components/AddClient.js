import { useState } from 'react'
import { Modal } from "react-bootstrap";
import AddClientForm from "./AddClientForm"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AddClient = () => {

    const [show, setShow] = useState(false)

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const notify = () => toast("Wow so easy!", {
        position: "top-center",
    });

    return (
        <div>
            <div className="d-flex justify-content-between py-3">
                <h2> Registered Clients </h2>
                <button type="button" className="btn btn-success" onClick={handleShow}> Register Client </button>
                <button onClick={notify}> test toast </button>
                <ToastContainer />
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Client</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddClientForm handleClose={handleClose} />
                </Modal.Body>
                {/*<Modal.Footer>*/}
                {/*    <button className="btn btn-secondary" onClick={handleClose}>Close</button>*/}
                {/*</Modal.Footer>*/}
            </Modal>
           
        </div>
    )
}

export default AddClient 