import { useState } from "react";
import API from "../services/api";

export default function QuestionCard({ question, role }) {

  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const submitAnswer = async () => {

    try {

      setLoading(true);

      const res = await API.post("/interview/submit", {
        role,
        question,
        answer
      });

      setResult(res.data);

    } catch (error) {

      alert("Error submitting answer");

    } finally {

      setLoading(false);

    }

  };

  return (

    <div style={{
      background:"#f9fafb",
      padding:"20px",
      borderRadius:"10px",
      marginTop:"20px"
    }}>

      <h3>Interview Question</h3>

      <p>{question}</p>

      <textarea
        rows="6"
        placeholder="Write your answer here..."
        value={answer}
        onChange={(e)=>setAnswer(e.target.value)}
        style={{width:"100%",marginTop:"10px"}}
      />

      <button
        onClick={submitAnswer}
        style={{
          marginTop:"10px",
          padding:"10px",
          background:"#2563eb",
          color:"white",
          border:"none",
          borderRadius:"5px"
        }}
      >
        {loading ? "Submitting..." : "Submit Answer"}
      </button>

      {result && (

        <div style={{marginTop:"20px"}}>

          <h4>Score: {result.score}/10</h4>

          <p>{result.feedback}</p>

        </div>

      )}

    </div>

  );

}