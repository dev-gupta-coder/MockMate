import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {

  const navigate = useNavigate();

  const [stats, setStats] = useState({
    total: 0,
    avgScore: 0
  });

  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 Fetch analytics
  useEffect(() => {

    const fetchStats = async () => {
      try {

        const res = await API.get("/interview/analytics");

        setStats({
          total: res.data.totalInterviews,
          avgScore: res.data.averageScore
        });

        setHistory(res.data.interviews || []);

      } catch (err) {
        console.log("Error fetching analytics:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();

  }, []);

  // 🔄 Loading UI
  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center bg-slate-900">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-slate-600 border-t-blue-500 rounded-full animate-spin mx-auto"></div>
          <p className="mt-3 text-white">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="flex gap-8">

        {/* LEFT SIDE */}
        <div className="w-1/2 space-y-6">

          <button
            onClick={() => navigate("/interview")}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-4 rounded-xl shadow-md transition"
          >
            🚀 Start Interview
          </button>

          <div className="bg-green-500 rounded-xl shadow-lg p-4 text-white w-60">
            <p className="text-lg">Total Interviews: {stats.total}</p>
            <p className="text-lg">Average Score: {stats.avgScore}</p>
          </div>

        </div>

        {/* RIGHT SIDE (HISTORY) */}
        <div className="w-1/2 bg-white p-5 rounded-xl shadow-md">

          <h2 className="text-xl font-semibold mb-4">📜 Interview History</h2>

          {history.length === 0 ? (
            <p className="text-gray-500">No interviews yet</p>
          ) : (
            <div className="space-y-3 max-h-[400px] overflow-y-auto">

              {history.map((item, index) => (
                <div
                  key={index}
                  className="border p-3 rounded-lg hover:shadow-md transition"
                >
                  <p className="font-semibold">Role: {item.role}</p>

                  <p className={`text-sm ${
                    item.score >= 7 ? "text-green-600" : "text-red-500"
                  }`}>
                    Score: {item.score}/10
                  </p>

                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                    Q: {item.question}
                  </p>
                </div>
              ))}

            </div>
          )}

        </div>

      </div>

    </div>
  );
}