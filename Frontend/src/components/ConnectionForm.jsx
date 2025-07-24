import React, { useState, useEffect } from "react";
import socket from "../utils/socket";

const ConnectionForm = ({ senderEmail, setReceiverEmail }) => {
  const [inputReceiverEmail, setInputReceiverEmail] = useState("");
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState("");

  const handleConnect = () => {
    setError("");

    if (!inputReceiverEmail.trim()) {
      setError("Receiver email is required.");
      return;
    }

    if (!senderEmail) {
      setError("Sender email is missing.");
      return;
    }

    if (!socket.connected) {
      socket.connect();
    }

    socket.emit("register_email", senderEmail);
    socket.emit("connect_to_user", {
      from: senderEmail,
      to: inputReceiverEmail,
    });
  };

  useEffect(() => {
    const handleSuccess = () => {
      setConnected(true);
      setReceiverEmail(inputReceiverEmail);
    };

    const handleFailure = ({ reason }) => {
      setConnected(false);
      setError(`Connection failed: ${reason}`);
    };

    socket.off("connection_success").on("connection_success", handleSuccess);
    socket.off("connection_failed").on("connection_failed", handleFailure);

    return () => {
      socket.off("connection_success", handleSuccess);
      socket.off("connection_failed", handleFailure);
    };
  }, [inputReceiverEmail, setReceiverEmail]);

  return (
    <div className="space-y-4">
      <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-2xl shadow-xl space-y-4">
        <div>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            👤 Logged in as: <strong>{senderEmail}</strong>
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <input
            type="email"
            placeholder="Enter receiver's email"
            value={inputReceiverEmail}
            onChange={(e) => setInputReceiverEmail(e.target.value)}
            className="flex-1 p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={handleConnect}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg transition"
          >
            Connect
          </button>
        </div>

        {connected && (
          <p className="text-green-600 dark:text-green-400 text-sm">
            ✅ Connected to: <strong>{inputReceiverEmail}</strong>
          </p>
        )}

        {error && (
          <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
        )}
      </div>
    </div>
  );
};

export default ConnectionForm;
