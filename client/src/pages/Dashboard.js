import React, { useState, useEffect } from "react";
import ContactList from "../components/ContactList";

// this component renders the dashboard component

function Dashboard(props) {
  let [contacts, setContacts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        //  fetching the contacts data here
        let req = await fetch("/api/v1/contact");
        if (req.status === 200) {
          let res = await req.json();
          setContacts(res.data);
        } else if (req.status === 500) {
          let error = req.json();
          throw new Error(error);
        }
      } catch (err) {
        throw new Error(err);
      }
    }
    fetchData();
  }, []);

  if (!contacts) return <h1>Loading...</h1>;
  return (
    <>
      <section className="container ">
        <h2 className="font-primary font-m font-bold">Contacts</h2>
        <div className="contact-list">
          <ul>
            {contacts.map((elem, index) => {
              return (
                <ContactList // contactlist component renders individual components
                  id={index}
                  contact={elem}
                />
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
}

export default Dashboard;
