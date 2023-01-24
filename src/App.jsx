import * as React from "react";
import {useMemo, useState} from "react";
import Timer from "./components/Timer";
import Settings from "./components/Settings";
import SettingsContext from "./context/SettingsContext";
import IconButton from "@mui/material/IconButton";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import {CssBaseline, PaletteMode} from "@mui/material";
import {getDesignTokens} from "./styles/darkTheme";

function App() {
    const [showSettings, setShowSettings] = useState(false);

    const [workMinutes, setWorkMinutes] = useState(25);
    const [breakMinutes, setBreakMinutes] = useState(5);


    const [mode, setMode] = useState("dark");
    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode: PaletteMode) =>
                    prevMode === 'light' ? 'dark' : 'light',
                );
            },
        }),
        [],
    );

    const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
    return (
        <main>
            <SettingsContext.Provider value={{
                workMinutes,
                breakMinutes,
                setWorkMinutes,
                setBreakMinutes,
                showSettings,
                setShowSettings,
                colorMode
            }}>
                <ThemeProvider theme={theme}>
                    <div className="theme-container">
                        <CssBaseline/>
                        <IconButton
                            sx={{ml: 1}}
                            onClick={colorMode.toggleColorMode}
                            className='changeTheme-btn'
                        >
                            {theme.palette.mode === "dark" ? (
                                <Brightness7Icon/>
                            ) : (
                                <Brightness4Icon/>
                            )}
                        </IconButton>
                    </div>
                    {
                        showSettings ? <Settings/> : <Timer/>
                    }
                </ThemeProvider>
            </SettingsContext.Provider>
        </main>
    );
}

export default App;


// https://heroicons.com
