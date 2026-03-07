import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Register(){

const navigate = useNavigate();

const [name,setName]=useState("");
const [email,setEmail]=useState("");
const [password,setPassword]=useState("");

const registerUser = async () => {

try{

await API.post("/auth/register",{
name,
email,
password
});

alert("Account created successfully");

navigate("/login");

}catch(error){

alert("Registration failed");

}

};

return(

<div style={{
display:"flex",
justifyContent:"center",
alignItems:"center",
height:"100vh"
}}>

<div style={{
width:"350px",
padding:"30px",
background:"#f3f4f6",
borderRadius:"10px"
}}>

<h2>Register</h2>

<input
placeholder="Name"
value={name}
onChange={(e)=>setName(e.target.value)}
style={{width:"100%",marginTop:"10px"}}
/>

<input
type="email"
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
style={{width:"100%",marginTop:"10px"}}
/>

<input
type="password"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
style={{width:"100%",marginTop:"10px"}}
/>

<button
onClick={registerUser}
style={{
width:"100%",
marginTop:"20px",
padding:"10px",
background:"#16a34a",
color:"white",
border:"none"
}}
>

Register

</button>

</div>

</div>

);

}