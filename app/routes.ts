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
            {
                path: '/Faturamento',
                label: 'Faturamento',
                icon: 'currency_exchange'
            }
        ]);
    }, []);
}

export default [
    index("pages/login/login.tsx"),
    route("/pagina-inicial", "pages/home/home.tsx"),

    /**rotas de saida de dinheiro */
    route("/Despesas", "pages/debt/debtList.tsx"),
    route("/Despesas/Mes/:mes", "pages/debt/debt.tsx"),
    route("/Despesas/Fixed/Detalhe/:id", "pages/debt/detailsDebtFixed.tsx"),
    route("/Despesas/Variables/Detalhe/:id", "pages/debt/detailsDebtVariable.tsx"),

    /**rotas de entrada de dinheiro */
    route("/Faturamento", "pages/income/income.tsx"),
    route("/Faturamento/Detalhe/:id", "pages/income/detailsIncome.tsx"),
] satisfies RouteConfig;