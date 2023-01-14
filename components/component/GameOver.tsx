import { useEffect } from 'react';
import { useAppContext } from "../../context/AppContext";
import { convertToCSV } from '../../globals/GenerateCSV';
const GameOverScreeen = () => {
    const { simpleReactionTestScores, doubleReactionTestScores, user } = useAppContext()
    useEffect(() => {

    }, [])

    const downloadScores = () => {
        const csv = convertToCSV(simpleReactionTestScores, doubleReactionTestScores, user)
        const blob = new Blob([csv], { type: 'text/csv' })
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.setAttribute('hidden', '')
        a.setAttribute('href', url)
        a.setAttribute('download', 'simpleReactionTestScores.csv')
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
    }

    return (
        <div className="relative grid place-items-center bg-green-400  min-w-full md:h-[502px]">
            <h1 className="text-4xl font-bold">
                GAME OVER
            </h1>
            <button onClick={() => downloadScores()}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >Download</button>
            <p>download you results.</p>
        </div>
    )
}

export default GameOverScreeen