import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div style={{
      width:"220px",
      background:"#1f2937",
      color:"white",
      height:"100vh",
      padding:"20px"
    }}>
      <h3>Menu</h3>

      <div style={{marginTop:"20px"}}>
        <Link to="/" style={{display:"block",marginBottom:"10px"}}>Dashboard</Link>
        <Link to="/interview">Start Interview</Link>
      </div>
    </div>
  );
}