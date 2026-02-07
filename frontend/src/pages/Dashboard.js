import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Matches from "../components/Matches";

function Dashboard() {
  const navigate = useNavigate();
  const [skillsOffered, setSkillsOffered] = useState("");
  const [skillsWanted, setSkillsWanted] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/");

    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.skillsOffered) {
      setSkillsOffered(user.skillsOffered.join(", "));
      setSkillsWanted(user.skillsWanted.join(", "));
    }
  }, [navigate]);

  const handleSaveSkills = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.put(
        "http://localhost:5000/api/user/skills",
        {
          skillsOffered: skillsOffered.split(",").map((s) => s.trim()),
          skillsWanted: skillsWanted.split(",").map((s) => s.trim()),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedUser = {
        ...JSON.parse(localStorage.getItem("user")),
        skillsOffered: res.data.skillsOffered,
        skillsWanted: res.data.skillsWanted,
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));
      setMessage("✅ Skills updated successfully");
    } catch {
      setMessage("❌ Failed to update skills");
    }
  };

  return (
    <div className="space-y-8">
      {/* 🔹 Skills Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 hover:shadow-md hover:scale-[1.01] transition-all duration-200">
        <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Your Skills
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Skills You Offer
            </label>
            <input
              className="w-full border rounded-lg p-3 mt-1 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none transition"
              value={skillsOffered}
              onChange={(e) => setSkillsOffered(e.target.value)}
              placeholder="React, HTML, CSS"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Skills You Want
            </label>
            <input
              className="w-full border rounded-lg p-3 mt-1 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none transition"
              value={skillsWanted}
              onChange={(e) => setSkillsWanted(e.target.value)}
              placeholder="DSA, Node, System Design"
            />
          </div>
        </div>

        <button
          onClick={handleSaveSkills}
          className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 active:scale-95 transition-all duration-200"
        >
          Save Skills
        </button>

        {message && (
          <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
            {message}
          </p>
        )}
      </div>

      {/* 🔹 Matches Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 hover:shadow-md hover:scale-[1.01] transition-all duration-200">
        <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Recommended Matches
        </h2>
        <Matches />
      </div>
    </div>
  );
}

export default Dashboard;
