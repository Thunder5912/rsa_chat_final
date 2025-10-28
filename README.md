# 🔐 RSA Chat (Telegram-Style Web App)

A simple **RSA-encrypted chat web app** built using **HTML, CSS, and JavaScript**, designed with a **Telegram-like UI**.  
This demo showcases how RSA encryption and decryption work in real time using the browser’s **Web Crypto API**.

---
Live Demo: https://rsa-chat-final.vercel.app
## 🚀 Features

- 🗝️ RSA key pair generation (2048-bit)
- ✉️ Encrypt and decrypt messages locally in the browser
- 💬 Telegram-inspired chat interface
- 🔍 Displays plaintext, encrypted (Base64), and decrypted messages
- 💻 100% client-side (no backend required)

---

## 🧩 File Structure

rsa-chat/
│
├── index.html # Chat UI and structure
├── style.css # Telegram-style design
└── script.js # RSA logic and message handling



---

## ⚙️ Setup and Run Locally

1. Clone this repo or download the ZIP:
   ```bash
   git clone https://github.com/<yourusername>/rsa-chat-final.git
   cd rsa-chat-final
Open index.html in your browser.

Type a message and click Send — you’ll see:

The original plaintext

The encrypted message (Base64)

The decrypted message

🌍 Deploy to Vercel
You can deploy this static web app for free using Vercel.

Steps:
Push your project to GitHub:

bash
Copy code
git init
git add .
git commit -m "Initial commit - RSA Chat"
git branch -M main
git remote add origin https://github.com/<yourusername>/rsa-chat-final.git
git push -u origin main
Go to Vercel, sign in, and click “New Project”.

Import your rsa-chat-final repository.

For the build settings:

Framework Preset: None

Root Directory: .

Output Directory: .

Build Command: none

Click Deploy 🎉

Once deployed, you’ll get a live URL like
👉 https://rsa-chat-final.vercel.app

🧠 How It Works
The browser generates a 2048-bit RSA key pair using:

js
Copy code
crypto.subtle.generateKey({ name: "RSA-OAEP", modulusLength: 2048, hash: "SHA-256" }, true, ["encrypt", "decrypt"]);
Messages are encrypted using:

js
Copy code
crypto.subtle.encrypt({ name: "RSA-OAEP" }, publicKey, encodedMessage);
And decrypted with:

js
Copy code
crypto.subtle.decrypt({ name: "RSA-OAEP" }, privateKey, encryptedMessage);
Everything happens locally — your messages never leave your browser.

🧩 Future Improvements
🔁 Two-user (Alice ↔ Bob) encryption using separate public keys

🌐 Real-time messaging via WebSocket or WebRTC

📱 Mobile-friendly responsive layout

🔒 Persist RSA keys securely with IndexedDB

Author: Your Name
Live Demo: https://rsa-chat-final.vercel.app
