import { Outlet } from "react-router";
import { SideMenu } from "~/components/sideMenu/sideMenu";

export default function LayoutAuth() {
  return (
    <SideMenu>
      <Outlet />
    </SideMenu>
  );
}
