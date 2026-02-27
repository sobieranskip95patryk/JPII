const input = document.getElementById("user-input");
const sendButton = document.getElementById("send-btn");
const chatBox = document.getElementById("chat-box");

// 🔗 Twój prawdziwy adres Workera
const WORKER_URL = "https://sweet-pine-f159.patryksobieranski5.workers.dev";

function addMessage(text, sender) {
  const msg = document.createElement("div");
  msg.className = sender === "user" ? "user-message" : "bot-message";
  msg.textContent = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

async function sendMessage(userMessage) {
  try {
    console.log("Wysyłane dane:", { message: userMessage });
    const response = await fetch(WORKER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMessage }),
    });

    if (!response.ok) {
      throw new Error(`Błąd serwera: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Otrzymana odpowiedź:", data);
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "Brak odpowiedzi od AI.";
  } catch (err) {
    console.error("Błąd:", err);
    return "Błąd połączenia z serwerem lub nieprawidłowa odpowiedź.";
  }
}

sendButton.addEventListener("click", async () => {
  const userText = input.value.trim();
  if (!userText) return;

  addMessage(userText, "user");
  input.value = "";

  const reply = await sendMessage(userText);
  addMessage(reply, "bot");
});
