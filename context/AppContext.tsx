import React from 'react';

const AppContext = React.createContext(
    {
        gameModeOne: true,
        setGameModeOne: any => { },
        gameStarted: false,
        setGameStarted: any => { },
    }
)

export const useAppContext = () => React.useContext(AppContext)

export const AppContextProvider = ({ children }) => {
    const [gameModeOne, setGameModeOne] = React.useState(false);
    const [gameStarted, setGameStarted] = React.useState(false);
    return (
        <AppContext.Provider value={{ gameModeOne, setGameModeOne, gameStarted, setGameStarted }}>
            {children}
        </AppContext.Provider>
    )
}

