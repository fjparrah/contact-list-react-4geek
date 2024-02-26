import React, { useContext, useState } from 'react';
import { Context } from '../store/appContext';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../component/contact.css";
import { useNavigate } from 'react-router-dom';

function Contact({ index, id, full_name, email, phone, address, agenda_slug }) {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    const handleDelete = async () => {
        setShowModal(true);
    };

    const handleDeleteConfirmed = async () => {
        setShowModal(false);
        actions.fetchDelete(id);
    };

    const handleUpdate = async () => {
        navigate(`/updateform/${id}`);
    };

    return (
        <div className="card py-3">
            <div className='row justify-content-center align-items-center'>
                <div className="col-md-3">
                    <div className="photo"></div>
                </div>
                <div className="col-md-6 contact-info text-center">
                    <h2>{full_name}</h2>
                    <div className='d-flex justify-content-center'><i className="fa-solid fa-envelope me-2"></i><p>{email}</p></div>
                    <div className='d-flex justify-content-center'><i className="fa-solid fa-phone me-2"></i><p>{phone}</p></div>
                    <div className='d-flex justify-content-center'><i className="fa-solid fa-address-book me-2"></i><p>{address}</p></div>
                </div>
                <div className="col-md-3 row justify-content-center contact-info">
                    <div className='col-3'>
                        <a onClick={handleUpdate} role="button" className="text-primary" data-toggle="tooltip" title="Update">
                            <i className="fa-solid fa-pen-to-square" style={{ fontSize: '300%' }}></i>
                        </a>
                    </div>
                    <div className='col-3'>
                        <Button variant="danger" onClick={handleDelete}>
                            <i className="fa-solid fa-trash-arrow-up" style={{ fontSize: '200%' }}></i>
                        </Button>
                    </div>
                </div>
                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirmar eliminación</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        ¿Estás seguro de que deseas eliminar este contacto?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>
                            Cancelar
                        </Button>
                        <Button variant="danger" onClick={handleDeleteConfirmed}>
                            Eliminar
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
}

export default Contact;



