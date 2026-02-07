import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = process.env.REACT_APP_API_URL;

function Matches() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          `${API}/api/match`,   // ✅ production-safe
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setMatches(res.data);
      } catch {
        console.error("Failed to load matches");
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  if (loading)
    return (
      <p className="text-gray-500 dark:text-gray-400">
        Loading matches...
      </p>
    );

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
        Your Matches
      </h3>

      {matches.length === 0 && (
        <p className="text-gray-500 dark:text-gray-400">
          No matches yet. Update skills to get matches.
        </p>
      )}

      {matches.map((match) => (
        <div
          key={match.userId}
          className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700
                     rounded-xl p-4 shadow-sm hover:shadow-md hover:scale-[1.01]
                     transition-all duration-200"
        >
          <h4 className="font-semibold text-gray-900 dark:text-gray-100">
            {match.name}
          </h4>

          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            <strong>Match Score:</strong> {match.matchScore}
          </p>

          <p className="text-sm text-gray-600 dark:text-gray-400">
            <strong>Reason:</strong> {match.matchReason}
          </p>

          <button
            onClick={() => navigate(`/chat/${match.userId}`)}
            className="mt-3 bg-blue-600 text-white px-4 py-1.5 rounded-lg
                       hover:bg-blue-700 active:scale-95 transition"
          >
            Chat
          </button>
        </div>
      ))}
    </div>
  );
}

export default Matches;
