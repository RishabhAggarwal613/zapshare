# ZapShare

ZapShare is a modern file transfer application that enables seamless, real-time transfer of small files between users using **socket.io**. The app features secure user registration and login, a responsive and cosmic-themed UI, and real-time progress indicators for file transfers.

## Features

- **User Registration & Login:** Secure authentication to access file transfer features.
- **Responsive UI/UX:** Modern, mobile-friendly interface for easy file selection and transfer.
- **File Upload & Selection:** Users can upload files from their local device and select recipients.
- **Real-Time File Transfer:** Uses socket.io for fast, reliable, and real-time file transmission.
- **Progress Indicators:** Visual feedback and status updates during file transfers.
- **Data Security:** Secure socket connections and encryption for safe file transfers.

## Tech Stack

- **Frontend:** React, TailwindCSS, socket.io-client
- **Backend:** Node.js, Express, MongoDB, socket.io

## Getting Started

### Prerequisites

- Node.js & npm
- MongoDB

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/zapshare.git
   cd zapshare
   ```

2. **Install backend dependencies:**
   ```bash
   cd Backend
   npm install
   ```

3. **Install frontend dependencies:**
   ```bash
   cd ../Frontend
   npm install
   ```

### Running the App

1. **Start MongoDB** (if not already running):
   ```
   mongod
   ```

2. **Start the backend server:**
   ```bash
   cd Backend
   node index.js
   ```

3. **Start the frontend dev server:**
   ```bash
   cd ../Frontend
   npm run dev
   ```

4. **Open your browser:**  
   Visit [http://localhost:5173](http://localhost:5173)

## Usage

- **Register** a new account or **login** with existing credentials.
- **Upload** a file using the drag-and-drop or file picker interface.
- **Select** a recipient and initiate the transfer.
- **Monitor** real-time progress and status updates during the transfer.

## Security

- All file transfers use **secure socket connections**.
- Data is **encrypted** during transmission for privacy and safety.

## Roadmap

- [ ] Add recipient selection and user presence via socket.io.
- [ ] Support for larger files with chunked transfer.
- [ ] Download history and transfer logs.
- [ ] Enhanced encryption and security features.

## License

MIT

