let publicKey, privateKey;

// Generate RSA key pair
async function generateRSAKeys() {
  const keyPair = await crypto.subtle.generateKey(
    {
      name: "RSA-OAEP",
      modulusLength: 2048,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: "SHA-256"
    },
    true,
    ["encrypt", "decrypt"]
  );
  publicKey = keyPair.publicKey;
  privateKey = keyPair.privateKey;
  console.log("RSA keys generated ✅");
}

// Encrypt message
async function encryptMessage(message) {
  const encoded = new TextEncoder().encode(message);
  const ciphertext = await crypto.subtle.encrypt({ name: "RSA-OAEP" }, publicKey, encoded);
  return btoa(String.fromCharCode(...new Uint8Array(ciphertext)));
}

// Decrypt message
async function decryptMessage(ciphertextBase64) {
  const ciphertext = Uint8Array.from(atob(ciphertextBase64), c => c.charCodeAt(0));
  const decrypted = await crypto.subtle.decrypt({ name: "RSA-OAEP" }, privateKey, ciphertext);
  return new TextDecoder().decode(decrypted);
}

// Add chat message to UI
function addMessage(text, type) {
  const msgDiv = document.createElement("div");
  msgDiv.classList.add("message", type);
  msgDiv.textContent = text;
  document.getElementById("messages").appendChild(msgDiv);
  document.getElementById("messages").scrollTop = document.getElementById("messages").scrollHeight;
}

// Display encryption details
function showEncryptionDetails(plain, encrypted, decrypted) {
  document.getElementById("plainText").textContent = plain;
  document.getElementById("cipherText").textContent = encrypted;
  document.getElementById("decryptedText").textContent = decrypted;
}

// Handle send button
document.getElementById("sendBtn").addEventListener("click", async () => {
  const input = document.getElementById("messageInput");
  const message = input.value.trim();
  if (!message) return;

  // Add sent message
  addMessage(message, "sent");

  // Encrypt
  const encrypted = await encryptMessage(message);

  // Simulate send/receive delay
  setTimeout(async () => {
    const decrypted = await decryptMessage(encrypted);

    // Add received message
    addMessage(decrypted, "received");

    // Show encryption process
    showEncryptionDetails(message, encrypted, decrypted);
  }, 800);

  input.value = "";
});

// Initialize keys
generateRSAKeys();
