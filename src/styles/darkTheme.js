import {PaletteMode} from "@mui/material";
import {blueGrey, grey, lightBlue} from '@mui/material/colors';

export const getDesignTokens = (mode: PaletteMode) => ({
    palette: {
        mode,
        ...(mode === 'light'
            ? {
                // palette values for dark mode
                primary: lightBlue,
                background: {
                    default: lightBlue[600],
                },
                text: {
                    primary: '#fff',
                },
            }
            : {
                // palette values for light mode
                primary: grey,
                background: {
                    default: grey[900],
                },
                text: {
                    primary: blueGrey[100],
                },
            }),
    },
});
