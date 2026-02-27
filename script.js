async function sendMessage(userMessage) {
  const response = await fetch("https://sweet-pine-f159.patryksobieranski5.workers.dev/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: userMessage })
  });

  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || "Brak odpowiedzi od AI.";
}
