import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Matches() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:5000/api/match",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setMatches(res.data);
      } catch (err) {
        console.error("Failed to load matches");
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  if (loading) return <p>Loading matches...</p>;

  return (
    <div>
      <h3>Your Matches</h3>

      {matches.length === 0 && (
        <p>No matches yet. Update skills to get matches.</p>
      )}

      {matches.map((match) => (
        <div
          key={match.userId}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "5px",
          }}
        >
          <h4>{match.name}</h4>
          <p><strong>Match Score:</strong> {match.matchScore}</p>
          <p><strong>Reason:</strong> {match.matchReason}</p>

          <button onClick={() => navigate(`/chat/${match.userId}`)}>
            Chat
          </button>
        </div>
      ))}
    </div>
  );
}

export default Matches;
