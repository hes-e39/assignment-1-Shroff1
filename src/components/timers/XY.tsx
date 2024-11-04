import { useEffect, useState } from 'react';
import DisplayWindow from '../generic/DisplayWindow';
import Loading from '../generic/Loading';

const XY = () => {
    const [time, setTime] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [repititions, setRepetitions] = useState(1);
    const [currentRepeat, setCurrentRepeat] = useState(0);
    const [isCountingDown, setIsCountingDown] = useState(false);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let timer: number | undefined;
        if (isRunning && time > 0) {
            setIsCountingDown(true);
            timer = setInterval(() => {
                setTime(prevTime => {
                    if (prevTime === 1) {
                        if (currentRepeat < repititions - 1) {
                            setCurrentRepeat(prev => prev + 1);
                            return minutes * 60 + seconds;
                        } else {
                            setIsRunning(false);
                            return 0;
                        }
                    }
                    return prevTime - 1;
                });
            }, 1000);
        } else if (time === 0) {
            setIsRunning(false);
            setIsCountingDown(false);
        }
        return () => {
            if (timer) clearInterval(timer);
        };
    }, [isRunning, time, repititions, currentRepeat, minutes, seconds]);

    const handlePlayPause = () => {
        if (!isRunning) {
            setCurrentRepeat(0);
            setTime(minutes * 60 + seconds);
        }
        setIsRunning(prev => !prev);
    };

    const handleReset = () => {
        setIsRunning(false);
        setCurrentRepeat(0);
        setTime(minutes * 60 + seconds);
    };

    const handleFastForward = () => {
        setIsRunning(false);
        setTime(0);
        setCurrentRepeat(0);
    };

    const handleMinuteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Math.max(0, Number.parseInt(e.target.value, 10) || 0);
        setMinutes(value);
        setTime(value * 60 + seconds);
    };

    const handleSecondChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = Math.max(0, Number.parseInt(e.target.value, 10) || 0);
        value = value > 59 ? 59 : value;
        setSeconds(value);
        setTime(minutes * 60 + value);
    };

    const handleRepititionsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Math.max(1, Number.parseInt(e.target.value, 10) || 1);
        setRepetitions(value);
        setCurrentRepeat(0);
        setTime(minutes * 60 + seconds);
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
            <div style={{ marginBottom: '10px' }}>
                <label style={{ fontSize: '0.5rem' }}>
                    Min:
                    <input
                        type="number"
                        value={minutes}
                        onChange={handleMinuteChange}
                        placeholder="Minutes"
                        min="0"
                        style={{ padding: '5px', width: '60px', marginRight: '5px', backgroundColor: isRunning ? '#d3d3d3' : 'White' }}
                        disabled={isRunning}
                    />
                </label>
                <label style={{ marginLeft: '20px', fontSize: '0.5rem' }}>
                    Sec:
                    <input
                        type="number"
                        value={seconds}
                        onChange={handleSecondChange}
                        placeholder="Seconds"
                        min="0"
                        max="59"
                        style={{ padding: '5px', width: '60px', backgroundColor: isRunning ? '#d3d3d3' : 'White' }}
                        disabled={isRunning}
                    />
                </label>
                <label style={{ marginLeft: '20px', fontSize: '0.5rem' }}>
                    Reps:
                    <input
                        type="number"
                        value={repititions}
                        onChange={handleRepititionsChange}
                        placeholder="Repitions"
                        min="1"
                        aria-label="Repititions"
                        style={{ padding: '5px', width: '60px', backgroundColor: isRunning ? 'd3d3d3' : 'White' }}
                        disabled={isCountingDown}
                    />
                </label>
            </div>
            <Loading.ActivityButtonContainer>
                <Loading.PlayButton key="PlayPause" onClick={handlePlayPause}>
                    {isRunning ? 'Pause' : 'Play'}
                </Loading.PlayButton>
                <Loading.PlayButton key="Reset" onClick={handleReset}>
                    Reset
                </Loading.PlayButton>
                <Loading.PlayButton key="FastForward" onClick={handleFastForward}>
                    FastForward
                </Loading.PlayButton>
            </Loading.ActivityButtonContainer>
        </div>
    );
};

export default XY;
