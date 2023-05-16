"use client";

import { useState } from "react";
import "../app/globals.css";

const Chatbox = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [latest, setLatest] = useState(1);

  const handleSubmit = async (e) => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behaviour: "smooth",
    });

    e.preventDefault();
    setLoading(true);

    setMessages((prevMessages) => [
      ...prevMessages,
      { content: inputValue, role: "user" },
    ]);

    const query = inputValue;
    setInputValue(" ");
    const response = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ message: query, history: messages }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const _answer = await response.json();
    const answer = _answer.choices[0].message.content;
    setLoading(false);
    setMessages((prevMessages) => [
      ...prevMessages,
      { content: answer, role: "assistant" },
    ]);
    setTimeout(300);
    setLatest(messages.length);
  };

  return (
    <div className="rounded-lg !bg-transparent pb-24">
      {messages && (
        <div className="space-y-2 flex flex-col p-4 rounded-lg !bg-transparent">
          {messages.map((message, index) => (
            <span
              key={message}
              className={`px-4 py-2 ${
                message.role === "assistant"
                  ? "bg-blue-500 text-white text-left rounded-lg "
                  : "bg-gray-300 text-black text-right rounded-lg ml-auto"
              }`}
              style={{ maxWidth: "30%" }}
            >
              {/* {!loading && message.role== ? message.content : "Loading response..."} */}
              {message.role == "assistant" && loading && latest == index
                ? "..."
                : message.content}
            </span>
          ))}
        </div>
      )}
      <div className="w-full fixed bottom-2">
        <form onSubmit={handleSubmit} className=" flex gap-4 justify-center">
          <input
            className="w-[40%] p-2 border border-gray-300 rounded-lg "
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your messages here"
          />
          <button
            className=" p-2 bg-purple-600 rounded-lg text-white w-28"
            type="submit"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

const HomePage = () => {
  return (
    <div
      className=" min-h-screen bg-fixed"
      style={{
        backgroundImage: "url(https://files.sciastra.com/footermain.jpg)",
      }}
    >
      <h1 className="text-white font-bold text-left pl-8 text-3xl py-2">
        SciAstra Chat
      </h1>
      <Chatbox />
    </div>
  );
};

export default HomePage;
