import React from 'react';

const TransferProgress = ({ progress }) => {
    return (
        <div className="w-full max-w-md mx-auto mt-4">
            <div className="h-3 bg-gray-200 rounded overflow-hidden">
                <div
                    className="h-full bg-gradient-to-r from-pink-500 to-purple-500 transition-all"
                    style={{ width: `${progress}%` }}
                />
            </div>
            <p className="text-white text-sm mt-2 text-center">{progress}%</p>
        </div>
    );
};

export default TransferProgress;
