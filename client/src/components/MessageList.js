import React from "react";
import { Link } from "react-router-dom";

// this component renders lists containing information about each message
// it is imported in the message component which renders message page

export default function MessageList(props) {
  let { content, time } = props.message;
  let { name, phone, picture, slug } = props.message.contact;
  return (
    <>
      <div className="flex ac space-between message-list-item ">
        <Link to={`/contact/${slug}`}>
          <div className="flex ">
            <div className="avatar-container ">
              <img src={picture} alt="" />
            </div>
            <div className="flex align-center align-self-center">
              <p className="w-100 message-name">
                {name.first} {name.last}
              </p>
              <p className="w-100 message-phone">+{phone}</p>
            </div>
          </div>
        </Link>

        <p className="message-content align-self-center">Message: {content}</p>

        <p className="message-date align-self-center">
          {new Date(time).toUTCString()}
        </p>
      </div>
    </>
  );
}
