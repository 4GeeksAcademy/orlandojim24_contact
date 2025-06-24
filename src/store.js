export const initialStore = () => {
  return {
    contactsY: [],
    agenda: ""
  }
}

export default function storeReducer(store, action = {}) {
  const API_URL_BASE = 'https://playground.4geeks.com/contact';
  switch (action.type) {

    // Method created to fetch contacts (method 1)
    case 'update_contacts':
      const { contacts } = action.payload
      const { slug } = action.payload

      // // Logging to console for debugging:
      // console.log("Print action.payload:");
      // console.log(action.payload);
      // console.log("Print contacts:");
      // console.log(contacts);
      // console.log("Print slug:");
      // console.log(slug);
      // console.log("Print ...store:");

      // if (Array.isArray(store)) {
      //   console.log([...store]); 
      // } else {
      //   console.log("store is not an array:", store); 
      // }
      return { ...store, contactsY: [...contacts], agenda: slug }

    // Method created to fetch contacts (method 2)
    case 'set_contacts':
      const { contactsX } = action.payload
      return {
        ...store,
        contactsY: contactsX
      }

    default:
      throw Error('Unknown action.');
  }

}
