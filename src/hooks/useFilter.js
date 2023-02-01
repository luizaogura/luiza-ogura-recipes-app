import { useState } from 'react';

function useFilter(param) {
  const [filtered, setFiltered] = useState(false);
  setFiltered(param);
  return {
    filtered, setFiltered,
  };
}

export default useFilter;
