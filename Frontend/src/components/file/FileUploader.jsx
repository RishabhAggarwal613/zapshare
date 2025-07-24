import React, { useRef, useState } from 'react';

const FileUploader = ({ onFileSelect }) => {
    const [dragActive, setDragActive] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null);

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setSelectedFile(e.dataTransfer.files[0]);
            onFileSelect && onFileSelect(e.dataTransfer.files[0]);
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
            onFileSelect && onFileSelect(e.target.files[0]);
        }
    };

    const handleBrowseClick = () => {
        fileInputRef.current && fileInputRef.current.click();
    };

    return (
        <div
            className={`w-full max-w-md mx-auto border-2 border-dashed rounded-lg p-6 bg-[#1a0033]/80 shadow-lg transition-colors duration-200
                ${dragActive ? 'border-pink-400 bg-[#2d0a4b]/80' : 'border-pink-500/30'}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <div className="flex flex-col items-center space-y-4">
                <div className="w-full flex flex-col items-center">
                    <button
                        type="button"
                        className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white px-4 py-2 rounded font-semibold shadow hover:from-pink-600 hover:to-blue-600 transition-all duration-200 mb-2"
                        onClick={handleBrowseClick}
                    >
                        Choose File
                    </button>
                    <input
                        ref={fileInputRef}
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                    <span className="text-purple-200 text-sm">or drag and drop here</span>
                </div>
                <div className="w-full mt-2">
                    {selectedFile ? (
                        <div className="text-pink-200 text-center">
                            Selected file: <span className="font-semibold">{selectedFile.name}</span>
                        </div>
                    ) : (
                        <div className="text-purple-400 text-center">No file selected</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FileUploader;
