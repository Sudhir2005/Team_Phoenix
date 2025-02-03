import React, { useState } from 'react';
import './LeaderboardPage.css';  // Add your CSS styling

const LeaderboardPage = () => {
  const leaders = [ // Sample leaderboard data
    { name: 'Alice', score: 150 },
    { name: 'Bob', score: 120 },
    { name: 'Charlie', score: 100 },
    { name: 'David', score: 180 },
    { name: 'Eve', score: 130 },
    { name: 'Frank', score: 110 },
    { name: 'Grace', score: 90 },
    { name: 'Heidi', score: 160 },
  ];

  const [sortedLeaders, setSortedLeaders] = useState(leaders);
  const [sortConfig, setSortConfig] = useState({ key: 'score', direction: 'descending' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Sorting function
  const sortLeaders = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }

    const sortedData = [...leaders].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'ascending' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'ascending' ? 1 : -1;
      return 0;
    });

    setSortedLeaders(sortedData);
    setSortConfig({ key, direction });
  };

  // Pagination logic
  const indexOfLastLeader = currentPage * itemsPerPage;
  const indexOfFirstLeader = indexOfLastLeader - itemsPerPage;
  const currentLeaders = sortedLeaders.slice(indexOfFirstLeader, indexOfLastLeader);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="leaderboard-container">
      <h1 className="leaderboard-title">Leaderboard</h1>
      
      <div className="controls">
        <button onClick={() => sortLeaders('name')}>Sort by Name</button>
        <button onClick={() => sortLeaders('score')}>Sort by Score</button>
      </div>

      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {currentLeaders.map((leader, index) => (
            <tr key={index} className="leader-row">
              <td>{leader.name}</td>
              <td>{leader.score}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={indexOfLastLeader >= leaders.length}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default LeaderboardPage;
