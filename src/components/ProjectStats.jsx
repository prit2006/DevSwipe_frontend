// components/ProjectStats.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/const";
import { Link } from "react-router-dom";

function ProjectStats() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/project/stats/my`, {
        withCredentials: true,
      });
      setStats(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-2xl text-blue-400">Loading stats...</div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <p className="text-2xl text-gray-400">No statistics available</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-blue-400">📊 Project Statistics</h1>
        <Link
          to="/projects/my"
          className="px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition font-semibold"
        >
          View My Projects
        </Link>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg p-6 text-white">
          <div className="text-5xl mb-2">📂</div>
          <div className="text-4xl font-bold mb-2">{stats.totalProjects}</div>
          <div className="text-blue-100">Total Projects</div>
        </div>

        <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-lg p-6 text-white">
          <div className="text-5xl mb-2">🌍</div>
          <div className="text-4xl font-bold mb-2">{stats.publicProjects}</div>
          <div className="text-green-100">Public Projects</div>
        </div>

        <div className="bg-gradient-to-br from-gray-600 to-gray-800 rounded-lg p-6 text-white">
          <div className="text-5xl mb-2">🔒</div>
          <div className="text-4xl font-bold mb-2">{stats.privateProjects}</div>
          <div className="text-gray-100">Private Projects</div>
        </div>
      </div>

      {/* Tech Stack Statistics */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-blue-400 mb-6">
          🛠️ Most Used Technologies
        </h2>

        {stats.techStackStats && stats.techStackStats.length > 0 ? (
          <div className="space-y-4">
            {stats.techStackStats.map((tech, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-8 text-center font-bold text-blue-400">
                  #{index + 1}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white font-semibold text-lg">
                      {tech._id}
                    </span>
                    <span className="text-gray-400">
                      {tech.count} {tech.count === 1 ? "project" : "projects"}
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500"
                      style={{
                        width: `${
                          (tech.count / stats.techStackStats[0].count) * 100
                        }%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-center py-8">
            No technology data available. Add tech stacks to your projects!
          </p>
        )}
      </div>

      {/* Quick Actions */}
      <div className="mt-8 bg-gray-800 border border-gray-700 rounded-lg p-6">
        <h3 className="text-xl font-bold text-white mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-4">
          <Link
            to="/projects/create"
            className="px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            ➕ Create New Project
          </Link>
          <Link
            to="/projects/my"
            className="px-6 py-3 bg-green-600 rounded-lg hover:bg-green-700 transition font-semibold"
          >
            📂 View All Projects
          </Link>
          <Link
            to="/projects"
            className="px-6 py-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition font-semibold"
          >
            🌍 Browse Projects Feed
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProjectStats;