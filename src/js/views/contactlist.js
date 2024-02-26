import React, { useEffect, useContext } from 'react';
import { Context } from '../store/appContext';
import Contact from '../component/contact';
import { Link } from 'react-router-dom';

export function ContactList() {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.LoadContactData();
    }, [store.contact, store.contacts]);

    return (
        <div className="container flex-wrap">
            <p className="text-center title justify-content-center my-3">
                <h1>Lista de contactos</h1>
            </p>
            <div className="d-flex justify-content-center">
                <Link className="btn btn-danger mt-3" to="/contactform">
                    Añadir nuevo contacto
                </Link>
            </div>
            <div id="contacts" className="row" aria-expanded="true">
                {store.contacts.length === 0 ? (
                    <h4 className="text-center mt-5">No hay contactos, presionar boton: "Añadir nuevo contacto"</h4>
                ) : (
                    <ul className="list-group col-" id="contact-list">
                        {store.contacts?.map((contact, index) => (
                            <Contact
                                key={index}
                                id={contact.id}
                                full_name={contact.full_name}
                                email={contact.email}
                                phone={contact.phone}
                                address={contact.address}
                                agenda_slug={contact.agenda_slug}
                            />
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

