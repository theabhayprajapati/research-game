import { useEffect, useRef, useState } from "react";
import { MarioPlayer } from "../../characters/Mario.character";
import { generateRandomBooleanState } from "../../level/LevelTwo.level";

const MARIO_WIDTH = 50;
const MARIO_HEIGHT = 50;
const TUNNEL_WIDTH = 80;
const TUNNEL_HEIGHT = 80;
const LeftContainer = ({ setScore }) => {
    const [tunnelCords, setTunnelCords] = useState({
        x: 0,
        y: 0,
    })
    const [marioCords, setMarioCords] = useState({
        x: 0,
        y: 0,
    })
    const [marioSide, setMarioSide] = useState(false);
    const [time, setTime] = useState(0);
    const leftContainerRef = useRef(null)

    useEffect(() => {
        const height = leftContainerRef.current.clientHeight
        const width = leftContainerRef.current.clientWidth
        console.log(height, width)
        setTunnelCords({
            x: (500 / 2) - (TUNNEL_WIDTH / 2),
            y: (500 - TUNNEL_HEIGHT),
        })

        setMarioCords({
            y: 0,
            x: (width / 2) - (MARIO_WIDTH / 2)
        })
        return console.log('leftContainerRef.current', leftContainerRef.current)
    }, [leftContainerRef])

    const handleClickRemoveMario = () => {
        setMarioCords({
            ...marioCords,
            y: 0,
        })
        setTime(0)
    }

    useEffect(() => {
        /* increase marios from top to bottom if bottom == 500px then make 0 */
        const interval = setInterval(() => {
            // clearInterval(interval)
            if (marioCords.y === 500) {
                setMarioCords({
                    ...marioCords,
                    y: 0,
                })
            }
            setMarioCords({
                ...marioCords,
                x: tunnelCords.y ? tunnelCords.x : marioCords.x,
                y: marioCords.y > 440 ? 0 : marioCords.y + 10,
            })
        }, 100)
        return () => clearInterval(interval)
    }, [marioCords])

    return (
        <div className="relative col-span-2 border bg-green-400 md:w-[502px] w-full md:h-[502px]" ref={leftContainerRef}>
            <div
                className="tunnel bg-blue-500 h-20 w-20"
                style={{
                    position: "absolute",
                    top: tunnelCords.y,
                    left: tunnelCords.x,
                }}
            >
            </div>
            <StopWatch setScore={setScore} setMarioCords={setMarioCords} time={time} setTime={setTime} setMarioSide={setMarioSide} />
            <MarioPlayer setScore={setScore} time={time} xaxis={marioCords.x} yaxis={marioCords.y} setTime={setTime}
                setMarioSide={setMarioSide}
                setMarioCords={setMarioCords}
                handleClickRemoveMario={handleClickRemoveMario}
            />
        </div>
    )
}

export default LeftContainer;
export const StopWatch = ({ setMarioCords, time, setTime, setMarioSide, setScore }) => {

    /* stop watch of seconds and milliseconds */
    const [seconds, setSeconds] = useState(0);
    const [milliseconds, setMilliseconds] = useState(0);

    const [isRunning, setIsRunning] = useState(true)
    const intervalRef = useRef(null)
    const toggle = () => {
        setIsRunning(!isRunning)
    }
    const reset = () => {
        setTime(0)
        setIsRunning(false)
        console.log("reset")
        setMarioCords((prev) => {
            return { ...prev, y: 0 }
        })
        generateRandomBooleanState() ? setMarioSide(true) : setMarioSide(false)
        setIsRunning(true)
    }

    useEffect(() => {
        if (isRunning) {
            intervalRef.current = setInterval(() => {
                setTime((prev) => {
                    const num = Number(prev) + 1;
                    return num;
                })
            }, 1000)
        } else {
            clearInterval(intervalRef.current)
        }
        return () => clearInterval(intervalRef.current)
    }, [isRunning])

    return (
        <div className="stopwatch-card card m-5">
            <span className="stopwatch-time font-semibold text-5xl">{time}</span>
        </div>
    )
}