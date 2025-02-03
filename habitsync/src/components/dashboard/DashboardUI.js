import React from "react";
import { ProgressBar } from "../shared/ProgressBar"; // Reusable component from shared folder

const DashboardUI = () => {
  return (
    <div className="flex h-screen w-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <aside className="w-1/4 bg-gray-800 p-4 flex flex-col space-y-4">
        <h1 className="text-2xl font-bold text-green-400">duolingo</h1>
        <nav className="flex flex-col space-y-3">
          <button className="flex items-center space-x-2 text-white hover:bg-gray-700 p-2 rounded-md">
            <span className="material-icons">home</span>
            <span>Learn</span>
          </button>
          <button className="flex items-center space-x-2 text-white hover:bg-gray-700 p-2 rounded-md">
            <span className="material-icons">audiotrack</span>
            <span>Sounds</span>
          </button>
          <button className="flex items-center space-x-2 text-white hover:bg-gray-700 p-2 rounded-md">
            <span className="material-icons">leaderboard</span>
            <span>Leaderboards</span>
          </button>
          <button className="flex items-center space-x-2 text-white hover:bg-gray-700 p-2 rounded-md">
            <span className="material-icons">flag</span>
            <span>Challenges</span>
          </button>
          <button className="flex items-center space-x-2 text-white hover:bg-gray-700 p-2 rounded-md">
            <span className="material-icons">shopping_cart</span>
            <span>Shop</span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Section 1, Unit 1</h2>
          <button className="bg-green-400 text-black py-2 px-4 rounded-md">Guide</button>
        </div>
        <div className="bg-gray-800 p-6 rounded-md">
          <h3 className="text-lg font-semibold mb-4">Serve and accept drinks</h3>
          <button className="w-full py-4 bg-green-500 text-black rounded-md hover:bg-green-400">
            Get Started
          </button>
        </div>
        <div className="mt-10 flex flex-col items-center space-y-4">
          <ProgressBar progress={50} className="w-1/2" />
          <div className="flex space-x-4">
            <div className="w-16 h-16 bg-gray-700 rounded-full"></div>
            <div className="w-16 h-16 bg-gray-700 rounded-full"></div>
            <div className="w-16 h-16 bg-gray-700 rounded-full"></div>
          </div>
        </div>
      </main>

      {/* Right Panel */}
      <aside className="w-1/4 bg-gray-800 p-4">
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Daily Challenge</h3>
          <p>Earn 10 points</p>
          <ProgressBar progress={0} className="w-full" />
        </div>
        <button className="w-full bg-green-500 text-black py-2 rounded-md hover:bg-green-400">
          Create a Profile
        </button>
        <button className="w-full bg-blue-500 text-white py-2 mt-2 rounded-md hover:bg-blue-400">
          Register
        </button>
      </aside>
    </div>
  );
};

export default DashboardUI;
