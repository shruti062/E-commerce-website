function sendMessage(e){
e.preventDefault();

const name = document.getElementById("name").value;
const email = document.getElementById("email").value;
const message = document.getElementById("message").value;

// simple alert (frontend demo)
alert("Message Sent ✅\nThank you " + name);

// OPTIONAL: save in localStorage
let messages = JSON.parse(localStorage.getItem("messages")) || [];

messages.push({name,email,message,date:new Date()});

localStorage.setItem("messages", JSON.stringify(messages));

// reset form
e.target.reset();
}