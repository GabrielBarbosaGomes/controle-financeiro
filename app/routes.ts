import { type RouteConfig, index, route } from "@react-router/dev/routes";
import { useDrawerContext } from "./context/drawerContext";
import { useEffect } from "react";

export function optionsSideMenu() {
    const { setDrawerOptions } = useDrawerContext();

    useEffect(() => {
        setDrawerOptions([
            {
                path: '/pagina-inicial',
                label: 'Página Inicial',
                icon: 'home'
            },
            {
                path: '/gastos',
                label: 'Gastos',
                icon: 'star'
            }
        ]);
    }, []);
}

export default [
    index("pages/login/login.tsx"),
    route("/pagina-inicial", "pages/home/home.tsx"),
    route("/gastos", "pages/expenses/expenses.tsx")
] satisfies RouteConfig;