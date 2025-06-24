import React, { useState } from 'react';
import useGlobalReducer from '../hooks/useGlobalReducer';

const API_URL_BASE = "https://playground.4geeks.com/contact";
const CONTACT_BOOK_NAME = "ContactBookOrlando"; // ← Your personalized contact book

const CreateNewContact = () => {

    const { dispatch } = useGlobalReducer();

    const [newContact, setNewContact] = useState({ name: "", phone: "", email: "", address: "" });

    // Handles changes in the form inputs
    const handleOnChange = (event) => {
        setNewContact({ ...newContact, [event.target.name]: event.target.value });
    };

    // Fetches the latest list of contacts
    const fetchContacts = async () => {
        try {
            const response = await fetch(`${API_URL_BASE}/agendas/${CONTACT_BOOK_NAME}`);

            if (!response.ok) {
                throw new Error("An error occurred while fetching contacts");
            }

            const data = await response.json();
            dispatch({ type: "set_contacts", payload: { contactsX: data.contacts } });

        } catch (error) {
            console.log(error);
        }
    };

    // Creates a new contact using the API
    const createContact = async () => {
        try {
            const response = await fetch(`${API_URL_BASE}/agendas/${CONTACT_BOOK_NAME}/contacts`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newContact)
            });

            if (!response.ok) {
                throw new Error("An error occurred while creating the contact");
            }

            fetchContacts(); // Refresh the contact list

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <form>
                <div className="mb-3">
                    <label htmlFor="inputName" className="form-label">
                        Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        className="form-control"
                        id="inputName"
                        value={newContact.name}
                        onChange={handleOnChange}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="inputPhone" className="form-label">
                        Phone
                    </label>
                    <input
                        type="text"
                        name="phone"
                        className="form-control"
                        id="inputPhone"
                        value={newContact.phone}
                        onChange={handleOnChange}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="inputEmail" className="form-label">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        className="form-control"
                        id="inputEmail"
                        value={newContact.email}
                        onChange={handleOnChange}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="inputAddress" className="form-label">
                        Address
                    </label>
                    <input
                        type="text"
                        name="address"
                        className="form-control"
                        id="inputAddress"
                        value={newContact.address}
                        onChange={handleOnChange}
                    />
                </div>

                <button type="button" className="btn btn-primary" onClick={createContact}>
                    Add Contact
                </button>
            </form>
        </div>
    );
};

export default CreateNewContact;
