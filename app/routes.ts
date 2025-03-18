import { type RouteConfig, index, route } from "@react-router/dev/routes";
import { useDrawerContext } from "./context/drawerContext";
import { useEffect } from "react";

export function optionsSideMenu() {
    const { setDrawerOptions } = useDrawerContext();

    useEffect(() => {
        setDrawerOptions([
            {
                path: '/home',
                label: 'Página Inicial',
                icon: 'home'
            },
            {
                path: '/cidades',
                label: 'cidades',
                icon: 'star'
            }
        ]);
    }, []);
}

export default [
    index("pages/login/login.tsx"),
    route("/home", "pages/home/home.tsx")
] satisfies RouteConfig;