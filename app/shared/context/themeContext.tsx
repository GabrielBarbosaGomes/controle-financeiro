import { ThemeProvider } from "@mui/material";
import { Box } from "@mui/system";
import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { DarkTheme } from "~/shared/themes/dark";
import { LightTheme } from "~/shared/themes/light";

interface IThemeContextData{
    themeName: 'dark' | 'light';
    toggleTheme: () => void;
}

interface IThemeProviderProps{
    children: ReactNode;
}

const ThemeContext = createContext({} as IThemeContextData);

export const useAppThemeProvider = () => {
    return useContext(ThemeContext);
}

export const AppThemeProvider = ({children}: IThemeProviderProps) => {
    const [themeName, setThemeName] = useState<'dark' | 'light'>('light');

    const toggleTheme = useCallback(()=>{
        setThemeName(oldThemeName => oldThemeName === 'light' ? 'dark' : 'light')
    },[]);

    const theme = useMemo(() => {
        if(themeName === 'light') return LightTheme

        return DarkTheme
    },[themeName])

    return(
        <ThemeContext.Provider value={{themeName, toggleTheme}}>
            <ThemeProvider theme={theme}>
                <Box width="100W" height="100vh" bgcolor={theme.palette.background.default}>
                    {children}
                </Box>
            </ThemeProvider>
        </ThemeContext.Provider>
    )
}