import { createContext, useCallback, useContext, useState } from "react";

interface IDrawerOption{
    path: string;
    label: string;
    icon: string;
}

interface IDrawerContextData {
    isDrawerOpen: boolean,
    drawerOptions: IDrawerOption[],
    setDrawerOptions: (newDrawerOptions: IDrawerOption[]) => void,
    toggleDrawerOpen: () => void
}

interface DrawerContextProps {
    children?: React.ReactNode;
}

const DrawerContext = createContext({} as IDrawerContextData);

export const  useDrawerContext = () => {
    return useContext(DrawerContext);
}

export const DrawerProvider = ({ children }: DrawerContextProps )=> {
    const [isDrawerOpen, setIsDrawerOpen ] = useState(false);
    const [drawerOptions, setDrawerOptions ] = useState<IDrawerOption[]>([]);

    const toggleDrawerOpen = useCallback(()=>{
        setIsDrawerOpen(OldDrawerOpen => !OldDrawerOpen);
    },[])
    
    const handleSetDrawerOptions = useCallback((newDrawerOptions: IDrawerOption[])=>{
        setDrawerOptions(newDrawerOptions);
    },[])

    return (
        <DrawerContext.Provider value={{isDrawerOpen, drawerOptions, toggleDrawerOpen, setDrawerOptions: handleSetDrawerOptions}}>
            {children}
        </DrawerContext.Provider>
    )
}