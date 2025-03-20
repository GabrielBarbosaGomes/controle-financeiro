import { Box, Button, Icon, Paper, TextField, useTheme } from "@mui/material";
import type { ReactNode } from "react";

interface IToolsList {
  children?: ReactNode;
  researchText?: string;
  showInputResearch?: boolean;
  changeTextResearch?: (newText: string) => void;
  textButton?: string;
  showButton?: boolean;
  clickButton?: () => void;
}

export const ToolsList = ({
  children,
  researchText = "",
  showInputResearch = false,
  changeTextResearch,
  textButton = "Novo",
  showButton = true,
  clickButton
}: IToolsList) => {
  const theme = useTheme();
  return (
    <Box
      gap={1}
      marginX={1}
      padding={1}
      paddingX={3}
      display="flex"
      alignItems="center"
      height={theme.spacing(6)}
      component={Paper}
    >
      {showInputResearch && (<TextField
        size="small"
        placeholder="pesquisar..."
        value={researchText}
        onChange={(e) => changeTextResearch?.(e.target.value)}
      />)}

      <Box flex={1} display="flex" justifyContent="end">
        {showButton && (<Button
          color="primary"
          disableElevation
          variant="contained"
          onClick={clickButton}
          endIcon={<Icon>add</Icon>}
        >
          {textButton}
        </Button>)}
      </Box>
    </Box>
  );
};
