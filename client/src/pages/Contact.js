import React, { useState, useEffect } from "react";
import Notification from "../components/Notification";
import { withRouter } from "react-router-dom";
import MessagePopUp from "../components/MessagePopup";

// this component renders the page for each contact
function Contact(props) {
  let [contact, setContact] = useState(null);
  let [formVisible, setformVisible] = useState(false);
  let [notification, setNotification] = useState({ show: false });

  useEffect(() => {
    // receiving a slug using URL parameter and sending a get request to fetch contact info
    let slug = props.match.params.id;
    async function fetchData() {
      try {
        let req = await fetch(
          `/api/v1/contact/messages?name=${slug}`
        );
        if (req.status === 200) {
          let res = await req.json();
          setContact(res.data);
        } else {
          let error = req.json();
          throw new Error(error);
        }
      } catch (err) {
        throw new Error(err);
      }
    }
    fetchData();
  }, []);

  // this function makes the form visible
  let handleMessageSend = () => {
    setformVisible(true);
  };

  //function to close the OTP form once a response a received from the server
  let closeForm = () => {
    setformVisible(false);
  };

  //notification handler function
  let handleNotification = (type, message) => {
    clearTimeout(2000);
    setNotification({ show: true, type, message });
    // closes the notification after timeout
    setTimeout(() => {
      setNotification({ show: false, type: "", message: "" });
    }, 2000);
  };

  if (!contact) return <h1>Loading</h1>;
  return (
    <>
      <section className="container contacts-container">
        <div className="flex">
          <div className="info-avatar">
            <img src={contact.picture} alt="" />
          </div>
          <div>
            <p className="contact-name">{`${contact.name.first} ${contact.name.last}`}</p>
            <div className="contact-phone">
              <p>+{contact.phone}</p>
            </div>
            <button class="btn" onClick={handleMessageSend}>
              Send Message
            </button>
          </div>
        </div>
      </section>
      {/* only display form if formvisible is set in state */}
      <div className={!formVisible ? "hidden" : "form-container"}>
        <MessagePopUp
          notificationHandler={(type, message) =>
            handleNotification(type, message)
          }
          close={closeForm}
          contact={contact}
        />
      </div>
      {/* only display notification if show notification is set in the state */}
      {notification.show && (
        <Notification type={notification.type} message={notification.message} />
      )}
    </>
  );
}

export default withRouter(Contact);
