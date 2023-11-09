import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const [lapTime, setLapTime] = useState<number[]>([]);

  useEffect(() => {
    let interval: number | undefined;

    if(isRunning){
      interval = setInterval(() => setTime(time + 1), 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, time]);

  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);

  const startAndResume = function(){
    setIsRunning(true);
  };

  const stop = function(){
    setIsRunning(false);
  };

  const reset = function(){
    setIsRunning(false);
    setTime(0);
    setLapTime([]);
  };

  const lap = function(){
    setLapTime([...lapTime, time]);
  };

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div>
        {minutes}:{seconds}
      </div>
      <div className="card">
        <div style={{display: 'flex'}}>
          {isRunning === false ? (
            <button onClick={() => startAndResume()}>
              Start/Resume
            </button>
          ) : (
            <button onClick={() => stop()}>
              Stop
            </button>
          )}
          <button onClick={() => reset()}>
            Reset
          </button>
          <button onClick={() => lap()}>
            Lap
          </button>
        </div>
        <ul>
          {lapTime.map((value, index) => (
            <li key={index}>{Math.floor(value / 60)}:{Math.floor(value % 60)}</li>
          ))}
        </ul>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
