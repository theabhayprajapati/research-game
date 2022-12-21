import { useEffect, useState } from 'react';

let interval;
export const Stopwatch = ({ isRunning, milliseconds, setMilliseconds }) => {
    const [duration, setDuration] = useState(milliseconds);

    useEffect(() => {
        if (isRunning) {
            interval = setInterval(() => {
                console.log(duration + " : " + milliseconds);
                setMilliseconds((prev: number) => prev + 100);
            }, 100);
        } else if (!isRunning && milliseconds !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isRunning, milliseconds]);

    useEffect(() => {
        let interval = null;
        if (isRunning) {
            interval = setInterval(() => {
                setDuration(milliseconds);
            }, 100);
        } else if (!isRunning && milliseconds !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isRunning, milliseconds]);

    return (
        <div className='m-5'
            style={{
                zIndex: 100,
            }}
        >
            <p className='font-bold text-4xl' id="stopwatch">
                {milliseconds}
            </p>
        </div>
    );
};