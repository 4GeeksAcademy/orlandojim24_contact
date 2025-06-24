import React, { useState } from 'react';
import { Link } from "react-router-dom";

const API_URL_BASE = "https://playground.4geeks.com/contact";
const CONTACT_BOOK_NAME = "ContactBookOrlando"; // Your contact book name

const CreateContact = () => {

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");

    const handleRegisterContact = async () => {
        const newContact = {
            name,
            phone,
            email,
            address
        };

        try {
            const response = await fetch(`${API_URL_BASE}/agendas/${CONTACT_BOOK_NAME}/contacts`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newContact)
            });

            if (!response.ok) {
                throw new Error("An error occurred while creating the contact");
            }

            clearForm();

        } catch (error) {
            console.log(error);
        }
    };

    const clearForm = () => {
        setName("");
        setPhone("");
        setEmail("");
        setAddress("");
    };

    return (
        <div className="container">
            <form>
                <div className="text-center mt-2">
                    <h2>Add a New Contact</h2>
                </div>

                <div className="mb-3">
                    <label htmlFor="inputName" className="form-label">
                        Name:
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="inputName"
                        placeholder="Enter name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="inputPhone" className="form-label">
                        Phone:
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="inputPhone"
                        placeholder="Enter phone number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="inputEmail" className="form-label">
                        Email:
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="inputEmail"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="inputAddress" className="form-label">
                        Address:
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="inputAddress"
                        placeholder="Enter address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>

                <button
                    type="button"
                    className="btn btn-primary m-2"
                    onClick={handleRegisterContact}
                >
                    Add Contact
                </button>

                <Link to={'/'}>
                    <button type="button" className="btn btn-secondary">
                        Go Back
                    </button>
                </Link>
            </form>
        </div>
    );
};

export default CreateContact;
