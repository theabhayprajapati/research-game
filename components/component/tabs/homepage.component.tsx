import { useEffect, useState } from "react";
import { useAppContext } from "../../../context/AppContext";
import LeftContainer from "../left/leftcontainer.left";
import TwoTunnelLevel from "../left/TwoTunnelLevel";
import OnboardingScreen from "./OnboardingScreen";

const HomePage = () => {
    const [score, setScore] = useState([]);
    const { gameModeOne, setGameModeOne, gameStarted, setGameStarted } = useAppContext();
    useEffect(() => {
        return () => console.log("gamemodeone", gameModeOne);
    }, [gameModeOne]);
    useEffect(() => {
        /* check for  */
        document.addEventListener("keydown", disableScrollOnSpace);
        return () => {
            document.removeEventListener("keydown", disableScrollOnSpace);
        };
    }, []);
    const disableScrollOnSpace = (e) => {
        if (e.code === "Space") {
            setGameStarted(true);
            e.preventDefault();
        }
    };

    return (
        <div
            className="container"
            style={{
                display: "grid",
                gridGap: "10px",
                height: "90vh",
            }}
        >
            {
                gameStarted ? (
                    gameModeOne == true ? (
                        <TwoTunnelLevel />
                    ) : (
                        <LeftContainer setScore={setScore} />
                    )
                ) : <OnboardingScreen />
            }
            <section className="h-[100vh]">
                <h1>Scores</h1>
            </section>
        </div>
    );
};

export default HomePage;
