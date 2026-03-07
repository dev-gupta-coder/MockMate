import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";


export default function Interview(){
const navigate = useNavigate();
const [role,setRole]=useState("");
const [question,setQuestion]=useState("");
const [answer,setAnswer]=useState("");
const [result,setResult]=useState(null);

const generateQuestion = async () =>{

const res = await API.post("/interview/generate",{role});
setQuestion(res.data.question);

};

const submitAnswer = async () =>{

const res = await API.post("/interview/submit",{
role,
question,
answer
});

setResult(res.data);

};

return(
< div className="flex flex-col items-center bg-neutral-900 text-white px-2 py-4 gap-8">
<div className="flex flex-col items-center bg-neutral-800 text-white px-2 py-4 gap-5 rounded-lg" 
style={{padding:"40px"}}>

<h2 className="mb-10 font-bold">AI Mock Interview</h2>
<div className="flex gap-4">
<select className=" bg-gray-500 text-white px-4 py-2 rounded"
value={role}
onChange={(e)=>setRole(e.target.value)}
>

<option>Select Role</option>
<option>Frontend Developer</option>
<option>Backend Developer</option>
<option>Full Stack Developer</option>

</select>

<button className="bg-gray-500  text-white px-4 py-2 rounded"
 onClick={generateQuestion}>
Generate Question
</button>
</div>
{question && (
<div className="gap-">

<h3>Question-:</h3>
<p className=" text-white min-w-max rounded my-2  bg-red-600">{question}</p>

<textarea className="bg-green-500 border-none rounded corner-none w-100 p-2 text-black" 
placeholder="Write your answer..."
value={answer}
onChange={(e)=>setAnswer(e.target.value)}
/>



</div>

)}
<button className="bg-gray-500 rounded px-4 py-2"
 onClick={submitAnswer}>
Submit Answer
</button>
{result && (
<div>

<h3>Score: {result.score}</h3>

<p>{result.feedback}</p>

</div>
)}
<button className="flex bg-gray-500 rounded "
onClick={()=>navigate("/")}
style={{
marginBottom:"20px",
padding:"8px"
}}
>
⬅ Back to Dashboard
</button>
</div>
</div>
);

}