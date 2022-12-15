
import { useEffect, useRef, useState } from 'react';
import { INITAL_MARIO_CORDS, INITAL_TUNNEL_CORDS, LEFTKEYCODE, MARIO_HEIGHT, MARIO_WIDTH, RIGHTKEYCODE, TUNNEL_HEIGHT, TUNNEL_WIDTH } from '../../../globals/constants';
import { generateRandomBooleanState, sleep } from '../../../globals/methods';
import { MarioPlayer } from '../../characters/Mario.character';
import Tunnel from '../../characters/Tunnel';
import { Stopwatch } from '../Stopwatch';
const debug = (message: any) => console.log(`[TwoTunnelLevel.tsx]`, message);

type Side = 'left' | 'right';
const TwoTunnelLevel = () => {
    const [showMario, setShowMario] = useState(false);
    const [tunnelOneCords, setTunnelOneCords] = useState(INITAL_TUNNEL_CORDS);
    const [tunnelTwoCords, setTunnelTwoCords] = useState(INITAL_TUNNEL_CORDS);
    const [marioCords, setMarioCords] = useState(INITAL_MARIO_CORDS);
    const [isRunning, setIsRunning] = useState(false);
    const [marioSide, setMarioSide] = useState(true);
    const [currentSide, setCurrentSide] = useState<Side>('left');
    const [milliseconds, setMilliseconds] = useState(0);
    const leftContainerRef = useRef(null);
    const marioRef = useRef(null);
    useEffect(() => {
        setIsRunning(true);
        const { height, width } = leftContainerRef.current.getBoundingClientRect();
        setTunnelOneCords({
            x: ((width / 2) / 2) - TUNNEL_WIDTH / 2,
            y: height - TUNNEL_HEIGHT,
        });
        setTunnelTwoCords({
            x: ((width / 2) * 1.5) - (TUNNEL_WIDTH / 2),
            y: height - TUNNEL_HEIGHT,
        });
        var side = generateRandomBooleanState();
        setShowMario(true);
        setMarioSide((prev) => side);
        setCurrentSide(side == true ? 'left' : 'right');
        sleep(0).then(() => {
            console.log(width);
            var marioXaxisLeft = (((width / 2) / 2) - MARIO_WIDTH / 2);
            var marioXaxisRight = (((width / 2) * 1.5) - MARIO_WIDTH / 2);
            console.log({
                side, marioSide, currentSide
            });
            setMarioCords({
                y: 0,
                x: side == true ? marioXaxisLeft : marioXaxisRight,
            })
        });
    }, [leftContainerRef]);
    const getMarioSide = () => {
        const { width } = leftContainerRef.current.getBoundingClientRect();
        const { x } = marioRef.current.getBoundingClientRect();
        if (x < (width / 2)) {
            return false;
        } else {
            return true;
        }
    }

    useEffect(() => {
        document.addEventListener("keydown", handleClickRemoveMario);
        return () => {
            document.removeEventListener("keydown", handleClickRemoveMario);
        };
    }, []);
    const handleClickRemoveMario = (event) => {
        switch (event.keyCode) {
            case LEFTKEYCODE:
                handleLeftKey(event);
                break;
            case RIGHTKEYCODE:
                handleRightKey(event);
                break;
            default:
                break;
        };
    };

    const handleLeftKey = (event) => {
        const { width } = leftContainerRef.current.getBoundingClientRect();
        setShowMario(false);
        debug({ key: event.keyCode, LEFTKEYCODE, marioSide });
        if (getMarioSide() === false) {
            alert("Great Job!");
            debug("Great Job!");
        } else {
            alert("Wrong Side");
            debug("Wrong Side");
        }
        setMilliseconds(0);
        setIsRunning(false);
        setTimeout(() => {
            const marioXaxisLeft = (((width / 2) / 2) - MARIO_WIDTH / 2);
            const marioXaxisRight = (((width / 2) * 1.5) - MARIO_WIDTH / 2);
            const side = generateRandomBooleanState();
            debug(side);
            setMarioCords({
                y: 0,
                x: side === true ? marioXaxisLeft : marioXaxisRight,
            });
            setIsRunning(true);
            setShowMario(true);
            debug(marioCords);
        }, 0);

    };


    const handleRightKey = (event) => {
        const { width } = leftContainerRef.current.getBoundingClientRect();
        setShowMario(false);
        debug({ key: event.keyCode, RIGHTKEYCODE, marioSide });
        if (getMarioSide() === true) {
            alert("Great Job!");
            debug("Great Job!");
        } else {
            alert("Wrong Side");
            debug("Wrong Side");

        };
        setMilliseconds(0);
        setIsRunning(false);
        setTimeout(() => {
            const marioXaxisLeft = (((width / 2) / 2) - MARIO_WIDTH / 2);
            const marioXaxisRight = (((width / 2) * 1.5) - MARIO_WIDTH / 2);
            const side = generateRandomBooleanState();
            debug(side);
            setMarioCords({
                y: 0,
                x: side === true ? marioXaxisLeft : marioXaxisRight,
            });
            setIsRunning(true);
            setShowMario(true);
            debug(marioCords);
        }, 0);
    };

    useEffect(() => {
        /* increase marios from top to bottom if bottom == 500px then make 0 */
        const interval = setInterval(() => {
            // clearInterval(interval)
            debug(showMario);
            if (marioCords.y === (leftContainerRef.current.clientHeight - MARIO_HEIGHT)) {
                setMarioCords({
                    ...marioCords,
                    y: 0,
                })
            }
            setMarioCords({
                ...marioCords,
                y: marioCords.y > 440 ? 0 : marioCords.y + 10,
            })
        }, 100)
        return () => clearInterval(interval)
    }, [marioCords])

    return (
        <div
            className="relative  col-span-2 bg-green-400  w-full md:h-[502px]"
            ref={leftContainerRef}
            style={{
                backgroundImage: "url(https://researchone-game.vercel.app/images/bg2.webp)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                /* light green color over the image */
                backgroundColor: marioSide ? "red" : "blue",
            }}
        >
            <div className="absolute flex justify-around bottom-0 left-0 right-0">
                <Tunnel xaxis={tunnelOneCords.x} yaxis={tunnelOneCords.y} />
                <Tunnel xaxis={tunnelTwoCords.x} yaxis={tunnelTwoCords.y} />
            </div>
            <div className="absolute flex justify-around bottom-0 left-0 right-0">
                {
                    marioSide ? (
                        <p>
                            <span className="text-2xl text-white">Left</span>
                        </p>
                    ) : (
                        <p>
                            <span className="text-2xl text-white">Right</span>
                        </p>
                    )
                }
            </div>
            <Stopwatch isRunning={isRunning} milliseconds={milliseconds} setMilliseconds={setMilliseconds} />
            {showMario && (
                <MarioPlayer
                    marioRef={marioRef}
                    xaxis={marioCords.x}
                    yaxis={marioCords.y}
                />
            )}
        </div>
    )
}

export default TwoTunnelLevel