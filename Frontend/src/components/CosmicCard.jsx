import React, { useRef, useState } from 'react'

const CosmicCard = ({ onFileSelect, children, className = "" }) => {
    const fileInputRef = useRef(null);
    const [dragActive, setDragActive] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

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

    return (
        <div
            className={`border border-pink-500/30 rounded-lg p-6 bg-[#1a0033]/80 shadow-lg transition ${dragActive ? 'ring-2 ring-pink-400' : ''} ${className}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <label className="block mb-2 text-pink-200 font-semibold">Select or Drop a File</label>
            <div className="flex items-center space-x-2">
                <select
                    className="bg-[#2d0a4b] text-white px-3 py-2 rounded border border-pink-400/40 focus:outline-none"
                    onChange={handleFileChange}
                    value=""
                >
                    <option value="" disabled>
                        Choose file from device...
                    </option>
                </select>
                <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                />
                <button
                    type="button"
                    className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white px-4 py-2 rounded font-semibold shadow hover:from-pink-600 hover:to-blue-600 transition-all duration-200"
                    onClick={() => fileInputRef.current && fileInputRef.current.click()}
                >
                    Browse
                </button>
            </div>
            {selectedFile && (
                <div className="mt-4 text-purple-200">
                    Selected file: <span className="font-semibold">{selectedFile.name}</span>
                </div>
            )}
            <div className="mt-4 text-purple-300 text-sm text-center">
                Or drag and drop your file here
            </div>
            {children}
        </div>
    );
};

export default CosmicCard;
