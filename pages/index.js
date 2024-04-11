import React, { useState } from "react";
import axios from "axios";

const Home = ({ games }) => {
  const [searchItem, setSearchItem] = useState("");
  const [sortedByPlatform, setSortedByPlatform] = useState(false);
  const [filteredGames, setFilteredGames] = useState(games);

  const handleSearch = (event) => {
    const search = event.target.value.trim().toLowerCase();
    setSearchItem(search);
    const filtered = games.filter(
      (game) => game.title && game.title.toLowerCase().includes(search)
    );
    setFilteredGames(filtered);
  };

  const handleSort = () => {
    const sortedGames = [...filteredGames].sort((a, b) => {
      if (!a.platform || !b.platform) return 0;
      if (sortedByPlatform) {
        return b.platform.localeCompare(a.platform);
      } else {
        return a.platform.localeCompare(b.platform);
      }
    });
    setFilteredGames(sortedGames);
    setSortedByPlatform(!sortedByPlatform);
  };

  const resetGames = () => {
    setFilteredGames(games);
    setSearchItem("");
    setSortedByPlatform(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      <div>
        <h2>
          <center>
            <span
              style={{
                fontSize: "30px",
                textAlign: "center",
                color: "yellowgreen",
                marginBottom: "1%",
                border: "1px solid grey",
                padding: "7px",
              }}
            >
              Unity Games
            </span>
          </center>
        </h2>
      </div>

      <input
        type="text"
        placeholder="Search by title"
        value={searchItem}
        onChange={handleSearch}
        style={{
          color: "white",
          width: "100%",
          height: "40px",
          border: "2px solid yellowgreen",
          borderRadius: "5px",
          marginBottom: "20px",
          padding: "0 10px",
          background: "transparent",
        }}
      />
      <button
        onClick={handleSort}
        style={{
          padding: "10px 20px",
          backgroundColor: "yellowgreen",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        Sort by Platform {sortedByPlatform ? "(Z-A)" : "(A-Z)"}
      </button>
      <button
        onClick={resetGames}
        style={{
          padding: "10px 20px",
          backgroundColor: "yellow",
          color: "black",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginBottom: "20px",
          marginLeft: "10px",
        }}
      >
        Reset
      </button>
      <table
        style={{
          width: "100%",
          border: "2px solid yellowgreen",
          margin: "2px",
        }}
      >
        <thead>
          <tr>
            <th
              style={{
                border: "1px solid white",
                padding: "10px",
                fontSize: "20px",
              }}
            >
              <u>Title</u>
            </th>
            <th
              style={{
                border: "1px solid white",
                padding: "10px",
                fontSize: "20px",
              }}
            >
              <u>Platform</u>
            </th>
            <th
              style={{
                border: "1px solid white",
                padding: "10px",
                fontSize: "20px",
              }}
            >
              <u>Score</u>
            </th>
            <th
              style={{
                border: "1px solid white",
                padding: "10px",
                fontSize: "20px",
              }}
            >
              <u>Genre</u>
            </th>
            <th
              style={{
                border: "1px solid white",
                padding: "10px",
                fontSize: "20px",
              }}
            >
              <u>Editor's Choice</u>
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredGames.map(
            (game, index) =>
              game.title && (
                <tr key={index}>
                  <td style={{ border: "1px solid white", padding: "10px" }}>
                    {game.title}
                  </td>
                  <td style={{ border: "1px solid white", padding: "10px" }}>
                    {game.platform}
                  </td>
                  <td style={{ border: "1px solid white", padding: "10px" }}>
                    <center>{game.score}</center>
                  </td>
                  <td style={{ border: "1px solid white", padding: "10px" }}>
                    <center>{game.genre}</center>
                  </td>
                  <td style={{ border: "1px solid white", padding: "10px" }}>
                    <center>
                      {game.editors_choice === "Y" ? "Yes" : "No"}
                    </center>
                  </td>
                </tr>
              )
          )}
        </tbody>
      </table>
    </div>
  );
};

export async function getServerSideProps() {
  try {
    const response = await axios.get(
      "https://s3-ap-southeast-1.amazonaws.com/he-public-data/gamesarena274f2bf.json"
    );
    const games = response.data;
    return {
      props: { games },
    };
  } catch (error) {
    console.error("Error fetching games:", error);
    return {
      props: { games: [] },
    };
  }
}

export default Home;
