import {
  Avatar,
  Divider,
  Drawer,
  Icon,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import { Box, useMediaQuery } from "@mui/system";
import { useDrawerContext } from "~/context/drawerContext";
import { ItemsMenu } from "./ItemsMenu";
import { optionsSideMenu } from "~/routes";
import { useAppThemeProvider } from "~/context/themeContext";
// import HomeIcon from '@mui/icons-material/Home';

interface SideMenuProps {
  children?: React.ReactNode;
}

export const SideMenu = ({ children }: SideMenuProps) => {
  const theme = useTheme();
  const smMinor = useMediaQuery(theme.breakpoints.down("sm"));
  const { isDrawerOpen, toggleDrawerOpen, drawerOptions } = useDrawerContext();
  optionsSideMenu();
  const { themeName, toggleTheme } = useAppThemeProvider();

  return (
    <>
      <Drawer
        open={isDrawerOpen}
        variant={smMinor ? "temporary" : "permanent"}
        onClose={toggleDrawerOpen}
      >
        <Box
          width={theme.spacing(28)}
          height="100%"
          display="flex"
          flexDirection="column"
        >
          <Box
            width="100%"
            height={theme.spacing(20)}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Avatar
              sx={{
                height: theme.spacing(12),
                width: theme.spacing(12),
              }}
              src="https://avatars.githubusercontent.com/u/93801727?v=4"
            />
          </Box>

          <Divider />

          <Box flex={1}>
            <List component="nav">
              {drawerOptions.map((drawerOption) => (
                <ItemsMenu
                  key={drawerOption.path}
                  icon={drawerOption.icon}
                  label={drawerOption.label}
                  to={drawerOption.path}
                  onClick={smMinor ? toggleDrawerOpen : undefined}
                />
              ))}
            </List>
          </Box>

          <Box>
            <List component="nav">
              <ListItemButton onClick={toggleTheme}>
                <ListItemIcon>
                  <Icon>{themeName === 'light' ? 'dark_mode' : 'light_mode'}</Icon>
                </ListItemIcon>
                <ListItemText primary={`Aparência: ${themeName === 'light' ? 'Escuro' : 'Claro'}`}/>
              </ListItemButton>
            </List>
          </Box>
        </Box>
      </Drawer>
      <Box
        height="100vh"
        marginLeft={smMinor ? 0 : theme.spacing(28)}
        padding={2}
      >
        {children}
      </Box>
    </>
  );
};
