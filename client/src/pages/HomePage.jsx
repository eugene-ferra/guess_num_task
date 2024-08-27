import { useEffect, useState } from "react";
import WebApp from "@twa-dev/sdk";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [initData, setInitData] = useState(null);
  const [tgData, setTgData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (WebApp) {
      setInitData(WebApp.initData);
    }
  }, []);

  useEffect(() => {
    if (!initData) return;
    fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ initData }),
    })
      .then((res) => res.json())
      .then((data) => {
        setTgData(data.data);
        setLoading(false);
      });
  }, [initData]);

  return (
    <>
      {loading && <div>Loading...</div>}

      {!loading && !tgData && (
        <div className="box">
          <p className="error-block">oooops, something went wrong!💥💥💥</p>
        </div>
      )}

      {tgData && (
        <div className="box">
          <h1 className="title title--big">✨GUESS NUMBER APP✨</h1>
          <h2 className="title">Welcome, dear {tgData.first_name}</h2>
          <p className="text">Wanna play a game?</p>
          <Link to="/game" className="button">
            Start game
          </Link>
        </div>
      )}
    </>
  );
};

export default HomePage;
