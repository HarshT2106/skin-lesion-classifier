"use client"

import { useState } from "react"
import axios from "axios"
import { Loader2, ChevronLeft } from "lucide-react"
import "./Chatbot.css" // Optional: add your chatbot-specific styles here

function Chatbot({ onBack, initialSystemMessage }) {
  // Initialize conversation with an optional system message
  const [messages, setMessages] = useState(
    initialSystemMessage ? [{ role: "system", content: initialSystemMessage }] : []
  )
  const [inputMessage, setInputMessage] = useState("")
  const [isSending, setIsSending] = useState(false)

  const sendMessage = async () => {
    if (!inputMessage.trim()) return

    const newMessages = [...messages, { role: "user", content: inputMessage }]
    setMessages(newMessages)
    setInputMessage("")
    setIsSending(true)

    try {
      const response = await axios.post("http://localhost:5000/chat", { messages: newMessages })
      const aiReply = response.data.response || "No response from AI."
      setMessages([...newMessages, { role: "assistant", content: aiReply }])
    } catch (err) {
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: "Error: " + (err.response?.data?.error || err.message),
        },
      ])
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div className="chatbot-container p-6 bg-white rounded-xl shadow-xl max-w-4xl mx-auto">
      <div className="flex items-center mb-4">
        <button onClick={onBack} className="mr-2 text-primary hover:text-primary/80">
          <ChevronLeft size={24} />
        </button>
        <h2 className="text-2xl font-bold text-gray-800">Chat with AI</h2>
      </div>
      <div className="chatbot-messages border border-gray-200 rounded-lg p-4 mb-4 h-80 overflow-y-auto space-y-3">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-message ${
              msg.role === "assistant" ? "bg-gray-100 text-gray-800" : "bg-blue-100 text-blue-800"
            } p-3 rounded-lg`}
          >
            <p>{msg.content}</p>
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button
          onClick={sendMessage}
          disabled={isSending}
          className="bg-primary text-black px-4 py-2 rounded-r-md flex items-center justify-center"
        >
          {isSending ? <Loader2 className="animate-spin h-5 w-5" /> : "Send"}
        </button>
      </div>
    </div>
  )
}

export default Chatbot
