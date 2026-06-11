// Connect to server
const socket = io();

// Get elements
const messages = document.getElementById("messages");
const input = document.getElementById("message-input");

/* =========================
   LOAD OLD MESSAGES
========================= */
socket.on("loadMessages", (msgs) => {
    msgs.forEach((m) => {
        addMessage(m.user, m.text);
    });
});

/* =========================
   RECEIVE NEW MESSAGE
========================= */
socket.on("chat", (data) => {
    addMessage(data.user, data.text);
});

/* =========================
   SEND MESSAGE
========================= */
function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    socket.emit("chat", text);

    input.value = "";
    input.focus();
}

/* =========================
   DISPLAY MESSAGE
========================= */
function addMessage(user, text) {
    const div = document.createElement("div");
    div.className = "flex items-start gap-4";

    div.innerHTML = `
        <div class="w-10 h-10 rounded-full bg-green-800 flex items-center justify-center font-bold text-green-300">
            ${user ? user[0] : "U"}
        </div>

        <div>
            <span class="font-bold text-green-400">${user}</span>
            <p class="text-white">${text}</p>
        </div>
    `;

    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
}

/* =========================
   ENTER KEY SUPPORT
========================= */
input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        sendMessage();
    }
});
