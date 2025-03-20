import type { Route } from "../home/+types/home";
import { LayoutPage } from "~/shared/layouts/layoutPages";
import { ToolsList } from "~/components/toolsList/toolsList";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <LayoutPage 
        titulo="Dashboard"
        // barraDeFerramentas={(<ToolsList showInputResearch textButton="Teste"/>)}
        >
            aaaaaaaaaaaaa
        </LayoutPage>
  );
}
