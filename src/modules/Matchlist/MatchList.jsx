import "../../css/Matchinglist.css";
import React, { useContext } from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { OddContext } from "../../context/oddContext";

function MatchList() {
  const [views, setView] = useState([]);
  const [loading, setLoading] = useState(false);
  const [awayDetails, setAwayDetails] = useState([]);
  const { setData } = useContext(OddContext);

  const handleshowvalue = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://api.the-odds-api.com/v4/sports/soccer_epl/odds?apiKey=a3dfc1b147e485f0d7f7302a472c6af4&regions=us"
      );
      if (response.data) {
        setView(
          response.data.map((view) => {
            return {
              ...view,
              bookmarker: view.bookmakers.filter((k) => k.key === "fanduel")[0],
            };
          })
        );
      }
    } catch (error) {
      console.error("this is the error", error);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   handleshowvalue();
  // }, []);

  const handleAway = (e) => {
    let collective_selections = [...awayDetails];
    const existingIndex = collective_selections.findIndex(
      (item) => item.event_id === e.event_id && item.selected === e.selected
    );
    if (existingIndex >= 0) {
      collective_selections.splice(existingIndex, 1);
    } else {
      collective_selections.unshift(e);
    }
    setAwayDetails(collective_selections);
    setData(collective_selections);
    localStorage.setItem("games", JSON.stringify(awayDetails));
  };

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="casing">
          {views.map((view, index) => (
            <tr key={index}>
              <td className="frame">
                <h4>Markets:</h4>
                {view.bookmarker.markets.map((market, marketIndex) => (
                  <td className="listBox" key={marketIndex}>
                    <td className="market">
                      <td>{market.outcomes[0].name}</td>
                      {/* <p>{market.outcomes[2].name}</p> */}
                      <td>{market.outcomes[1].name}</td>
                    </td>
                    <td className="price">
                      <button
                        onClick={() => {
                          handleAway({
                            event_id: view.id,
                            home: view.home_team,
                            away: view.away_team,
                            selected: "away",
                            odds: market.outcomes[0].price,
                          });
                        }}
                      >
                        {market.outcomes[0].price}
                      </button>

                      <button
                        onClick={() => {
                          handleAway({
                            event_id: view.id,
                            home: view.home_team,
                            away: view.away_team,
                            selected: "draw",
                            odds: market.outcomes[2].price,
                          });
                        }}
                      >
                        {market.outcomes[2].price}
                      </button>

                      <button
                        onClick={() => {
                          handleAway({
                            event_id: view.id,
                            home: view.home_team,
                            away: view.away_team,
                            selected: "home",
                            odds: market.outcomes[1].price,
                          });
                        }}
                      >
                        {market.outcomes[1].price}
                      </button>
                    </td>
                  </td>
                ))}
              </td>
            </tr>
          ))}
        </table>
      )}
    </>
  );
}

export default MatchList;
