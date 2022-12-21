import React, { useEffect, useState } from "react";
import { useAppContext } from "../../../context/AppContext";
import TwoTunnelLevel from "../left/TwoTunnelLevel";
import LeftContainer from "../left/leftcontainer.left";
import OnboardingScreen from "./OnboardingScreen";

const HomePage = () => {
    const [score, setScore] = useState([]);
    const { gameModeOne, setGameModeOne, gameStarted, setGameStarted, simpleReactionTestScores, doubleReactionTestScores } = useAppContext();
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
            <section className="h-[100vh] grid grid-cols-2 ">
                {/* simple  */}
                <div>
                    <div className="grid grid-cols-2">
                        <div className="bg-red-500">test number</div>
                        <div className="bg-red-500">reaction time</div>
                        {
                            simpleReactionTestScores.map((score, index) => (
                                <React.Fragment key={index}>
                                    <div className="bg-blue-500">{score.testNumber}</div>
                                    <div className="bg-blue-500">{score.reactionTime}</div>
                                </React.Fragment>
                            ))
                        }
                    </div>
                </div>
                {/* double */}
                <div>
                    <div className="grid grid-cols-2">
                        <div className="bg-red-500">test number</div>
                        <div className="bg-red-500">reaction time</div>
                        {
                            doubleReactionTestScores.map((score, index) => (
                                <React.Fragment key={index}>
                                    <div className="bg-blue-500">{score.testNumber}</div>
                                    <div className="bg-blue-500">{score.reactionTime}</div>
                                </React.Fragment>
                            ))
                        }
                    </div>

                </div>
                <div></div>
            </section>

        </div>
    );
};

export default HomePage;
