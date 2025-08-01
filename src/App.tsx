import { useState } from 'react';

import { ChipList } from 'components/ChipList';
import { chips } from 'models/chips';

import './App.css';

const App = () => {
  const [selectedChipIds, setSelectedChipIds] = useState<number[]>([]);

  const handleSelect = (chipId: number) => {
    setSelectedChipIds((prevIds) => {
      if (prevIds.includes(chipId)) {
        return prevIds.filter((id) => id !== chipId);
      } else {
        return [...prevIds, chipId];
      }
    });
  };

  return (
    <ChipList
      chips={chips}
      selectedIds={selectedChipIds}
      onSelect={handleSelect}
    />
  );
};

export default App;
