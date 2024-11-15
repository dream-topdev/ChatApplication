"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();
var messagesList = document.getElementById("messagesList");
var messageInput = document.getElementById("messageInput");
var usernameInput = document.getElementById("usernameInput");
var sendButton = document.getElementById("sendButton");

// Function to format messages consistently
function formatMessage(username, message, timestamp) {
    var time = new Date(timestamp).toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
    });
    return `${time} ${username}: ${message}`;
}

connection.on("ReceiveMessage", function (username, message, timestamp) {
    var div = document.createElement("div");
    div.classList.add("message");
    div.textContent = formatMessage(username, message, timestamp);
    messagesList.appendChild(div);
    messagesList.scrollTop = messagesList.scrollHeight;
});

// Handle Enter key in message input
messageInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        sendMessage();
    }
});

// Handle Send button click
sendButton.addEventListener("click", function (event) {
    event.preventDefault();
    sendMessage();
});

function sendMessage() {
    var username = usernameInput.value.trim();
    var message = messageInput.value.trim();
    
    if (!username) {
        alert("Please enter a username");
        usernameInput.focus();
        return;
    }
    
    if (!message) {
        return;
    }
    
    connection.invoke("SendMessage", username, message).catch(function (err) {
        return console.error(err.toString());
    });
    
    messageInput.value = "";
    messageInput.focus();
}

// Start the connection
connection.start()
    .then(function() {
        console.log("Connected to SignalR hub");
        // Scroll to bottom of messages list after connection
        messagesList.scrollTop = messagesList.scrollHeight;
    })
    .catch(function (err) {
        return console.error(err.toString());
    });

// Save username to localStorage
usernameInput.addEventListener("change", function() {
    localStorage.setItem("chatUsername", usernameInput.value);
});

// Load username from localStorage
window.addEventListener("load", function() {
    const savedUsername = localStorage.getItem("chatUsername");
    if (savedUsername) {
        usernameInput.value = savedUsername;
    }
}); 