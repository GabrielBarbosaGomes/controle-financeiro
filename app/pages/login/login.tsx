import type { Route } from "../login/+types/login";
import { TextField } from "@mui/material";
import logo from "../../assets/img/logo.png";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Controle Financeiro" },
    { name: "description", content: "Controle Financeiro" },
  ];
}

export default function Login() {
  return (
    <div className="flex items-center justify-center flex-col gap-5 h-[100vh]">
      <img
        alt="logo"
        src={logo}
        className="max-w-[20em] max-h-[20em] rounded-[18%]"
      />
      <div className="flex flex-col max-w-4xl gap-2">
        <TextField label="Email" placeholder="email" size="medium" />
        <TextField label="Senha" placeholder="senha" type="password" size="medium" />
      </div>
    </div>
  );
}
