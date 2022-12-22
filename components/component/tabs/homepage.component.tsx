import React, { useEffect, useState } from "react";
import { useAppContext } from "../../../context/AppContext";
import SimpleReactionTestFN from "../left/SimpleReactionTestFN.left";
import TwoTunnelLevel from "../left/TwoTunnelLevel";
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
                gridTemplateColumns: "1fr",
                gridTemplateRows: "1fr 1fr",
                width: "100%",
            }}
        >
            {
                gameStarted ? (
                    gameModeOne == true ? (
                        <TwoTunnelLevel />
                    ) : (
                        <SimpleReactionTestFN setScore={setScore} />
                    )
                ) : <OnboardingScreen />
            }
            <section className="h-[100vh] grid grid-cols-2 ">
                {/* simple  */}
                <div>
                    <div className="grid grid-cols-2 max-h-[400px] overflow-y-scroll">
                        <div className="bg-red-500 py-2 px-4 capitalize">test number</div>
                        <div className="bg-red-500 py-2 px-4 capitalize">reaction time</div>
                        {
                            simpleReactionTestScores.map((score, index) => (
                                <React.Fragment key={index}>
                                    <div className="bg-blue-500 py-2 px-4 my-1">{score.testNumber}</div>
                                    <div className="bg-blue-500 py-2 px-4 my-1">{score.reactionTime}</div>
                                </React.Fragment>
                            ))
                        }
                    </div>
                </div>
                {/* double */}
                <div>
                    <div className="grid grid-cols-2 max-h-[400px] overflow-y-scroll">
                        <div className="bg-red-500 py-2 px-4 capitalize">test number</div>
                        <div className="bg-red-500 py-2 px-4 capitalize">reaction time</div>
                        {
                            doubleReactionTestScores.map((score, index) => (
                                <React.Fragment key={index}>
                                    <div className="bg-blue-500 py-2 px-4 my-1 mx-1 uppercase">{score.testNumber}</div>
                                    <div className="bg-blue-500 py-2 px-4 my-1 mx-1 uppercase">{score.reactionTime}</div>
                                </React.Fragment>
                            ))
                        }
                    </div>
                </div>
            </section>

        </div>
    );
};

export default HomePage;
