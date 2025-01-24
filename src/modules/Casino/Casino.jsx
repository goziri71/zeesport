import React, { useState, useEffect } from "react";
import SecondHeader from "../../components/SecondHeader";
import "../../css/Casino.css";
import { Icon } from "@iconify/react";

// SVG Icons as components
const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const FireIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2c.5 2 2 3.5 4 4 .5.5 1.5 2 1.5 3.5a5.5 5.5 0 1 1-11 0c0-1.5 1-3 1.5-3.5 2-.5 3.5-2 4-4z"></path>
  </svg>
);

const ClockIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

const StarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
);

const ChevronRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
);

// Sample game data
const casinoGames = [
  {
    id: 1,
    name: "Sweet Bonanza",
    provider: "Pragmatic Play",
    type: "Slots",
    isPopular: true,
    isNew: false,
    thumbnail: "https://picsum.photos/300/200?random=1",
  },
  {
    id: 2,
    name: "Crazy Time",
    provider: "Evolution Gaming",
    type: "Live Casino",
    isPopular: true,
    isNew: true,
    thumbnail: "https://picsum.photos/300/200?random=2",
  },
  {
    id: 3,
    name: "Gates of Olympus",
    provider: "Pragmatic Play",
    type: "Slots",
    isPopular: true,
    isNew: false,
    thumbnail: "https://picsum.photos/300/200?random=3",
  },
  {
    id: 4,
    name: "Lightning Roulette",
    provider: "Evolution Gaming",
    type: "Live Casino",
    isPopular: true,
    isNew: false,
    thumbnail: "https://picsum.photos/300/200?random=4",
  },
  {
    id: 5,
    name: "Book of Dead",
    provider: "Play'n GO",
    type: "Slots",
    isPopular: true,
    isNew: false,
    thumbnail: "https://picsum.photos/300/200?random=5",
  },
  {
    id: 6,
    name: "Monopoly Live",
    provider: "Evolution Gaming",
    type: "Live Casino",
    isPopular: false,
    isNew: true,
    thumbnail: "https://picsum.photos/300/200?random=6",
  },
  {
    id: 7,
    name: "Starburst XXXtreme",
    provider: "NetEnt",
    type: "Slots",
    isPopular: true,
    isNew: true,
    thumbnail: "https://picsum.photos/300/200?random=7",
  },
  {
    id: 8,
    name: "Big Bass Bonanza",
    provider: "Pragmatic Play",
    type: "Slots",
    isPopular: true,
    isNew: false,
    thumbnail: "https://picsum.photos/300/200?random=8",
  },
  {
    id: 9,
    name: "Mega Ball",
    provider: "Evolution Gaming",
    type: "Live Casino",
    isPopular: false,
    isNew: true,
    thumbnail: "https://picsum.photos/300/200?random=9",
  },
  {
    id: 10,
    name: "Wolf Gold",
    provider: "Pragmatic Play",
    type: "Slots",
    isPopular: true,
    isNew: false,
    thumbnail: "https://picsum.photos/300/200?random=10",
  },
  {
    id: 11,
    name: "Gonzo's Quest",
    provider: "NetEnt",
    type: "Slots",
    isPopular: true,
    isNew: false,
    thumbnail: "https://picsum.photos/300/200?random=11",
  },
  {
    id: 12,
    name: "Deal or No Deal",
    provider: "Evolution Gaming",
    type: "Live Casino",
    isPopular: true,
    isNew: true,
    thumbnail: "https://picsum.photos/300/200?random=12",
  },
  {
    id: 13,
    name: "Fruit Party",
    provider: "Pragmatic Play",
    type: "Slots",
    isPopular: false,
    isNew: true,
    thumbnail: "https://picsum.photos/300/200?random=13",
  },
  {
    id: 14,
    name: "Mega Fortune",
    provider: "NetEnt",
    type: "Jackpot",
    isPopular: true,
    isNew: false,
    thumbnail: "https://picsum.photos/300/200?random=14",
  },
  {
    id: 15,
    name: "Dragon Tiger",
    provider: "Evolution Gaming",
    type: "Live Casino",
    isPopular: false,
    isNew: false,
    thumbnail: "https://picsum.photos/300/200?random=15",
  },
  {
    id: 16,
    name: "Rise of Olympus",
    provider: "Play'n GO",
    type: "Slots",
    isPopular: true,
    isNew: true,
    thumbnail: "https://picsum.photos/300/200?random=16",
  },
  {
    id: 17,
    name: "Reactoonz",
    provider: "Play'n GO",
    type: "Slots",
    isPopular: true,
    isNew: false,
    thumbnail: "https://picsum.photos/300/200?random=17",
  },
  {
    id: 18,
    name: "VIP Blackjack",
    provider: "Evolution Gaming",
    type: "Live Casino",
    isPopular: true,
    isNew: false,
    thumbnail: "https://picsum.photos/300/200?random=18",
  },
  {
    id: 19,
    name: "Money Train 2",
    provider: "Relax Gaming",
    type: "Slots",
    isPopular: true,
    isNew: true,
    thumbnail: "https://picsum.photos/300/200?random=19",
  },
  {
    id: 20,
    name: "Wild Wild Riches",
    provider: "Pragmatic Play",
    type: "Slots",
    isPopular: false,
    isNew: true,
    thumbnail: "https://picsum.photos/300/200?random=20",
  },
  {
    id: 21,
    name: "Buffalo King",
    provider: "Pragmatic Play",
    type: "Slots",
    isPopular: true,
    isNew: false,
    thumbnail: "https://picsum.photos/300/200?random=21",
  },
  {
    id: 22,
    name: "Power Blackjack",
    provider: "Evolution Gaming",
    type: "Live Casino",
    isPopular: true,
    isNew: true,
    thumbnail: "https://picsum.photos/300/200?random=22",
  },
  {
    id: 23,
    name: "Crystal Sun",
    provider: "Play'n GO",
    type: "Slots",
    isPopular: false,
    isNew: true,
    thumbnail: "https://picsum.photos/300/200?random=23",
  },
  {
    id: 24,
    name: "Divine Fortune",
    provider: "NetEnt",
    type: "Jackpot",
    isPopular: true,
    isNew: false,
    thumbnail: "https://picsum.photos/300/200?random=24",
  },
  {
    id: 25,
    name: "Speed Baccarat",
    provider: "Evolution Gaming",
    type: "Live Casino",
    isPopular: true,
    isNew: false,
    thumbnail: "https://picsum.photos/300/200?random=25",
  },
  {
    id: 26,
    name: "Fire Joker",
    provider: "Play'n GO",
    type: "Slots",
    isPopular: true,
    isNew: false,
    thumbnail: "https://picsum.photos/300/200?random=26",
  },
  {
    id: 27,
    name: "Mega Wheel",
    provider: "Pragmatic Play",
    type: "Live Casino",
    isPopular: false,
    isNew: true,
    thumbnail: "https://picsum.photos/300/200?random=27",
  },
  {
    id: 28,
    name: "Wild West Gold",
    provider: "Pragmatic Play",
    type: "Slots",
    isPopular: true,
    isNew: false,
    thumbnail: "https://picsum.photos/300/200?random=28",
  },
  {
    id: 29,
    name: "Arabian Nights",
    provider: "NetEnt",
    type: "Jackpot",
    isPopular: false,
    isNew: false,
    thumbnail: "https://picsum.photos/300/200?random=29",
  },
  {
    id: 30,
    name: "Football Studio",
    provider: "Evolution Gaming",
    type: "Live Casino",
    isPopular: true,
    isNew: true,
    thumbnail: "https://picsum.photos/300/200?random=30",
  },
  {
    id: 31,
    name: "Book of Ra",
    provider: "Novomatic",
    type: "Slots",
    isPopular: true,
    isNew: false,
    thumbnail: "https://picsum.photos/300/200?random=31",
  },
  {
    id: 32,
    name: "Cash or Crash",
    provider: "Evolution Gaming",
    type: "Live Casino",
    isPopular: true,
    isNew: true,
    thumbnail: "https://picsum.photos/300/200?random=32",
  },
  {
    id: 33,
    name: "Book of Vikings",
    provider: "Pragmatic Play",
    type: "Slots",
    isPopular: false,
    isNew: true,
    thumbnail: "https://picsum.photos/300/200?random=33",
  },
  {
    id: 34,
    name: "Lucky Lady's Charm",
    provider: "Novomatic",
    type: "Slots",
    isPopular: true,
    isNew: false,
    thumbnail: "https://picsum.photos/300/200?random=34",
  },
  {
    id: 35,
    name: "XXXtreme Lightning Roulette",
    provider: "Evolution Gaming",
    type: "Live Casino",
    isPopular: true,
    isNew: true,
    thumbnail: "https://picsum.photos/300/200?random=35",
  },
  {
    id: 36,
    name: "Diamond Strike",
    provider: "Pragmatic Play",
    type: "Slots",
    isPopular: false,
    isNew: false,
    thumbnail: "https://picsum.photos/300/200?random=36",
  },
  {
    id: 37,
    name: "Imperial Riches",
    provider: "NetEnt",
    type: "Jackpot",
    isPopular: true,
    isNew: false,
    thumbnail: "https://picsum.photos/300/200?random=37",
  },
  {
    id: 38,
    name: "Gold Party",
    provider: "Pragmatic Play",
    type: "Slots",
    isPopular: true,
    isNew: true,
    thumbnail: "https://picsum.photos/300/200?random=38",
  },
  {
    id: 39,
    name: "Super Sic Bo",
    provider: "Evolution Gaming",
    type: "Live Casino",
    isPopular: false,
    isNew: false,
    thumbnail: "https://picsum.photos/300/200?random=39",
  },
  {
    id: 40,
    name: "Eye of Horus",
    provider: "Blueprint Gaming",
    type: "Slots",
    isPopular: true,
    isNew: false,
    thumbnail: "https://picsum.photos/300/200?random=40",
  },
];

const categories = [
  { id: "all", name: "All Games", icon: null },
  { id: "popular", name: "Popular", icon: FireIcon },
  { id: "new", name: "New Games", icon: ClockIcon },
  { id: "slots", name: "Slots", icon: null },
  { id: "live", name: "Live Casino", icon: null },
  { id: "favorites", name: "My Favorites", icon: StarIcon },
];

const Casino = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [windowResize, setWindowResize] = useState(window.innerWidth);
  const [iconswitching, setIconswitching] = useState(null);
  const [iconMobileView, setIconMobileView] = useState(true);
  const [isIconDisplayEnabled, setIsIconDisplayEnabled] = useState(true);

  console.log(mobileSidebarOpen);

  const filteredGames = casinoGames.filter((game) => {
    const matchesSearch =
      game.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.provider.toLowerCase().includes(searchQuery.toLowerCase());

    if (selectedCategory === "all") return matchesSearch;
    if (selectedCategory === "popular") return game.isPopular && matchesSearch;
    if (selectedCategory === "new") return game.isNew && matchesSearch;
    if (selectedCategory === "slots")
      return game.type === "Slots" && matchesSearch;
    if (selectedCategory === "live")
      return game.type === "Live Casino" && matchesSearch;
    return matchesSearch;
  });

  const [sportLink] = useState([]);

  const handleIconDisplay = () => {
    if (isIconDisplayEnabled) return;
    setMobileSidebarOpen(!mobileSidebarOpen);
    setIconMobileView(true);
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowResize(window.innerWidth);
      if (window.innerWidth > 768) {
        setMobileSidebarOpen(false);
        setIconMobileView(false);
        setIconswitching(false);
        handleIconDisplay();
      } else {
        setMobileSidebarOpen(true);
        setIconswitching(true);
        setIconMobileView(true);
        setIsIconDisplayEnabled();
      }
    };
    window.addEventListener("resize", handleResize);
    // Set initial state
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      <div className="header-container">
        <SecondHeader text={sportLink} />
      </div>
      <div className="casino-layout">
        {/* Sidebar Navigation */}
        <div className="sidebar">
          {mobileSidebarOpen ? (
            <button
              className="mobile-sidebar-toggle"
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            >
              {iconMobileView && (
                <Icon
                  icon="garden:chevron-left-stroke-12"
                  width="18"
                  height="18"
                  style={{ color: "#fff" }}
                />
              )}
              <p>More</p>
            </button>
          ) : null}
          <div
            className={mobileSidebarOpen ? "mobileSidebarOpen" : "sidebarstyle"}
          >
            <div className="sidebar-header" onClick={handleIconDisplay}>
              {iconswitching && (
                <Icon
                  icon="garden:chevron-right-fill-16"
                  width="18"
                  height="18"
                  style={{ color: "#fff" }}
                />
              )}
              <h2>Categories</h2>
            </div>

            <nav className="sidebar-nav">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`nav-item ${
                    selectedCategory === category.id ? "active" : ""
                  }`}
                >
                  {category.icon && <category.icon />}
                  <span>{category.name}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <main className="main-content">
          {/* Header */}
          <div className="content-header">
            <h1>Casino Games</h1>
            <p>
              Experience the thrill of our extensive collection of casino games
            </p>
          </div>

          {/* Search Bar */}
          <div className="search-container">
            <SearchIcon />
            <input
              type="text"
              placeholder="Search games..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Games Grid */}
          <div className="games-grid">
            {filteredGames.map((game) => (
              <div key={game.id} className="game-card">
                <div className="game-thumbnail">
                  <img src={game.thumbnail} alt={game.name} />
                  {game.isNew && <span className="badge new">NEW</span>}
                  {game.isPopular && <span className="badge hot">HOT</span>}
                </div>
                <div className="game-info">
                  <h3>{game.name}</h3>
                  <p>{game.provider}</p>
                  <button className="play-button">
                    <span>Play Now</span>
                    <ChevronRightIcon />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredGames.length === 0 && (
            <div className="no-results">
              <p>No games found matching your criteria</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Casino;
