import React from "react";
import uuid from "react-uuid";
import { Link } from "react-router-dom";

// this component is a list component for individual contacts.
//  it uis imported in the dashboard component to display list items
export default function ContactList(props) {
  let { name, picture, slug } = props.contact;
  return (
    <>
      <Link to={`/contact/${slug}`}>
        <li className="flex align-center contact-list-item " key={uuid()}>
          <div className="avatar-container">
            <img src={picture} alt="" />
          </div>
          <p className="contact-name">
            {name.first} {name.last}
          </p>
        </li>
      </Link>
    </>
  );
}
