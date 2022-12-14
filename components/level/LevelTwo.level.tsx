import { useEffect, useRef, useState } from "react";
import { randomNumberBW } from "../../globals/methods";
import { MarioPlayer } from "../characters/Mario.character";
import { StopWatch } from "../component/left/leftcontainer.left";

/* generate random true false */
export const generateRandomBooleanState = () => {
    return Math.random() >= 0.5;
};
const MARIO_WIDTH = 50;
const MARIO_HEIGHT = 50;
const TUNNEL_WIDTH = 80;
const TUNNEL_HEIGHT = 80;
var BOARD_HEIGHT;
var BOARD_WIDTH;
type boardSizeT = {
    height: number;
    width: number;
}
var interval;
const randomInitBool = generateRandomBooleanState();
const LevelTwo = ({ setScore }) => {
    // const [tunnelCords, setTunnelCords] = useState({
    //     x: 0,
    //     y: 0,
    // });
    const [tunnelOneCords, setTunnelOneCords] = useState({
        x: 0,
        y: 0,
    });
    const [tunnelTwoCords, setTunnelTwoCords] = useState({
        x: 0,
        y: 0,
    });

    const [marioCords, setMarioCords] = useState({
        x: 0,
        y: 0,
    });
    const [boardSize, setBoardSize] = useState<boardSizeT>({
        height: 0,
        width: 0,
    });
    const [marioSide, setMarioSide] = useState(randomInitBool);
    const [time, setTime] = useState("0");
    const leftContainerRef = useRef(null);
    const leftTunnelRef = useRef(null);
    const rightTunnelRef = useRef(null);

    useEffect(() => {
        const height = leftContainerRef.current.clientHeight;
        const width = leftContainerRef.current.clientWidth;
        console.log(height, width);
        setBoardSize({
            height,
            width,
        });

        generateRandomBooleanState() ? setMarioSide(true) : setMarioSide(false);
        setTunnelOneCords({
            x: width / 2 / 2 - TUNNEL_WIDTH / 2,
            y: height - TUNNEL_HEIGHT,
        });
        setTunnelTwoCords({
            x: (width / 2) * 1.5 + width / 2 - TUNNEL_WIDTH / 2,
            y: height - TUNNEL_HEIGHT,
        });
        /* print */
        console.log("tunnelOneCords", tunnelOneCords);
        console.log("tunnelTwoCords", tunnelTwoCords);
        /* consts */
        console.log("width", width);
        console.log({
            MARIO_WIDTH,
        });
        setMarioSide(generateRandomBooleanState())
        console.log("marioSide", marioSide);
        setMarioCords({
            y: 0,
            x: marioSide ? (((width / 2) / 2) - MARIO_WIDTH / 2) : (((width / 2) * 1.5) - MARIO_WIDTH / 2),
        });
        return console.log("leftContainerRef.current", leftContainerRef.current);
    }, [leftContainerRef]);


    useEffect(() => {
        /* increase marios from top to bottom if bottom == 500px then make 0 */
        interval = setInterval(() => {
            /* get xaxis of leftTunnelRef, RightTunnelRef */
            setMarioCords({
                ...marioCords,
                x: 100,
            });
            /* y: marioCords.y > 440 ? 0 : marioCords.y + 10, */
            if (marioCords.y > 440) {
                setMarioCords({
                    ...marioCords,
                    y: 0,
                });
                console.log("Logging Mario...");
            } else {
                setMarioCords({
                    ...marioCords,
                    y: marioCords.y + 10,
                });
            }

        }, 100);
        return () => clearInterval(interval);
    }, [marioCords]);

    useEffect(() => {
        // Listen for keydown events
        document.addEventListener('keydown', handleClickRemoveMario);
        // Clean up event listener on unmount
        return () => {
            document.removeEventListener('keydown', handleClickRemoveMario);
        };
    }, []);

    const marioCreation = async () => {
        console.log("marioCreation");
        clearInterval(interval);
        await sleep(randomNumberBW(2000, 100000));
        setMarioSide(generateRandomBooleanState());
        setMarioCords({
            y: 0,
            x: marioSide ? (((boardSize.width / 2) / 2) - MARIO_WIDTH / 2) : (((boardSize.width / 2) * 1.5) - MARIO_WIDTH / 2),
        });
    }
    /* track for handleClick Remove mario fn */

    const handleClickRemoveMario = async (event) => {
        /* right arrow key */
        if (event.keyCode === 37) {
            if (marioSide == true) {
                alert('Great Job!');
            } else {
                alert('Wrong Side');
            }
            /* pause for 10 seconds */
            await marioCreation();
            await sleep(randomNumberBW(2000, 100000));

        } else if (event.keyCode === 39) {

            if (marioSide == false) {
                await alert('Great Job!');

            } else {
                alert('Wrong Side');

            }
            await marioCreation();
            await sleep(randomNumberBW(2000, 100000));
        }
        return;

    }


    /* onclick sleep() and start set mario y 0 */
    const sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    return (
        <div
            className="relative  col-span-2 border bg-green-400  w-[682px] md:h-[502px]"
            ref={leftContainerRef}
        >
            <div className="absolute flex justify-around bottom-0 left-0 right-0 border-dotted border-2 border-black h-20">
                <div className="tunnel bg-blue-500 h-20 w-20"></div>
                <div className="tunnel bg-gray-500 h-20 w-20"></div>
            </div>
            <StopWatch
                setScore={setScore}
                setMarioSide={setMarioSide}
                setMarioCords={setMarioCords}
                time={time}
                setTime={setTime}
            />
            <MarioPlayer
                xaxis={marioCords.x}
                yaxis={marioCords.y}
                setMarioCords={setMarioCords}
                setTime={setTime}
                setScore={setScore}
                time={time}
                handleClickRemoveMario={() => {
                    console.log("clicked");
                }}
            />
        </div>
    );
};

export default LevelTwo;
