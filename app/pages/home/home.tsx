import type { Route } from "../home/+types/home";
import { LayoutPage } from "~/shared/layouts/layoutPages";
import { ToolsList } from "~/components/toolsList/toolsList";
import { ToolsDetails } from "~/components/toolsDetails/toolsDetails";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <>home</>
  );
}
