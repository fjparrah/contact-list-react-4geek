import React, { useState, useContext } from 'react';
import { Context } from "../store/appContext.js"
import { useNavigate } from 'react-router-dom';

export const ContactForm = () => {
  const { actions } = useContext(Context);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    phone: '',
    address: ''
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!/^[a-zA-Z\s]+$/.test(formData.fullname)) {
      newErrors.fullname = 'El nombre completo debe contener solo letras';
    }


    if (!/^[\w.-]+@[a-zA-Z\d]+\.[a-zA-Z]{3}$/.test(formData.email)) {
      newErrors.email = 'El formato del email es incorrecto';
    }


    if (!/^\d+$/.test(formData.phone)) {
      newErrors.phone = 'El teléfono debe contener solo números';
    }

    if (!formData.fullname || !formData.email || !formData.phone || !formData.address) {
      newErrors.allFields = 'Todos los campos deben contener información';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateForm()) {

      actions.ContactForm(formData);
      navigate("/");
    }
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    setErrors({ ...errors, [event.target.name]: null });
  };

  return (
    <div className="container d-flex justify-content-center">
      <div className='col-lg-7 col-s-12'>
        <h1 className="text-center mt-5">Añadir nuevo contacto</h1>
        <form onSubmit={handleSubmit}>
          <div className="mt-4 form-group">
            <label>Nombre Completo</label>
            <input
              type="text"
              name="fullname"
              className="form-control"
              placeholder="Ingresar Nombre Completo"
              onChange={handleChange}
            />
            {errors.fullname && <div className="text-danger">{errors.fullname}</div>}
          </div>
          <div className="mt-2 form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Ingresar email"
              onChange={handleChange}
            />
            {errors.email && <div className="text-danger">{errors.email}</div>}
          </div>
          <div className="mt-2 form-group">
            <label>Telefono</label>
            <input
              type="tel"
              name="phone"
              className="form-control"
              placeholder="Ingresar telefono"
              onChange={handleChange}
            />
            {errors.phone && <div className="text-danger">{errors.phone}</div>}
          </div>
          <div className="mt-2 form-group">
            <label>Dirección</label>
            <input
              type="text"
              name="address"
              className="form-control"
              placeholder="Ingresar dirección"
              onChange={handleChange}
            />
          </div>
          <div className="form-group text-center mt-4 form-button">
            <button type="submit" className="btn btn-primary">Añadir</button>
          </div>
          {errors.allFields && <div className="text-danger">{errors.allFields}</div>}
        </form>
        <div className='mt-4'>
          <a style={{ fontWeight: 'bold', textDecoration: 'underline' }} className='text-center' href='/'>Ir a lista de contactos</a>
        </div>
      </div>
    </div>
  );
}
