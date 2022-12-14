import { useEffect, useRef, useState } from "react";
import { MarioPlayer } from "../../characters/Mario.character";
import { generateRandomBooleanState } from "../../level/LevelTwo.level";
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
        <div className="stopwatch-card card">
            <span className="stopwatch-time font-semibold text-5xl">{time}</span>
        </div>
    )
}

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
            x: width / 2 - 20,
            y: 500 - 80,
        })
        return console.log('leftContainerRef.current', leftContainerRef.current)
        /* height width */
    }, [leftContainerRef])

    const incrementX = () => {
        setTunnelCords({
            ...tunnelCords,
            x: tunnelCords.x + 1,
        })
    }
    const incrementY = () => {
        setTunnelCords({
            ...tunnelCords,
            y: tunnelCords.y + 1,
        })
    }

    useEffect(() => {
        /* increase marios from top to bottom if bottom == 500px then make 0 */
        const interval = setInterval(() => {
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
    /*  */
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
            <MarioPlayer setScore={setScore} time={time} xaxis={marioCords.x} yaxis={marioCords.y} setTime={setTime} setMarioSide={setMarioSide} setMarioCords={setMarioCords}/>
        </div>
    )
}

export default LeftContainer