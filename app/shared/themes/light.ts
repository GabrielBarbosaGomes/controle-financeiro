import {createTheme} from '@mui/material';
import { blue, grey } from '@mui/material/colors';

export const LightTheme = createTheme({
    palette: {
        primary:{
            main: blue[300],
            dark: blue[800],
            contrastText: '#fff'
        },
        secondary:{
            main: grey[600],
            dark: blue[200],
            contrastText: '#fff'
        },
        background:{
            default: '#b2d0e78f',
            paper: blue[50]
        }
    }
});