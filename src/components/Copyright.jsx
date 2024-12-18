import React from 'react';

const Copyright = ({ owner, year }) => {
  const currentYear = year || new Date().getFullYear();

  return (
    <footer className="text-center py-3 bg-light">
      <p className="mb-0">
        &copy; {currentYear} {owner}
      </p>
    </footer>
  );
};

export default Copyright;
