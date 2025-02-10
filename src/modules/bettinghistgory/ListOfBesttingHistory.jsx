import React, { useState, useEffect } from "react";
import SecondHeader from "../../components/SecondHeader";
import { AuthApis } from "../../api/index";
import "../../css/ListofHistory.css";

const authApi = new AuthApis();

function ListOfBettingHistory() {
  const [bettingData, setBettingData] = useState({
    singleBets: [],
    multipleBets: [],
  });
  const [activeTab, setActiveTab] = useState("multiple");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleTheListHistory = async () => {
    try {
      const response = await authApi.handleBettingHistory();
      if (response.success) {
        setBettingData(response.data);
      } else {
        setError("Failed to fetch betting history");
      }
    } catch (error) {
      setError("An error occurred while fetching betting history");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleTheListHistory();
  }, []);

  // if (error) {
  //   return <div className="error">{error}</div>;
  // }

  return (
    <div>
      <div className="header-container">
        <SecondHeader />
      </div>
      <div className="betting-history">
        {loading ? (
          <p>loading</p>
        ) : (
          <>
            <div className="tab-container">
              <button
                className={`tab-btn ${activeTab === "single" ? "active" : ""}`}
                onClick={() => setActiveTab("single")}
              >
                Single Bets ({bettingData.singleBets?.length || 0})
              </button>
              <button
                className={`tab-btn ${
                  activeTab === "multiple" ? "active" : ""
                }`}
                onClick={() => setActiveTab("multiple")}
              >
                Multiple Bets ({bettingData.multipleBets?.length || 0})
              </button>
            </div>

            <div className="bet-grid">
              {activeTab === "single"
                ? bettingData.singleBets?.map((bet) => (
                    <div key={bet._id} className="bet-card">
                      <div className="bet-header">
                        <div>
                          <div className="bet-date">
                            {new Date(bet.createdAt).toLocaleDateString()}
                          </div>
                          <div className="ticket-id">
                            Ticket ID: {bet.ticketId}
                          </div>
                        </div>
                        <div>
                          <div className="bet-amount">
                            NG{bet.winningAmount.toFixed(2)}
                          </div>
                          <div
                            className={`status-badge ${
                              bet.isWinner === "Pending"
                                ? "status-pending"
                                : bet.isWinner
                                ? "status-won"
                                : "status-lost"
                            }`}
                          >
                            {bet.isWinner}
                          </div>
                        </div>
                      </div>

                      <div className="bet-details">
                        <div className="detail-row">
                          <span className="detail-label">Stake:</span>
                          <span>NG{bet.stake.toFixed(2)}</span>
                        </div>
                        <div className="detail-row">
                          <span className="detail-label">Odds:</span>
                          <span>{bet.odd}</span>
                        </div>
                        <div className="detail-row">
                          <span className="detail-label">Selection:</span>
                          <span>{bet.selection}</span>
                        </div>
                        <div className="detail-row">
                          <span className="detail-label">Booking ID:</span>
                          <span>{bet.bookingId}</span>
                        </div>
                      </div>
                    </div>
                  ))
                : bettingData.multipleBets?.map((bet) => (
                    <div key={bet._id} className="bet-card">
                      <div className="bet-header">
                        <div>
                          <div className="bet-date">
                            {new Date(bet.createdAt).toLocaleDateString()}
                          </div>
                          <div className="ticket-id">
                            Ticket ID: {bet.ticketId}
                          </div>
                        </div>
                        <div>
                          <div className="bet-amount">
                            NG{bet.winningAmount.toFixed(2)}
                          </div>
                          <div
                            className={`status-badge ${
                              bet.isWinner === "Pending"
                                ? "status-pending"
                                : bet.isWinner
                                ? "status-won"
                                : "status-lost"
                            }`}
                          >
                            {bet.isWinner}
                          </div>
                        </div>
                      </div>

                      <div className="bet-details">
                        <div className="detail-row">
                          <span className="detail-label">Stake:</span>
                          <span>NG{bet.stake.toFixed(2)}</span>
                        </div>
                        <div className="detail-row">
                          <span className="detail-label">Total Odds:</span>
                          <span>{bet.odds.toFixed(2)}</span>
                        </div>
                        <div className="detail-row">
                          <span className="detail-label">Bonus:</span>
                          <span>{bet.bonus.toFixed(2)}%</span>
                        </div>
                        <div className="detail-row">
                          <span className="detail-label">Games:</span>
                          <span>{bet.games.length} selections</span>
                        </div>
                        <div className="detail-row">
                          <span className="detail-label">Booking ID:</span>
                          <span>{bet.bookingId}</span>
                        </div>
                      </div>
                    </div>
                  ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ListOfBettingHistory;
