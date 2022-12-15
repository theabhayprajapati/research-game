import { useEffect, useState } from 'react';

export const Stopwatch = ({ isRunning, milliseconds, setMilliseconds }) => {

    const [duration, setDuration] = useState(milliseconds);

    useEffect(() => {
        let interval = null;
        if (isRunning) {
            interval = setInterval(() => {
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

    const seconds = Math.floor(duration / 1000);
    const centiseconds = Math.floor((duration % 1000) / 10);

    return (
        <div className='m-5'>
            <p className='font-bold text-4xl'>
                {seconds}.{centiseconds}
            </p>
        </div>
    );
};