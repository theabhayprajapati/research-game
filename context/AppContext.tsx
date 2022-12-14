import React from 'react'

const AppContext = React.createContext(
    {
        gameModeOne: false,
        setGameModeOne: any => { }
    }
)

export const useAppContext = () => React.useContext(AppContext)

export const AppContextProvider = ({ children }) => {
    const [gameModeOne, setGameModeOne] = React.useState(true)

    return (
        <AppContext.Provider value={{ gameModeOne, setGameModeOne }}>
            {children}
        </AppContext.Provider>
    )
}

