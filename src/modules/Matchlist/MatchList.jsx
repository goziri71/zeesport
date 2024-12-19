import "../../css/Matchinglist.css";
import React, { useContext, useState, useEffect } from "react";
import { OddContext } from "../../context/oddContext";
import { AuthApis } from "../../api";

const oddsApi = new AuthApis();

function MatchList() {
  const getCurrentDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [error, setError] = useState(null);
  const [oddsValue, setOddsValue] = useState(null);
  const [league, setLeague] = useState("EPL");
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState("2024-12-03");
  const [addedOddsValue, setAddedOddsValue] = useState([]);
  const [totalOdds, setTotalOdds] = useState(0);
  const [oddscontext, setOddscontext] = useState([]);
  const { setOdds, Odds, setTeams, Teams } = useContext(OddContext);

  console.log(Teams);

  const addGames = (value) => {
    const currentOddsContext = Teams || [];
    const currentAddedOddsValue = addedOddsValue || [];

    const existingContextIndex = currentOddsContext.findIndex(
      (item) => item.fixtureId === value.fixtureId
    );

    let newOddsContext;
    if (existingContextIndex !== -1) {
      newOddsContext = [...currentOddsContext];
      newOddsContext[existingContextIndex] = value;
    } else {
      newOddsContext = [...currentOddsContext, value];
    }

    setTeams(newOddsContext);
    setOddscontext(newOddsContext);

    const existingMatchIndex = currentAddedOddsValue.findIndex(
      (item) => item.fixtureId === value.fixtureId
    );

    let updatedOdds;
    if (existingMatchIndex !== -1) {
      updatedOdds = [...currentAddedOddsValue];
      updatedOdds[existingMatchIndex] = value;
    } else {
      updatedOdds = [...currentAddedOddsValue, value];
    }

    setAddedOddsValue(updatedOdds);
    const total = updatedOdds.reduce((sum, obj) => sum + (obj.odd || 0), 0);
    setOdds(total);
    setTotalOdds(total);
  };

  useEffect(() => {
    oddsApi.handleOfflineSingle();
    const fetchOdds = async () => {
      try {
        const response = await oddsApi.getOdds(date, league);
        if (response.data) {
          setOddsValue(response.data);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOdds();
  }, [league, date]);

  return (
    <>
      <div className="typesOfLeague">
        <button
          onClick={() => {
            setLeague("EPL");
          }}
        >
          Epl
        </button>
        <button
          onClick={() => {
            setLeague("LALIGA");
          }}
        >
          Laliga
        </button>
        <button
          onClick={() => {
            setLeague("SERIA-A");
          }}
        >
          Seria-a
        </button>
        <button
          onClick={() => {
            setLeague("BUNDESLIGA");
          }}
        >
          Bundesliga
        </button>
      </div>

      {loading ? (
        <div className="loading_styling">
          <div className="cssanimation leSnake sequence">Loading...</div>
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
                  <tbody className="teamstyling" key={`${item._id}-${id}`}>
                    <tr className="leaguesdesign">
                      <td>
                        {item.homeTeam}
                        <br /> {item.awayTeam}
                      </td>

                      <div className="odd_style">
                        <td
                          onClick={() =>
                            addGames({
                              fixtureId: item._id,
                              _id: `${item._id}-home`,
                              odd: item.odds.homeWin,
                              selection: "Home Win",
                              team: `${item.homeTeam} - ${item.awayTeam}`,
                            })
                          }
                        >
                          {item.odds.homeWin}
                        </td>

                        <td
                          onClick={() =>
                            addGames({
                              fixtureId: item._id,
                              _id: `${item._id}-draw`,
                              odd: item.odds.straightDraw,
                              selection: "Draw",
                              team: `${item.homeTeam} - ${item.awayTeam}`,
                            })
                          }
                        >
                          {item.odds.straightDraw}
                        </td>

                        <td
                          onClick={() =>
                            addGames({
                              fixtureId: item._id,
                              _id: `${item._id}-away`,
                              odd: item.odds.awayWin,
                              selection: "Away Win",
                              team: `${item.homeTeam} - ${item.awayTeam}`,
                            })
                          }
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
