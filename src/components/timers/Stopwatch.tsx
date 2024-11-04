import { useEffect, useState } from 'react';
import ActionButton from '../generic/ActionButton';
import DisplayWindow from '../generic/DisplayWindow';
import Loading from '../generic/Loading';

const Stopwatch = () => {
    //maintains state
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    // The timer set interval increases at 1000 milli seconds
    useEffect(() => {
        let timer: number | undefined;
        if (isRunning) {
            timer = window.setInterval(() => {
                setTime((prevTime: number) => prevTime + 1);
            }, 1000);
        }
        return () => {
            if (timer) clearInterval(timer);
        };
    }, [isRunning]);

    //Toggles between play and pause
    const handlePlayPause = () => {
        setIsRunning((prev: boolean) => !prev);
    };

    //Resets the value to 0 to start the stopwatch again
    const handleReset = () => {
        setIsRunning(false);
        setTime(0);
    };

    //the stop button to change the running state
    const handleStop = () => {
        setIsRunning(false);
    };

    //returns the display window
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
            }}
        >
            <DisplayWindow time={time} />
            <Loading.ActivityButtonContainer>
                <ActionButton name={isRunning ? 'Pause' : 'Play'} key="PausePlay" onClick={handlePlayPause} />
                <ActionButton name="Reset" key="Reset" onClick={handleReset} />
                <ActionButton name="Stop" key="FastForward" onClick={handleStop} />
            </Loading.ActivityButtonContainer>
        </div>
    );
};

export default Stopwatch;
