// import { useState } from "react";
// import { useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";

// import API from "../services/api";


// export default function Login(){
// const { login } = useContext(AuthContext);
// const navigate = useNavigate();

// const [email,setEmail]=useState("");
// const [password,setPassword]=useState("");

// const loginUser = async () => {

//   try{

//     const res = await API.post("/auth/login",{
//       email,
//       password
//     });

//     // localStorage.setItem("token",res.data.token);
//     login(res.data.token);
//     navigate("/");
    

//   }catch(error){

//     alert("Invalid credentials");

//   }

// };

// return(

// <div style={{
// display:"flex",
// justifyContent:"center",
// alignItems:"center",
// height:"100vh"
// }}>

// <div style={{
// width:"350px",
// padding:"30px",
// background:"#f3f4f6",
// borderRadius:"10px"
// }}>

// <h2>Login</h2>

// <input
// type="email"
// placeholder="Email"
// value={email}
// onChange={(e)=>setEmail(e.target.value)}
// style={{width:"100%",marginTop:"10px"}}
// />

// <input
// type="password"
// placeholder="Password"
// value={password}
// onChange={(e)=>setPassword(e.target.value)}
// style={{width:"100%",marginTop:"10px"}}
// />

// <button
// onClick={loginUser}
// style={{
// width:"100%",
// marginTop:"20px",
// padding:"10px",
// background:"#2563eb",
// color:"white",
// border:"none"
// }}
// >

// Login

// </button>

// </div>

// </div>

// );

// }


import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Login(){

const [email,setEmail] = useState("");
const [password,setPassword] = useState("");

const navigate = useNavigate();

const handleLogin = async () => {

try{

const res = await API.post("/auth/login",{
email,
password
});

localStorage.setItem("token",res.data.token);

navigate("/");

}catch(err){

alert("Login failed");

}

};

return(
<>

<div className="bg-neutral-950 text-white flex  flex-col  h-screen justify-center items-center">
<div className="bg-neutral-800 text-white  rounded-lg flex flex-col justifyContent-center alignItems-center"
 style={{padding:"10px"}}>

<h2 className="text-2xl font-bold mb-5">Login</h2>

{/* <h2>Login</h2> */}

<input type="email" className="bg-gray-900 px-2 rounded hover:bg-gray-700 border-none"
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>

<br/><br/>

<input className="bg-gray-900 px-2 rounded hover:bg-gray-700 "
type="password"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
/>

<br/><br/>

<button className="bg-green-600 px-2 rounded hover:bg-green-700 "
onClick={handleLogin}>
Login
</button>

</div>
</div>
</>
);

}