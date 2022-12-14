import { useState } from "react";
import LevelTwo from "../../level/LevelTwo.level";
import LeftContainer from "../left/leftcontainer.left";
import RightAside from "./right/Rightcard.right";

const HomePage = () => {
    const [score, setScore] = useState([]);
    const [gameModeOne, setGameModeOne] = useState(false);
    return (
        <div className="container" style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gridGap: "10px",
            height: "90vh",
        }}>
            <RightAside setScore={setScore} scores={score} gameModeOne={gameModeOne} setGameModeOne={setGameModeOne} />
            {
                gameModeOne ? <LeftContainer setScore={setScore} /> : <LevelTwo setScore={setScore} />
            }
        </div>

    )
}

export default HomePage