const WORKER_URL = "https://sweet-pine-f159.patryksobieranski5.workers.dev/";

async function sendMessage(chatHistory, systemPrompt) {
  const response = await fetch(WORKER_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chatHistory: chatHistory,
      systemPrompt: systemPrompt
    })
  });

  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || "Brak odpowiedzi od AI.";
}

const input = document.getElementById("userInput");
const sendButton = document.getElementById("sendBtn");
const chatBox = document.getElementById("chatWindow");

// Funkcja dodająca wiadomość do okna czatu
function addMessage(text, sender) {
  const msg = document.createElement("div");
  msg.className = sender === "user" ? "message-user p-4 rounded-l-lg rounded-br-lg max-w-[85%] shadow-sm self-end mb-4 ml-auto text-right" : "message-jp2 p-4 rounded-r-lg rounded-bl-lg max-w-[85%] shadow-sm self-start mb-4";
  
  const name = document.createElement("p");
  name.className = "text-xs font-bold mb-1 uppercase tracking-wider opacity-75";
  name.innerText = sender === "user" ? "Ty" : "Jan Paweł II";

  const content = document.createElement("p");
  content.className = "leading-relaxed";
  content.innerText = text;

  msg.appendChild(name);
  msg.appendChild(content);
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Obsługa kliknięcia przycisku "Wyślij"
sendButton.addEventListener("click", async () => {
  const userText = input.value.trim();
  if (!userText) return;

  addMessage(userText, "user");
  input.value = "";

  const reply = await sendMessage([{ role: "user", parts: [{ text: userText }] }], "Twój systemowy prompt tutaj");
  addMessage(reply, "jp2");
});
