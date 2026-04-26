const chatBox = document.getElementById("chatBox");
const input = document.getElementById("userInput");

async function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  // show user message
  chatBox.innerHTML += `<div class="user-msg">${text}</div>`;
  input.value = "";

  // loading indicator
  const loading = document.createElement("div");
  loading.className = "bot-msg";
  loading.textContent = "Thinking...";
  chatBox.appendChild(loading);

  chatBox.scrollTop = chatBox.scrollHeight;

  // call backend - uses relative path for both local and production
  const res = await fetch("/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: text })
  });

  const data = await res.json();

  loading.remove();

  chatBox.innerHTML += `<div class="bot-msg">${data.reply}</div>`;
  chatBox.scrollTop = chatBox.scrollHeight;
}
function typeEffect(element, text) {
  let i = 0;
  element.textContent = "";
  const interval = setInterval(() => {
    element.textContent += text[i];
    i++;
    if (i >= text.length) clearInterval(interval);
  }, 20);
}