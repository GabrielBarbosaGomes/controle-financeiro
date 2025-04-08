import {
  IconButton,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
  type Theme,
} from "@mui/material";
import { Box } from "@mui/system";
import Icon from "@mui/material/Icon";
import { useDrawerContext } from "~/shared/context/drawerContext";

interface ILayoutPage {
  children?: React.ReactNode;
  titulo: string;
  barraDeFerramentas?: React.ReactNode;
}

export const LayoutPage = ({
  children,
  titulo,
  barraDeFerramentas,
}: ILayoutPage) => {
  const smMinor = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
  const mdMinor = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));
  const theme = useTheme();
  const { toggleDrawerOpen } = useDrawerContext();

  return (
    <Box height="100%" display="flex" flexDirection="column" gap={1}>
      <Box
        display="flex"
        alignItems="center"
        padding={1}
        height={theme.spacing(smMinor? 6 : mdMinor? 8 : 12)}
        gap={1}
      >
        {smMinor && (
          <IconButton onClick={toggleDrawerOpen}>
            <Icon>menu</Icon>
          </IconButton>
        )}

        <Typography
            variant={smMinor? "h5" : mdMinor? "h4" : "h3"}
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
        >
            {titulo}
        </Typography>
      </Box>

      {barraDeFerramentas && (<Box display="flex" flexDirection="column" gap={1}>{barraDeFerramentas}</Box>)}

      <Box 
      flex={1} 
      overflow="auto" 
      component={Paper}
      marginX={1}
      padding={1}
      paddingX={3}
      height={theme.spacing(6)}
      >
        {children}
        </Box>
    </Box>
  );
};
