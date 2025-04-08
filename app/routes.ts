import { type RouteConfig, index, route } from "@react-router/dev/routes";
import { useDrawerContext } from "./shared/context/drawerContext";
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
                path: '/Despesas',
                label: 'Despesas',
                icon: 'shopping_cart'
            },
            // {
            //     path: '/faturamento',
            //     label: 'Faturamento',
            //     icon: 'currency_exchange'
            // }
        ]);
    }, []);
}

export default [
    index("pages/login/login.tsx"),
    route("/pagina-inicial", "pages/home/home.tsx"),
    
    /**rotas de saida de dinheiro */
    route("/Despesas", "pages/debt/debt.tsx"),
    route("/Despesas/Detalhe/:id", "pages/debt/detailsDebt.tsx"),
    
    /**rotas de entrada de dinheiro */
    // route("/faturamento", "pages/income/income.tsx"),
] satisfies RouteConfig;