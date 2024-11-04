import { useEffect, useState } from 'react';
import DisplayWindow from '../generic/DisplayWindow';
import Loading from '../generic/Loading';

const Stopwatch = () => {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

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

    const handlePlayPause = () => {
        setIsRunning((prev: boolean) => !prev);
    };

    const handleReset = () => {
        setIsRunning(false);
        setTime(0);
    };

    const handleStop = () => {
        setIsRunning(false);
    };

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
                <Loading.PlayButton key="PlayPause" onClick={handlePlayPause}>
                    {isRunning ? 'Pause' : 'Play'}
                </Loading.PlayButton>
                <Loading.PlayButton key="Reset" onClick={handleReset}>
                    Reset
                </Loading.PlayButton>
                <Loading.PlayButton key="FastForward" onClick={handleStop}>
                    Stop
                </Loading.PlayButton>
            </Loading.ActivityButtonContainer>
        </div>
    );
};

export default Stopwatch;
