import { useEffect, useState } from 'react';
import ActionButton from '../generic/ActionButton';
import DisplayWindow from '../generic/DisplayWindow';
import InputField from '../generic/Input';
import Loading from '../generic/Loading';

const Countdown = () => {
    //States being maintained
    const [time, setTime] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let timer: number | undefined;
        //if statement to run countdown and check if time has reached 0
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

    //Toggles between Play and Pause
    const handlePlayPause = () => {
        setIsRunning(prev => !prev);
    };

    //Resets time to what was originally kept
    const handleReset = () => {
        setIsRunning(false);
        setTime(minutes * 60 + seconds);
    };

    //Gets an end to the timer.
    const handleFastForward = () => {
        setIsRunning(false);
        setTime(0);
    };

    //Minute change converts to seconds and assigns set time variable.
    const handleMinuteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Math.max(0, Number.parseInt(e.target.value, 10) || 0);
        setMinutes(value);
        setTime(value * 60 + seconds);
    };

    //seconds used to set the value.
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
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '10px' }}>
                <InputField value={minutes} onChange={handleMinuteChange} placeholder="Min:" min={0} disabled={isRunning} isRunning={isRunning} />
                <InputField value={seconds} onChange={handleSecondChange} placeholder="Sec:" min={0} max={59} disabled={isRunning} isRunning={isRunning} />
            </div>
            <Loading.ActivityButtonContainer>
                <ActionButton name={isRunning ? 'Pause' : 'Play'} key="PausePlay" onClick={handlePlayPause} />
                <ActionButton name="Reset" key="Reset" onClick={handleReset} />
                <ActionButton name="FastForward" key="FastForward" onClick={handleFastForward} />
            </Loading.ActivityButtonContainer>
        </div>
    );
};

export default Countdown;
