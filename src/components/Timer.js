import { useState, useEffect, useRef } from "react";

function Timer () {
  const [isPaused, setIsPaused] = useState(true);
  const [secondsLeft, setSecondsLeft] = useState(60);
  
  const secondsLeftRef = useRef(secondsLeft);
  const isPausedRef = useRef(isPaused);
  const timerClassRef = useRef('timer');

  const minutes = Math.floor(secondsLeft / 60);
  let seconds = secondsLeft % 60;
  if (seconds < 10) {
    seconds = '0' + seconds;
  }

  function tick () {
    secondsLeftRef.current = secondsLeftRef.current - 1;
    setSecondsLeft(secondsLeftRef.current);
  }
  
  useEffect(() => {
    const timer = setInterval(() => {
      timerClassRef.current = 'timer';
      
        if (isPausedRef.current) {
          return;
        }
      
        if (secondsLeftRef.current === 0) {
          timerClassRef.current = `timer ${secondsLeftRef.current === 0 ? 'shake' : ''}`;
          setIsPaused(true);
          return;
        }

        tick();
    }, 1000)

    return () => clearInterval(timer);
  }, [isPaused]);

  return (
    <div className={timerClassRef.current}>
      <div className="nums">
        <span>{minutes}</span>
          <span>:</span>
        <span>{seconds}</span>
      </div>
      <div className="buttons">
          <button onClick={() => { setIsPaused(true); isPausedRef.current = true; }}>Stop</button>
          <button onClick={() => { setIsPaused(false); isPausedRef.current = false; }}>Start</button>
          <button onClick={() => { setSecondsLeft(0); secondsLeftRef.current = 0; }}>Reset</button>
      </div>
    </div>
  )
}

export default Timer;