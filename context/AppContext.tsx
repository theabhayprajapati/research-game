import React from 'react';

const AppContext = React.createContext(
    {
        gameModeOne: true,
        setGameModeOne: any => { },
        gameStarted: false,
        setGameStarted: any => { },
        simpleReactionTestScores: [],
        setSimpleReactionTestScores: any => { },
        doubleReactionTestScores: [],
        setDoubleReactionTestScores: any => { },
        updateSimpleReactionTestScores: any => { },
        updateDoubleReactionTestScores: any => { },
        testNumbers: {
            simpleReactionTest: 1,
            doubleReactionTest: 1
        },
        setTestNumbers: any => { }
    }
)

export const useAppContext = () => React.useContext(AppContext)


export type scoreT = {
    testNumber: number;
    reactionTime: number;
}
type GameScoreType = {
    simpleReactionTest: {
        scores: scoreT[];
    },
    doubleReactionTest: {
        scores: scoreT[];
    }
}
export const AppContextProvider = ({ children }) => {
    const [gameModeOne, setGameModeOne] = React.useState(true);
    const [gameStarted, setGameStarted] = React.useState(false);
    const [simpleReactionTestScores, setSimpleReactionTestScores] = React.useState<scoreT[]>([]);
    const [testNumbers, setTestNumbers] = React.useState({
        simpleReactionTest: 1,
        doubleReactionTest: 1
    })
    const updateSimpleReactionTestScores = (mill: number) => {
        console.log(mill, "called");
        console.log(testNumbers);
        setTestNumbers(prev => ({ ...prev, simpleReactionTest: prev.simpleReactionTest + 1 }))
        const score = {
            testNumber: Number.parseInt(document.getElementById('simpleReactionTestScore').innerText),
            reactionTime: mill
        }

        setSimpleReactionTestScores(prev => [...prev, score]);
        /* print */
        console.log("simpleReactionTestScores", simpleReactionTestScores);
    }

    const [doubleReactionTestScores, setDoubleReactionTestScores] = React.useState<scoreT[]>([]);
    const updateDoubleReactionTestScores = (mill: number) => {
        console.log(mill, "called");
        console.log(testNumbers);
        setTestNumbers(prev => ({ ...prev, doubleReactionTest: prev.doubleReactionTest + 1 }))
        const score = {
            testNumber: Number.parseInt(document.getElementById('doubleReactionTestScore').innerText),
            reactionTime: mill
        }

        setDoubleReactionTestScores(prev => [...prev, score]);
        /* print */
        console.log("doubleReactionTestScores", doubleReactionTestScores);
    }

    return (
        <AppContext.Provider value={{
            gameModeOne, setGameModeOne, gameStarted, setGameStarted,
            simpleReactionTestScores, setSimpleReactionTestScores, doubleReactionTestScores, setDoubleReactionTestScores,
            updateSimpleReactionTestScores, updateDoubleReactionTestScores,
            testNumbers, setTestNumbers
        }}>
            {children}
        </AppContext.Provider>
    )
}

