import { useState } from 'react';

export function useFilter() {
  const [filter, setFilter] = useState('');

  return { filter, setFilter };
}