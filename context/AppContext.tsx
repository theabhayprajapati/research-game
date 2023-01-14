import React from 'react';

const AppContext = React.createContext(
    {
        gameModeOne: true,
        user: {},
        setUser: any => { },
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
        setTestNumbers: any => { },
        gameOver: false,
        setGameOver: any => { }
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
    const [gameModeOne, setGameModeOne] = React.useState(false);
    const [gameStarted, setGameStarted] = React.useState(false);
    const [gameOver, setGameOver] = React.useState(false);
    const [user, setUser] = React.useState({
        name: "",
        age: 0,
    });
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
        if (score.testNumber < 5) {
            return;
        }
        var newScore = {
            testNumber: score.testNumber - 5,
            reactionTime: score.reactionTime
        }
        setSimpleReactionTestScores(prev => [...prev, newScore]);
        /* print */
        console.log("simpleReactionTestScores", simpleReactionTestScores);
    }

    const [doubleReactionTestScores, setDoubleReactionTestScores] = React.useState<scoreT[]>([]);
    const updateDoubleReactionTestScores = (mill: number) => {
        // if length of 
        console.log(mill, "called");
        console.log(testNumbers);
        setTestNumbers(prev => ({ ...prev, doubleReactionTest: prev.doubleReactionTest + 1 }))
        const score = {
            testNumber: Number.parseInt(document.getElementById('doubleReactionTestScore').innerText),
            reactionTime: mill
        }
        if (score.testNumber < 5) {
            console.log('not pushing..')
            return;
        }
        var newScore = {
            testNumber: score.testNumber - 5,
            reactionTime: score.reactionTime
        }
        setDoubleReactionTestScores(prev => [...prev, newScore]);
        /* print */
        console.log("doubleReactionTestScores", doubleReactionTestScores);
    }
    React.useEffect(() => {
        if (testNumbers.simpleReactionTest > 10) {
            setTimeout(() => {
                return setGameModeOne(true);
            }, 1000)
        }
        if (testNumbers.doubleReactionTest > 10) {
            setTimeout(() => {
                setGameStarted(false);
                return setGameOver(true);
            }, 1000)
        }
        return;
    }, [testNumbers])

    return (
        <AppContext.Provider value={{
            gameModeOne, setGameModeOne, gameStarted, setGameStarted,
            simpleReactionTestScores, setSimpleReactionTestScores, doubleReactionTestScores, setDoubleReactionTestScores,
            updateSimpleReactionTestScores, updateDoubleReactionTestScores,
            gameOver, setGameOver,
            testNumbers, setTestNumbers, user, setUser
        }}>
            {children}
        </AppContext.Provider>
    )
}

