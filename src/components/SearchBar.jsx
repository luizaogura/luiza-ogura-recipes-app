import React, { useEffect } from 'react';

function SearchBar() {
  useEffect(() => {
  }, []);

  return (
    <input
      type="text"
      data-testid="search-input"
    />
  );
}

export default SearchBar;
