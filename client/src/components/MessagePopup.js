import React, { useState } from "react";

// this component renders the popup form ro send an OTP once user clicks send message button
function MessagePopup(props) {
  let [message, setMessage] = useState(generateOTP().toString()); //generating random 6 digit OTP
  let [error, setError] = useState(null);

  let handleChange = (e) => {
    setMessage(e.target.value); // created function here rather than inline function here to avoid initialization of a new function each time the component renders
  };

  // submits the form and sends a post request to the server to use Twilio API to send message
  let handleSubmit = async (event) => {
    event.preventDefault();
    let { name, phone } = props.contact;
    try {
      if (!validateOTP(message)) {
        // client side validation for form to check if the OTP is a valid and seeting error if not
        //request is not sent unless the OTP is valid
        setError("Enter a valid 6 digit number as OTP.");
      } else {
        let req = await fetch("/api/v1/text", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            text: `Hi, your OTP is: ${message}`,
            recepient: `+${phone}`,
          }),
        });
        if (req.status === 200) {
          let res = await req.json();
          // call notification handler function to display a success notification
          props.notificationHandler("Success", res.message);
          props.close();
        } else {
          let res = await req.json();
          //  calling notification function here to
          props.notificationHandler("Error", res.error);
          props.close();
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <p onClick={() => props.close()} className="close-btn">
        x
      </p>
      <form className="flex justify-center" onSubmit={handleSubmit}>
        {error && <p>{error}</p>}
        <label>Hi! Your OTP is:</label>
        <div className="input-container">
          <input
            type="text"
            value={message}
            onChange={handleChange}
            // minLength="6"
            // maxLength="6"
            required
          />
        </div>
        <input type="Submit" value="Send OTP" />
      </form>
    </>
  );
}

// function that generates the OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000);
}

// function to validate the OTP
function validateOTP(OTP) {
  console.log("here");
  console.log(typeof OTP);
  console.log(OTP.length);
  if (OTP.length === 6) {
    console.log("2");
    if (Number(OTP) / 10) {
      console.log(3);
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

export default MessagePopup;
