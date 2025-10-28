// Simple RSA Chat (client-only demo)

let publicKey, privateKey;

async function generateRSAKeys() {
  const keyPair = await window.crypto.subtle.generateKey(
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
}

async function encryptMessage(message, key = publicKey) {
  const enc = new TextEncoder().encode(message);
  const encrypted = await crypto.subtle.encrypt({ name: "RSA-OAEP" }, key, enc);
  return btoa(String.fromCharCode(...new Uint8Array(encrypted)));
}

async function decryptMessage(encryptedBase64) {
  const encrypted = Uint8Array.from(atob(encryptedBase64), c => c.charCodeAt(0));
  const decrypted = await crypto.subtle.decrypt({ name: "RSA-OAEP" }, privateKey, encrypted);
  return new TextDecoder().decode(decrypted);
}

function addMessage(text, type) {
  const msgDiv = document.createElement("div");
  msgDiv.classList.add("message", type);
  msgDiv.textContent = text;
  document.getElementById("messages").appendChild(msgDiv);
  document.getElementById("messages").scrollTop = document.getElementById("messages").scrollHeight;
}

document.getElementById("sendBtn").addEventListener("click", async () => {
  const input = document.getElementById("messageInput");
  const message = input.value.trim();
  if (!message) return;

  addMessage(message, "sent");

  const encrypted = await encryptMessage(message);
  console.log("Encrypted:", encrypted);

  // Simulate receiving an encrypted message after delay
  setTimeout(async () => {
    const decrypted = await decryptMessage(encrypted);
    addMessage(decrypted, "received");
  }, 800);

  input.value = "";
});

generateRSAKeys();
