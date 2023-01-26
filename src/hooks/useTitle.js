import { useState } from 'react';

function useTitle(initialTitle) {
  const [title, setTitle] = useState(initialTitle);
  document.title = title;
  return setTitle;
}
