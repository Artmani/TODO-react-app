import React, {useState} from 'react';

function App() {
  const [likes, setlikes] = useState(0)
  function increment() {
    setlikes(likes + 1);
  }

  function decrement() {
    setlikes(likes - 1);
  }

  return (
      <div className="App">
        <h1>{likes}</h1>
        <button onClick={increment}>increment</button>
        <button onClick={decrement}>decrement</button>
      </div>
  );
}

export default App;
