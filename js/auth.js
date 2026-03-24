const API = "http://localhost:3000";

function login(){

const email = document.getElementById("email").value;
const password = document.getElementById("password").value;

fetch(API + "/users/login",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
email,
password
})

})
.then(res=>res.json())
.then(data=>{

if(data.user){

localStorage.setItem("user",JSON.stringify(data.user));

alert("Login successful");

window.location="index.html";

}else{

alert("Invalid email or password");

}

});

}