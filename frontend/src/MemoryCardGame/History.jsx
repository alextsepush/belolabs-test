import React, { useState, useRef, useEffect } from "react";
import backgroundGif from "../assets/images/play.gif";
import calmBackground from "../assets/images/calm-wallpaper.jpg";
import "./Play.css";
import axios from "axios";

const difficultiesMap = {
    "Hard": "red",
    "Medium": "yellow",
    "Easy": "green"
}

const History = () => {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        getGameData();
    }, [])

    const getGameData = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/memory/history", {
                headers: { "Content-Type": "application/json", gametoken: localStorage.getItem("token") },
            });
            console.log(response.data);
            setHistory(response.data);
        } catch (error) {
            console.error("Error saving game data:", error.response ? error.response.data : error.message);
        }
    };

    return (
        <div
            className="background-container"
            style={{
                backgroundImage: `url(${backgroundGif})`,
            }}
        >
            <h1 className={`game-title`}>
                History
            </h1>

                <div className="history-container">
                    {history.map((entry) => {
                        return(
                            <div key={entry._id} className="history-entry">
                                {entry._id}
                                <p className={`difficulty-${difficultiesMap[entry.difficulty]}`}>{entry.difficulty}</p>
                                <p>{new Date(entry.gameDate).toLocaleString()}</p>
                                <p>{entry.timePlayed}</p>
                            </div>
                        )
                    })}
                </div>
        </div>
    );
};

export default History;
