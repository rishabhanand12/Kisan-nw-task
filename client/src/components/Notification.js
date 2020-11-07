import React from "react";

//  noti9fication component

export default function Notification(props) {
  return (
    <>
      <div
        className={
          props.type === "Error"
            ? "notification-container align-center flex error"
            : "notification-container align-center flex success"
        }
      >
        <div className="notification-icon">
          {props.type === "Error" ? (
            <i className="fas fa-times-circle"></i>
          ) : (
            <i className="fas fa-check-circle"></i>
          )}
        </div>
        <div>
          <span>{props.type}</span>
          <p>{props.message}</p>
        </div>
      </div>
    </>
  );
}
