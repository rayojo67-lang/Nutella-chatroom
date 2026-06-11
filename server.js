// Connect to the server
const socket = io();

// Get page elements
const messages = document.getElementById("messages");
const input = document.getElementById("input");

// Receive messages
socket.on("chat", (msg) => {
    const message = document.createElement("div");
    message.textContent = msg;

    messages.appendChild(message);

    // Scroll to the newest message
    messages.scrollTop = messages.scrollHeight;
});

// Send a message
function send() {
    const text = input.value.trim();

    if (text === "") return;

    socket.emit("chat", text);

    input.value = "";
    input.focus();
}

// Allow Enter key to send messages
input.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        send();
    }
});

// Show connection status in the console
socket.on("connect", () => {
    console.log("Connected to server!");
});

socket.on("disconnect", () => {
    console.log("Disconnected from server.");
});
