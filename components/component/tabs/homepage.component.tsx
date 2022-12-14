import { useEffect, useState } from "react";
import { useAppContext } from "../../../context/AppContext";
import LevelTwo from "../../level/LevelTwo.level";
import RightAside from "./right/Rightcard.right";

const HomePage = () => {
    const [score, setScore] = useState([]);
    const { gameModeOne, setGameModeOne } = useAppContext();
    useEffect(() => {
        return () => console.log("gamemodeone", gameModeOne);
    }, [gameModeOne])
    return (
        <div className="container" style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gridGap: "10px",
            height: "90vh",
        }}>
            <RightAside setScore={setScore} scores={score} gameModeOne={gameModeOne} setGameModeOne={setGameModeOne} />
            <LevelTwo setScore={setScore} />

        </div>

    )
}

export default HomePage