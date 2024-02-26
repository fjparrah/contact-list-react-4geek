import React, { useState, useContext } from 'react';
import { Context } from "../store/appContext.js";
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';

export const UpdateForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { actions } = useContext(Context);

    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        phone: '',
        address: ''
    });

    const [showModal, setShowModal] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Mostrar el modal de confirmación
        setShowModal(true);
    };

    const handleUpdateConfirmed = async () => {
        // Actualizar el contacto y cerrar el modal
        const inputData = { ...formData, id };
        actions.UpdateContact(inputData);
        navigate("/");
        setShowModal(false);
    };

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    return (
        <div className="container d-flex justify-content-center">
            <div className='col-lg-7 col-s-12'>
                <h1 className="text-center mt-5">Actualizar Contacto</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mt-4 form-group">
                        <label>Nombre completo</label>
                        <input type="text" name="fullname" className="form-control" placeholder="Ingresar nombre completo" onChange={handleChange} />
                    </div>
                    <div className="mt-2 form-group">
                        <label>Email</label>
                        <input type="email" name="email" className="form-control" placeholder="Ingresar email" onChange={handleChange} />
                    </div>
                    <div className="mt-2 form-group">
                        <label>Telefono</label>
                        <input type="phone" name="phone" className="form-control" placeholder="Ingresar telefono" onChange={handleChange} />
                    </div>
                    <div className="mt-2 form-group">
                        <label>Dirección</label>
                        <input type="text" name="address" className="form-control" placeholder="Ingresar dirección" onChange={handleChange} />
                    </div>
                    <div className="form-group text-center mt-4 form-button">
                        <button type="button" className="btn btn-primary" onClick={() => setShowModal(true)}>
                            Actualizar
                        </button>
                    </div>
                </form>
                <div className='mt-4'>
                    <a style={{ fontWeight: 'bold', textDecoration: 'underline' }} className='text-center' href='/'>Ir a lista de contactos</a>
                </div>

                {/* Modal de confirmación */}
                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirmar actualización</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        ¿Estás seguro de que deseas actualizar este contacto?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>
                            Cancelar
                        </Button>
                        <Button variant="primary" onClick={handleUpdateConfirmed}>
                            Actualizar
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
};




