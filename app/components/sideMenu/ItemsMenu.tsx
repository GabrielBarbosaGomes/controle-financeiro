import { Icon, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useMatch, useNavigate, useResolvedPath } from "react-router";

interface ItensMenuProps {
  label: string;
  icon: string;
  to: string;
  onClick: (() => void) | undefined;

}

export const ItemsMenu = ({ label, icon, to, onClick }: ItensMenuProps) => {
    const navigate = useNavigate()
    const resolvedPath = useResolvedPath(to);
    const match = useMatch({path: resolvedPath.pathname, end: false});

    const handleClick = () => {
        navigate(to);
        onClick?.();
    }

  return (
    <ListItemButton selected={!!match} onClick={handleClick}>
      <ListItemIcon>
        <Icon>{icon}</Icon>
      </ListItemIcon>
      <ListItemText primary={label} />
    </ListItemButton>
  );
};
