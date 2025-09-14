import React, { useState } from "react";
import Chatbot from "react-chatbot-kit";
import { createChatBotMessage } from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import axios from "axios";
import chatbotIcon from "../medias/assurebot.png";

// Chatbot config
const config = {
  initialMessages: [
    createChatBotMessage(
      "Hi! How can I assist you with stock or company research today?"
    ),
  ],
  botName: "AssureBot",
  customStyles: {
    botMessageBox: {
      backgroundColor: "#0b3d91",
    },
    chatButton: {
      backgroundColor: "#0b3d91",
    },
  },
  placeholderText: "Type your message here...",
};

// Action Provider
const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  const handleQuery = async (query) => {
    const loadingMessage = createChatBotMessage("Searching...", {
      loading: true,
      delay: 500,
    });
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, loadingMessage],
    }));

    try {
      const response = await axios.post("http://localhost:4000/api/ask", {
        query,
      });
      const data = response.data;

      setState((prev) => ({
        ...prev,
        messages: [
          ...prev.messages.filter((msg) => msg !== loadingMessage),
          createChatBotMessage(
            data.answer || "Sorry, I couldn't find an answer for that."
          ),
        ],
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        messages: [
          ...prev.messages.filter((msg) => msg !== loadingMessage),
          createChatBotMessage(
            "I'm your financial research assistant. You can ask me about stocks, companies, or market trends."
          ),
        ],
      }));
    }
  };

  return React.Children.map(children, (child) =>
    React.cloneElement(child, { actions: { handleQuery } })
  );
};

// Message Parser
const MessageParser = ({ children, actions }) => {
  const parse = (message) => {
    const trimmedMessage = message.trim();
    if (trimmedMessage.length > 0) {
      actions.handleQuery(trimmedMessage);
    }
  };

  return React.Children.map(children, (child) =>
    React.cloneElement(child, { parse, actions })
  );
};

const ChatbotComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  const renderChatbotIcon = () =>
    chatbotIcon ? (
      <img
        src={chatbotIcon}
        alt="Chatbot"
        style={{
          width: "60px",
          height: "60px",
          filter: isOpen ? "brightness(1.2)" : "brightness(1)",
        }}
      />
    ) : (
      <div
        style={{
          width: "60px",
          height: "60px",
          backgroundColor: "#0b3d91",
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          fontSize: "30px",
        }}
      >
        💬
      </div>
    );

  return (
    <>
      {/* Floating Icon */}
      <div
        style={{
          position: "fixed",
          bottom: "30px",
          right: "20px",
          zIndex: 1000,
          cursor: "pointer",
          transition: "transform 0.2s ease",
          transform: isOpen ? "scale(1.1)" : "scale(1)",
          boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
          borderRadius: "50%",
        }}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {renderChatbotIcon()}
      </div>

      {/* Chatbot Window */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "100px",
            right: "20px",
            width: "290px",
            height: "550px",
            backgroundColor: "#fff",
            borderRadius: "10px",
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)",
            zIndex: 999,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "10px",
              backgroundColor: "#0b3d91",
              color: "white",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ fontWeight: "bold" }}>AssureBot</span>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: "none",
                border: "none",
                color: "white",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              ✕
            </button>
          </div>

          {/* Chatbot Body */}
          <div style={{ flex: 1, overflow: "hidden" }}>
            <style>
              {`
      .react-chatbot-kit-chat-input {
        background-color: white !important;
        color: black !important;
        border: 1px solid #444;
        border-radius: 8px !important;
        padding: 8px;
      }
      .react-chatbot-kit-chat-input::placeholder {
        color: #aaa;
      }
      .react-chatbot-kit-chat-btn-send {
        background-color: rgb(11, 61, 145) !important;
        border-radius: 8px !important;
        border: 1px solid #444 !important;
        padding: 6px !important;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .react-chatbot-kit-chat-btn-send-icon {
        fill: white !important;
        width: 18px;
        height: 18px;
      }
    `}
            </style>
            <Chatbot
              config={config}
              actionProvider={ActionProvider}
              messageParser={MessageParser}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ChatbotComponent;
