import {createTheme} from '@mui/material';
import { blue, grey } from '@mui/material/colors';

export const DarkTheme = createTheme({
    palette: {
        mode: 'dark',
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
            default: "#303134",
            paper: "#202124"
        }
    },
    typography:{
        allVariants:{
            color: 'white'
        }
    }
});