import React, { useState, useEffect } from "react";
import MessageList from "../components/MessageList";

// this component renders the message page
function Message(props) {
  console.log("this happened");
  let [messages, setMessages] = useState([]);

  useEffect(() => {
    async function fetchData() {
      let req = await fetch("/api/v1/message");
      if (req.status === 200) {
        let res = await req.json();
        setMessages(res.data);
      } else if (req.status === 500) {
        let error = req.json();
        throw new Error(error);
      }
    }
    fetchData();
  }, []);

  if (!messages) return <h1>Loading...</h1>;
  return (
    <>
      <div className="container message-list">
        <h2 className="font-primary text-center font-m section-heading font-bold">
          Message List
        </h2>

        {messages.map((elem) => {
          return <MessageList message={elem} />; // messagelist component renders list elements containing message information
        })}
      </div>
    </>
  );
}

export default Message;
