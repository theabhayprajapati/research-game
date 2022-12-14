import Switch from "../../elements/Switch";

const RightAside = ({ setScore, scores, gameModeOne, setGameModeOne }) => {

    /* ondownlaod click generate csv of the objects scores */
    const generateCSV = () => {
        const csv = scores.map((score) => {
            return `${score.score},${score.time}`;
        });
        const csvString = csv.join("");
        const blob = new Blob([csvString], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.setAttribute("hidden", "");

        a.setAttribute("href", url);
        a.setAttribute("download", "scores.csv");
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };
    return (
        /* hide side for screen smaller than iPad */

        <aside className="col-span-1 border w-[100] hidden md:block h-[500px] p-2">

            <div className="game-mode-selection ">
                <div className="game-mode-selection__title">
                    <h1 className="text-2xl font-bold">Game Mode</h1>
                </div>
                <Switch />
                <div className="game-mode-selection__options p-2">
                    <div className="game-mode-selection__option">
                        <input
                            type="radio"
                            name="game-mode"
                            id="game-mode-1"
                            value="game-mode-1"
                            /* default true */
                            checked={gameModeOne}
                            onChange={() => setGameModeOne(true)}
                        />
                        <label htmlFor="game-mode-1"> Mode 1</label>
                    </div>
                    <div className="game-mode-selection__option">
                        <input
                            type="radio"
                            name="game-mode"
                            id="game-mode-2"
                            value="game-mode-2"
                            checked={gameModeOne}
                            onChange={() => setGameModeOne(false)}
                        />
                        <label htmlFor="game-mode-2"> Mode 2</label>
                    </div>

                </div>

            </div>
            <div className="border ">
                {/* Score card */}
                <div className="score-section_header flex justify-between">
                    <h1>
                        Score
                    </h1>
                    <button className="border-2" onClick={generateCSV}>
                        download score
                    </button>
                </div>
                <section className="overflow-y-scroll h-[350px] p-2">
                    {
                        scores.map((score, index) => {
                            return (
                                <div className="score-card p-2 border flex justify-between" key={index}>
                                    <div className="score-card_number">
                                        <h1>{score.number}</h1>
                                    </div>
                                    <div className="score-card_time">
                                        {score.time}
                                    </div>
                                </div>
                            )
                        })
                    }
                </section>
            </div>
        </aside>
    )
}

export default RightAside