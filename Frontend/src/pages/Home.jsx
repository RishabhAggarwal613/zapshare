import React, { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

import Navbar from "../components/common/Navbar";
import FileUploader from "../components/file/FileUploader";
import ConnectionForm from "../components/ConnectionForm";
import FileTransfer from "../components/file/FileTransfer";
import TransferProgress from "../components/file/TransferProgress";
import SentFilesList from "../components/file/SentFilesList";
import IncomingFiles from "../components/file/IncomingFiles";
import SocketManager from "../hooks/SocketManager";

const Home = () => {
  const location = useLocation();
  const user = location.state?.user;

  const [receiverEmail, setReceiverEmail] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [transferProgress, setTransferProgress] = useState(0);
  const [sentFiles, setSentFiles] = useState([]);
  const [incomingFiles, setIncomingFiles] = useState([]);

  if (!user || !user.email) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-white">
      <SocketManager userEmail={user.email} />
      <Navbar user={user} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 animate-fade-in">
        {/* Header */}
        <header className="text-center">
          <h1 className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 to-pink-500 text-transparent bg-clip-text drop-shadow-md">
            Welcome to ZapShare ⚡
          </h1>
          <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
            Send and receive files in real-time — fast, simple, and secure.
          </p>
        </header>

        {/* Main Functional Sections */}
        <section className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Connection Form */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 flex flex-col justify-between space-y-4 hover:shadow-2xl transition duration-300">
            <h2 className="text-xl font-semibold">🔗 Connect to User</h2>
            <ConnectionForm senderEmail={user.email} setReceiverEmail={setReceiverEmail} />
          </div>

          {/* File Upload */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 flex flex-col justify-between space-y-4 hover:shadow-2xl transition duration-300">
            <h2 className="text-xl font-semibold">📤 Upload a File</h2>
            <FileUploader onFileSelect={setSelectedFile} />
          </div>

          {/* File Transfer */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 flex flex-col justify-between space-y-4 hover:shadow-2xl transition duration-300">
            <h2 className="text-xl font-semibold">🚀 Send File</h2>
            <FileTransfer
              senderEmail={user.email}
              receiverEmail={receiverEmail}
              selectedFile={selectedFile}
              setTransferProgress={setTransferProgress}
              setSentFiles={setSentFiles}
            />
            <TransferProgress progress={transferProgress} />
          </div>
        </section>

        {/* Sent and Received Files */}
        <section className="grid gap-8 md:grid-cols-2">
          {/* Sent Files */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 hover:shadow-2xl transition duration-300">
            <h2 className="text-xl font-semibold mb-2">📬 Sent Files</h2>
            <SentFilesList sentFiles={sentFiles} />
          </div>

          {/* Received Files */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 hover:shadow-2xl transition duration-300">
            <h2 className="text-xl font-semibold mb-2">📥 Received Files</h2>
            <IncomingFiles
              incomingFiles={incomingFiles}
              setIncomingFiles={setIncomingFiles}
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
