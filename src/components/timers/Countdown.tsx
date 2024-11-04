import { useEffect, useState } from 'react';
import DisplayWindow from '../generic/DisplayWindow';
import Loading from '../generic/Loading';

const Countdown = () => {
    const [time, setTime] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let timer: number | undefined;
        if (isRunning && time > 0) {
            timer = setInterval(() => {
                setTime(prevTime => prevTime - 1);
            }, 1000);
        } else if (time === 0) {
            setIsRunning(false);
        }
        return () => {
            if (timer) clearInterval(timer);
        };
    }, [isRunning, time]);

    const handlePlayPause = () => {
        setIsRunning(prev => !prev);
    };

    const handleReset = () => {
        setIsRunning(false);
        setTime(minutes * 60 + seconds);
    };

    const handleFastForward = () => {
        setIsRunning(false);
        setTime(0);
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

export default Countdown;
