import { useEffect } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

const API_URL_BASE = "https://playground.4geeks.com/contact";
const AGENDA_NAME = "ContactBookOrlando";

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();

  // Fetch contacts from API
  const fetchContacts = async () => {
    try {
      const response = await fetch(`${API_URL_BASE}/agendas/${AGENDA_NAME}`);

      if (!response.ok) {
        throw new Error("Error fetching contacts");
      }

      const data = await response.json();
      console.log(data);

      dispatch({ type: "update_contacts", payload: data });
    } catch (error) {
      console.log(error);
    }
  };

  // Delete contact by ID
  const deleteContact = async (contactId) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      try {
        const response = await fetch(
          `${API_URL_BASE}/agendas/${AGENDA_NAME}/contacts/${contactId}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error("Error deleting contact: " + errorText);
        }

        fetchContacts();
      } catch (error) {
        console.error(error);
        alert("Failed to delete contact: " + error.message);
      }
    }
  };

  // Create agenda if it doesn't exist
  const createAgenda = async () => {
    try {
      const response = await fetch(`${API_URL_BASE}/agendas/${AGENDA_NAME}`, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error(`Error creating agenda: ${AGENDA_NAME}`);
      }
      fetchContacts();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className="container text-center mt-5">
      <h2>Contact List</h2>
      <div className="d-flex justify-content-end mt-3">
        <Link to={`/create-contact`}>
          {store.agenda !== "" ? (
            <button type="button" className="btn btn-success">
              Add Contact
            </button>
          ) : (
            ""
          )}
        </Link>
      </div>

      {store.contactsY && store.contactsY.length > 0 ? (
        <div className="list-group mt-2">
          {store.contactsY.map((item) => {
            return (
              <div key={item.id} className="list-group-item p-2">
                <div className="row w-100 align-items-center m-0">
                  <div className="col-3">
                    <img
                      src="https://picsum.photos/120"
                      className="img-fluid rounded-circle me-3"
                      alt="Profile"
                    />
                  </div>
                  <div className="col-6 text-start">
                    <h5 className="mb-1">{item.name}</h5>
                    <p className="mb-1">📍 {item.address}</p>
                    <p className="mb-1">📞 {item.phone}</p>
                    <p className="mb-1">📧 {item.email}</p>
                  </div>
                  <div className="col-3 d-flex align-items-end align-self-start justify-content-end p-0">
                    <Link to={`/edit-contact/${item.id}`}>
                      <i className="fa-solid fa-pen-to-square m-3"></i>
                    </Link>

                    <i
                      className="fa-solid fa-trash-can m-3"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        deleteContact(item.id);
                      }}
                    ></i>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div>
          <p className="mt-4 text-muted">No contacts available.</p>
          {store.agenda === "" ? (
            <button
              type="button"
              className="btn btn-primary m-2"
              onClick={() => {
                createAgenda();
              }}
            >
              Create Agenda
            </button>
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
};
