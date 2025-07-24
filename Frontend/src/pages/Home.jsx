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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-white">
      <SocketManager userEmail={user.email} />
      <Navbar user={user} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 animate-fade-in">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 to-pink-500 text-transparent bg-clip-text">
            Welcome to ZapShare ⚡
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Secure and instant file sharing in real-time.
          </p>
        </div>

        {/* Connect */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-md hover:shadow-lg transition-all p-8">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            🔗 Connect to a User
          </h2>
          <ConnectionForm
            senderEmail={user.email}
            setReceiverEmail={setReceiverEmail}
          />
        </div>

        {/* Upload */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-md hover:shadow-lg transition-all p-8">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            📤 Upload a File
          </h2>
          <FileUploader onFileSelect={setSelectedFile} />
        </div>

        {/* Transfer */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-md hover:shadow-lg transition-all p-8">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            🚀 Send File
          </h2>
          <FileTransfer
            senderEmail={user.email}
            receiverEmail={receiverEmail}
            selectedFile={selectedFile}
            setTransferProgress={setTransferProgress}
            setSentFiles={setSentFiles}
          />
          <TransferProgress progress={transferProgress} />
        </div>

        {/* Sent Files */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-md hover:shadow-lg transition-all p-8">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            📬 Sent Files
          </h2>
          <SentFilesList sentFiles={sentFiles} />
        </div>

        {/* Received Files */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-md hover:shadow-lg transition-all p-8">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            📥 Received Files
          </h2>
          <IncomingFiles
            incomingFiles={incomingFiles}
            setIncomingFiles={setIncomingFiles}
          />
        </div>
      </main>
    </div>
  );
};

export default Home;
