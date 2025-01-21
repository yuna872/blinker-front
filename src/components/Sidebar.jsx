import React from 'react';

const Sidebar = ({ signals }) => {
  return (
    <aside>
      <h2>신호기 목록</h2>
      <ul>
        {signals.map((signal) => (
          <li key={signal.id}>{signal.name}</li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;