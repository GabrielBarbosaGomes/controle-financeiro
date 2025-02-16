import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("pages/login/login.tsx"),
    route("/home", "pages/home/home.tsx")
] satisfies RouteConfig;
