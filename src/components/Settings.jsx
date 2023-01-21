import React, {useContext} from 'react';
import ReactSlider from 'react-slider';
import '../styles/slider.css';
import settingsContext from "../context/SettingsContext";
import BackButton from "./buttons/BackButton";

const Settings = () => {

    const {workMinutes, breakMinutes, setWorkMinutes, setBreakMinutes, setShowSettings, showSettings } = useContext(settingsContext);

    return (
        <div>
            <label>Work Minutes: {workMinutes}:00</label>
            <ReactSlider
                className='slider'
                thumbClassName="thumb"
                trackClassName="track"
                value={workMinutes}
                min={1}
                max={120}
                onChange={(value) =>setWorkMinutes(value)}
            />
            <label>Break Minutes: {breakMinutes}:00</label>
            <ReactSlider
                className='slider break'
                thumbClassName="thumb"
                trackClassNme="track"
                value={breakMinutes}
                min={1}
                max={20}
                onChange={(value) => setBreakMinutes(value)}
            />
            <div className="back-btn">
                <BackButton onClick={() => setShowSettings(!showSettings)}/>
            </div>
        </div>
    );
};

export default Settings;
