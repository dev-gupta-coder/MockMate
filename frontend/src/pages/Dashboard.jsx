import { useEffect, useState } from "react";
import API from "../services/api";
import AnalyticsChart from "../components/AnalyticsChart";
import { useNavigate } from "react-router-dom";


export default function Dashboard(){
const navigate = useNavigate();
const [stats,setStats]=useState(null);

useEffect(()=>{

console.log("Dashboard mounted");

const fetchStats = async ()=>{

try{

console.log("Calling analytics API...");

const res = await API.get("/interview/analytics");

console.log("Response:",res.data);

setStats(res.data);

}catch(err){

console.log("Error:",err);

}

};

fetchStats();

},[]);


if(!stats) return <p>Loading.....</p>;

return(
<>
<div className="bg-neutral-800">
<h1 className="text-white px-4 py-2 gap-5">Dashboard</h1>
<div className="flex px px-4 py-2 gap-8"
 style={{padding:"40px"}}>
<button
className="flex justify-items-end rounded-4xl bg-blue-500 text-white px-4 py-2 hover:bg-blue-600 height-5xl px-4 py-2"
onClick={()=>navigate("/interview")}
style={{
marginTop:"20px",

height:"40px",
border:"none",
display:"flex",alignItems:"center",
gap:"5px"
}}
>
Start Interview
</button>


<div className="bg-green-400 rounded-xl shadow-lg  w-40 h-16 p-4 flex flex-col justify-center items-center text-white">
<p>Total Interviews: {stats.total}</p>

<p>Average Score: {stats.avgScore}</p>
</div>
<AnalyticsChart data={stats.interviews}/>  


</div>
</div>
 </>
//analytics chart component dekhna hai ❤️
);

}

// import { useNavigate } from "react-router-dom"; 

// export default function Dashboard(){

// const navigate = useNavigate();

// return(

// <div style={{padding:"40px"}}>

// <h1>Dashboard</h1>

// <p>Total Interviews: 0</p>
// <p>Average Score: 0</p>

// <button
// onClick={()=>navigate("/interview")}
// >
// Start Interview
// </button>

// </div>

// );

// }