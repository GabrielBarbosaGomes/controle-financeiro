import { Button } from "@mui/material";
import type { Route } from "../home/+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <div>
      home
      <Button variant="contained" color="primary">
        teste
      </Button>
    </div>
  );
}
