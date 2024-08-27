import { useEffect, useState } from "react";
import WebApp from "@twa-dev/sdk";

const GamePage = () => {
  const [number, setNumber] = useState(null);
  const [message, setMessage] = useState(null);
  const [isGuessed, setIsGuessed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isRestart, setIsRestart] = useState(false);

  useEffect(() => {
    if (!WebApp) return;
    fetch("/api/start_game", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ initData: WebApp.initData, minNumber: 1, maxNumber: 20 }),
    });
  }, []);

  useEffect(() => {
    if (isRestart) {
      setMessage(null);
      setIsGuessed(false);
      setNumber("");
      setIsRestart(false);

      fetch("/api/start_game", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          initData: WebApp.initData,
          minNumber: 1,
          maxNumber: 20,
        }),
      });
    }
  }, [isRestart]);

  const handleGuess = () => {
    setLoading(true);
    fetch("/api/guess", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ initData: WebApp.initData, number }),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setMessage(data.message);
        setIsGuessed(data.isGuessed);
        setNumber("");
      });
  };

  return (
    <div className="box">
      <h1 className="title title--big">{isGuessed ? "You won!🎉" : "Game created!"}</h1>
      <p className="text">
        {isGuessed
          ? "Good job, my friend! You finally did it!"
          : "Guess the number between 1 and 20"}
      </p>
      <div className="input-box">
        <input
          type="text"
          inputMode="numeric"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          className="input"
        />
        <button onClick={handleGuess} className="button button--small button--guess">
          Guess
        </button>
      </div>
      {loading && <div>Loading...</div>}
      {message && !isGuessed && !loading && (
        <p className={`label label--false`}>{message}</p>
      )}
      {isGuessed && (
        <>
          <div className="label label--success">You guessed the number!</div>
          <button onClick={() => setIsRestart(true)} className="button">
            Play again
          </button>
        </>
      )}
    </div>
  );
};

export default GamePage;
