# ZapShare

ZapShare is a modern file transfer application that enables seamless, real-time transfer of small files between users using **socket.io**. The app features secure user registration and login, a responsive and cosmic-themed UI, and real-time progress indicators for file transfers.

---

## 🌟 Preview

### 🔐 Sign In Page
![Sign In](./assets/signin.png)

### 🔑 Login Page
![Login](./assets/login.png)

### 🏠 Home / File Transfer Page
![Home](./assets/home.png)

---

## ✨ Features

- ✅ **User Registration & Login** — Secure access control
- ⚡ **Real-Time File Transfer** using Socket.IO
- 🧾 **Progress Indicators** for feedback on transfer status
- 🎨 **Responsive UI** with cosmic-themed styling
- 🔐 **Secure Transfers** using encrypted socket communication

---

## 🔧 Tech Stack

- **Frontend**: React, TailwindCSS, socket.io-client  
- **Backend**: Node.js, Express.js, MongoDB, socket.io  

---

## 🚀 Getting Started

### 🔎 Prerequisites

- Node.js & npm
- MongoDB

### 🛠 Installation

```bash
git clone https://github.com/yourusername/zapshare.git
cd zapshare
```

#### 🔽 Install backend dependencies
```bash
cd Backend
npm install
```

#### 🔽 Install frontend dependencies
```bash
cd ../Frontend
npm install
```

---

## ▶️ Running the App

### 1. Start MongoDB
```bash
mongod
```

### 2. Start backend server
```bash
cd Backend
node index.js
```

### 3. Start frontend dev server
```bash
cd ../Frontend
npm run dev
```

### 4. Open in browser
Visit [http://localhost:5173](http://localhost:5173)

---

## 🎯 Usage

1. **Register** with your email and password
2. **Log in** to your account
3. **Upload** file and select a recipient
4. **Send** file and watch real-time progress
5. **Receive** and download shared files

---

## 🔒 Security

- Secure socket connections using Socket.IO
- File data is encrypted during transmission

---

## 🛣 Roadmap

- [ ] User presence indicator (Online/Offline)
- [ ] Chunked file transfer for large files
- [ ] Transfer history & file logs
- [ ] End-to-end encryption support

---

## 📄 License

MIT