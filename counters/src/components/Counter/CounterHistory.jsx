import { useState } from 'react';

import { log } from '../../log.js';

function HistoryItem({ count }) {
  log('<HistoryItem /> rendered', 3);

  const [selected, setSelected] = useState(false);

  function handleClick() {
    setSelected((prevSelected) => !prevSelected);
  }

  return (
    <li onClick={handleClick} className={selected ? 'selected' : undefined}>
      {count}
    </li>
  );
}

export default function CounterHistory({ history }) {
  log('<CounterHistory /> rendered', 2);

  return (
    <ol>
      {history.map((count, index) => (
        <HistoryItem key={Math.random() * 1000} count={count} />
        // we can add the unique key in many ways
        // I did this as I believe this is the simplest way to do it
        // since all we need to do is to make the key value unique 
        // with no pattern, just solely UNIQUE
      ))}
    </ol>
  );
}
