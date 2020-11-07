import React from "react";

// this component renders lists containing information about each message
// it is imported in the message component which renders message page

export default function MessageList(props) {
  let { content, time } = props.message;
  let { name, phone, picture } = props.message.contact;
  return (
    <div className="flex ac space-between message-list-item ">
      <div className="flex ">
        <div className="avatar-container ">
          <img src={picture} alt="" />
        </div>
        <div>
          <p className="message-name">
            {name.first} {name.last}
          </p>
          <p className="message-phone">+{phone}</p>
        </div>
      </div>

      <p className="message-content align-self-center">{content}</p>

      <p className="message-date align-self-center">
        {new Date(time).toUTCString()}
      </p>
    </div>
  );
}
