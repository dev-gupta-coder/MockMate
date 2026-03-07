// import { User } from "lucide-react";

// export default function Navbar() {
//   return (
//     <div style={{
//       height:"60px",
//       background:"#111827",
//       color:"white",
//       display:"flex",
//       justifyContent:"space-between",
//       alignItems:"center",
//       padding:"0 20px"
//     }}>
//       <h2>MockMate AI</h2>
//       <User />
//     </div>
//   );
// }


import { Link } from "react-router-dom";

export default function Navbar(){

const token = localStorage.getItem("token");

return(

<div style={{
display:"flex",
justifyContent:"space-between",
alignItems:"center",
padding:"15px",
background:"#1f2937",
color:"white"
}}>

<h2>MockMate AI</h2>

<div>

{!token ? (

<>
<Link to="/login" style={{marginRight:"15px",color:"white"}}>
Login
</Link>

<Link to="/register" style={{color:"white"}}>
Register
</Link>
</>

) : (

<button
onClick={()=>{
localStorage.removeItem("token");
window.location="/login";
}}
>
Logout
</button>

)}

</div>

</div>

);

}