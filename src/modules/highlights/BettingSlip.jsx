import "../../css/BettingSlip.css";
import React, { useEffect, useState } from "react";

function BettingSlip({ awaysInfo }) {
  const [oddsValue, setOddsValue] = useState(null);

  return (
    <div className="bettingcase">
      {oddsValue ? (
        <div className="betcase">
          {/* {data?.map((away, index) => {
            return (
              <div key={index}>
                <div>
                  <p>{away.selected}</p>
                  <div className="away">
                    <p>{away.away}</p>
                    <p>{away.home}</p>
                  </div>
                  <div className="awayodds">
                    <p>{away.odds}</p>
                  </div>
                </div>
              </div>
            );
          })} */}
          <div>
            Total:
            {Math.round(
              Object.values(awaysInfo).reduce((total, current) => {
                return total + current.odds * 100;
              }, 0)
            )}
          </div>
        </div>
      ) : (
        <div>
          <div className="betslipcashout">
            <h4>BetSlip</h4>
            <h4>Cashout</h4>
          </div>
          <div className="oddsbet">
            <div>
              <p>To place a bet, click on the odds. Or insert a booking code</p>
              <form>
                <select className="selectoptions">
                  <option>Nigeria</option>
                  <option>Ghana</option>
                  <option>South africa</option>
                  <option>Nigeria</option>
                </select>
                <input type="text" placeholder="Booking code" />
                <button>Load</button>
              </form>
              <p>
                A booking code enables one to transfer a betslip between
                different devices.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BettingSlip;
