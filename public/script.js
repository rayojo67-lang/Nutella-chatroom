const socket = io();

const messages = document.getElementById("messages");
const input = document.getElementById("input");

socket.on("chat", (msg) => {
  const div = document.createElement("div");
  div.textContent = msg;
  messages.appendChild(div);
});

function send() {
  const text = input.value.trim();
  if (!text) return;

  socket.emit("chat", text);
  input.value = "";
}

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    send();
  }
});
