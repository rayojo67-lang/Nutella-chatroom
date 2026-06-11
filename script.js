const socket = io();

const messages = document.getElementById("messages");

socket.on("chat", (msg) => {
    const div = document.createElement("div");
    div.innerText = msg;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
});

function send() {
    const input = document.getElementById("input");

    if (input.value !== "") {
        socket.emit("chat", input.value);
        input.value = "";
    }
}
