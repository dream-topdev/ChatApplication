"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();
var messagesList = document.getElementById("messagesList");
var messageInput = document.getElementById("messageInput");
var usernameInput = document.getElementById("usernameInput");
var sendButton = document.getElementById("sendButton");

connection.on("ReceiveMessage", function (username, message, timestamp) {
    var div = document.createElement("div");
    div.classList.add("message");
    var time = new Date(timestamp).toLocaleTimeString();
    div.textContent = `${time} ${username}: ${message}`;
    messagesList.appendChild(div);
    messagesList.scrollTop = messagesList.scrollHeight;
});

sendButton.addEventListener("click", function (event) {
    var username = usernameInput.value;
    var message = messageInput.value;
    
    if (username && message) {
        connection.invoke("SendMessage", username, message).catch(function (err) {
            return console.error(err.toString());
        });
        messageInput.value = "";
    }
    event.preventDefault();
});

connection.start().catch(function (err) {
    return console.error(err.toString());
}); 