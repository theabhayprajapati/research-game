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
    const updateSimpleReactionTestScores = (mill: number) => {
        console.log(mill, "called");
        const score = {
            testNumber: simpleReactionTestScores.length + 1,
            reactionTime: mill
        }
        setSimpleReactionTestScores(prev => [...prev, score]);
        /* print */
        console.log("simpleReactionTestScores", simpleReactionTestScores);
    }

    const [doubleReactionTestScores, setDoubleReactionTestScores] = React.useState<scoreT[]>([]);
    const updateDoubleReactionTestScores = (mill: number) => {
        console.log(doubleReactionTestScores, "called")
        const score = {
            testNumber: doubleReactionTestScores.length + 1,
            reactionTime: mill
        }
        setDoubleReactionTestScores(prev => [...prev, score]);
        console.log("doubleReactionTestScores", doubleReactionTestScores);
    }

    return (
        <AppContext.Provider value={{
            gameModeOne, setGameModeOne, gameStarted, setGameStarted,
            simpleReactionTestScores, setSimpleReactionTestScores, doubleReactionTestScores, setDoubleReactionTestScores,
            updateSimpleReactionTestScores, updateDoubleReactionTestScores
        }}>
            {children}
        </AppContext.Provider>
    )
}

