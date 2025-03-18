import type { Route } from "../login/+types/login";
import Input from "@mui/joy/Input";
import logo from "../../assets/img/logo.png";
import { Button } from "@mui/material";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Login() {
  return (
    <div className="flex items-center justify-center flex-col gap-5">
      <img alt="logo" src={logo} className="max-w-[8em] max-h-[8em]" />
      <div className="flex flex-col max-w-4xl gap-2">
        <Input color="primary" placeholder="email" size="md" />
        <Input color="primary" placeholder="senha" size="md" />
        <Button variant="contained">
          Logar
        </Button>
      </div>
    </div>
  );
}
