import Timer from "./components/Timer";
import Settings from "./components/Settings";
import {useState} from "react";
import SettingsContext from "./context/SettingsContext";

function App() {
    const [showSettings, setShowSettings] = useState(false);

    const [workMinutes, setWorkMinutes] = useState(25)
    const [breakMinutes, setBreakMinutes] = useState(5)
    return (
        <main>
            <SettingsContext.Provider value={{
                workMinutes,
                breakMinutes,
                setWorkMinutes,
                setBreakMinutes,
                showSettings,
                setShowSettings
            }}>
                {
                    showSettings ? <Settings/> : <Timer/>
                }
            </SettingsContext.Provider>
        </main>
    );
}

export default App;