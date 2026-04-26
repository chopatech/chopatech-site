const chatContainer = document.getElementById("chatContainer");
const chatBox = document.getElementById("chatBox");
const input = document.getElementById("userInput");

// Toggle chat
function toggleChat() {
  chatContainer.classList.toggle("show");
}

// Send message
function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  // User message
  const userMsg = document.createElement("div");
  userMsg.className = "user-msg";
  userMsg.textContent = text;
  chatBox.appendChild(userMsg);

  input.value = "";

  // Auto AI response
  setTimeout(() => {
    const botMsg = document.createElement("div");
    botMsg.className = "bot-msg";

    botMsg.textContent = generateAIResponse(text);
    chatBox.appendChild(botMsg);

    chatBox.scrollTop = chatBox.scrollHeight;
  }, 800);
}

// Fake AI logic (replace later with OpenAI API)
function generateAIResponse(input) {
  input = input.toLowerCase();

  if (input.includes("hello")) {
    return "Hello! How can I assist you today?";
  }

  if (input.includes("chopatech")) {
    return "ChopaTech is a futuristic AI & digital innovation company.";
  }

  if (input.includes("services")) {
    return "We offer AI development, web design, and networking systems.";
  }

  return "I'm analyzing your request... please connect me to a real AI API for advanced responses.";
}