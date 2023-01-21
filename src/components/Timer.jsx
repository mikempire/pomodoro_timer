import React, {useContext, useEffect, useRef, useState} from 'react';
import {buildStyles, CircularProgressbarWithChildren} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import PlayButton from "./buttons/PlayButton";
import PauseButton from "./buttons/PauseButton";
import SettingsButton from "./buttons/SettingsButton";
import settingsContext from "../context/SettingsContext";
import ring from "../ring.mp3";
import CheckButton from "./buttons/CheckButton";

const Timer = () => {
    const {
        workMinutes,
        breakMinutes,
        setWorkMinutes,
        setBreakMinutes,
        showSettings,
        setShowSettings
    } = useContext(settingsContext);

    const [isPaused, setIsPaused] = useState(true);
    const [mode, setMode] = useState('work'); // work-break-null
    const [secondLeft, setSecondLeft] = useState(0);

    const secondsLeftRef = useRef(secondLeft);
    const isPausedRef = useRef(isPaused);
    const modeRef = useRef(mode);

    function switchMode() {
        const nextMode = modeRef.current === 'work' ? 'break' : 'work';
        const nextSeconds = (nextMode === 'work' ? workMinutes : breakMinutes) * 60;
        setMode(nextMode);
        modeRef.current = nextMode;
        setSecondLeft(nextSeconds);
        secondsLeftRef.current = nextSeconds;
    }

    function playRing() {
        new Audio(ring).play()
    }

    function initTimer() {
        secondsLeftRef.current = workMinutes * 60;
        setSecondLeft(secondsLeftRef.current);
    }

    function tick() {
        secondsLeftRef.current--;
        setSecondLeft(secondsLeftRef.current)
    }


    useEffect(() => {
        initTimer();

        const interval = setInterval(() => {
            if (isPausedRef.current) {
                return;
            }
            if (secondsLeftRef.current === 0) {
                playRing()
                return switchMode()
            }
            tick()
        }, 100)

        return () => clearInterval(interval);

    }, [workMinutes,
        breakMinutes,
        setWorkMinutes,
        setBreakMinutes,
        showSettings,
        setShowSettings, isPausedRef])

    const totalSeconds = mode === 'work'
        ? workMinutes * 60
        : breakMinutes * 60;

    const percentage = Math.round(secondLeft / totalSeconds * 100)

    let minutes = Math.floor(secondLeft / 60);
    let seconds = secondLeft % 60;
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    if (seconds < 10) {
        seconds = `0${seconds}`;
    }


    function pause() {
        setIsPaused(true);
        isPausedRef.current = true
    }

    function play() {
        setIsPaused(false);
        isPausedRef.current = false
    }

    function doneTimer () {
        playRing();
        switchMode()
    }

    return (
        <div>
            <CircularProgressbarWithChildren
                value={percentage}
                text={`${minutes}: ${seconds}`}
                styles={buildStyles({
                    textColor: "#E5BFB8",
                    pathColor: mode === 'work' ? "#FF6B6B" : "#4ECDC4",
                    trailColor: "white"
                })}
            />
            <div className="control-btns">
                {
                    isPaused ? <PlayButton onClick={play}/>
                        : <PauseButton onClick={pause}/>
                }
                <CheckButton onClick={doneTimer}/>
            </div>
            <div className="setting-btn">
                <SettingsButton onClick={() => setShowSettings(!showSettings)}/>
            </div>
        </div>
    );
};

export default Timer;
