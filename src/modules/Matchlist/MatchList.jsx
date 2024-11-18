import "../../css/Matchinglist.css";
import React, { useContext } from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { OddContext } from "../../context/oddContext";
import { AuthApis } from "../../api";

const oddsApi = new AuthApis();

function MatchList() {
  const [error, setError] = useState(null);
  const [oddsValue, setOddsValue] = useState(null);
  const [league, setLeague] = useState("EPL");
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState(new Date());

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    (async () => {
      const formattedDate = formatDate(date);
      const response = await oddsApi.getOdds(formattedDate, league);
      if (response.data) {
        setLoading(false);
      }
      setOddsValue(response.data);
    })();
  }, [league, date]);

  console.log(oddsValue);

  return (
    <>
      <div className="typesOfLeague">
        <botton
          onClick={() => {
            setLeague("EPL");
          }}
        >
          Epl
        </botton>
        <botton
          onClick={() => {
            setLeague("LALIGA");
          }}
        >
          Laliga
        </botton>
        <botton
          onClick={() => {
            setLeague("SERIA-A");
          }}
        >
          Seria-a
        </botton>
        <botton
          onClick={() => {
            setLeague("BUNDESLIGA");
          }}
        >
          Bundesliga
        </botton>
      </div>

      {loading ? (
        <div className="loading_styling">
          <div class="cssanimation leSnake sequence">Loading...</div>
        </div>
      ) : (
        <>
          {oddsValue?.length === 0 ? (
            <div className="no_mtach">
              <h4>
                Sorry, there are no games currently available in this category.
                <br />
                Please try later. Thank you.
              </h4>
            </div>
          ) : (
            <table className="backcolortest">
              {oddsValue?.map((item, id) => (
                <>
                  <tbody className="teamstyling" key={id}>
                    <tr key={item._id} className="leaguesdesign">
                      <td>
                        {item.homeTeam}
                        <br /> {item.awayTeam}
                      </td>

                      <div className="odd_style">
                        <td
                          onClick={() => {
                            console.log("clicked");
                          }}
                        >
                          {item.odds.homeWin}
                        </td>
                        <td
                          onClick={() => {
                            console.log("clicked " + item.odds);
                          }}
                        >
                          {item.odds.straightDraw}
                        </td>
                        <td
                          onClick={() => {
                            console.log("clicked");
                          }}
                        >
                          {item.odds.awayWin}
                        </td>
                      </div>
                    </tr>
                  </tbody>
                </>
              ))}
            </table>
          )}
        </>
      )}
    </>
  );
}

export default MatchList;
