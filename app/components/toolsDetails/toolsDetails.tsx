import {
  Box,
  Button,
  Divider,
  Icon,
  Paper,
  Skeleton,
  Typography,
  useMediaQuery,
  useTheme,
  type Theme,
} from "@mui/material";
import type { ReactNode } from "react";

interface IToolsDetailsProps {
  children?: ReactNode;
  textNewButton?: string;

  showNewButton?: boolean;
  showBackButton?: boolean;
  showDeleteButton?: boolean;
  showSaveButton?: boolean;
  showSaveAndBackButton?: boolean;

  showNewButtonLoading?: boolean;
  showBackButtonLoading?: boolean;
  showDeleteButtonLoading?: boolean;
  showSaveButtonLoading?: boolean;
  showSaveAndBackButtonLoading?: boolean;

  clickNew?: () => void;
  clickBack?: () => void;
  clickDelete?: () => void;
  clickSave?: () => void;
  clickSaveAndBack?: () => void;
}

export const ToolsDetails = ({
  children,
  textNewButton = "novo",

  showNewButton = true,
  showBackButton = true,
  showDeleteButton = true,
  showSaveButton = true,
  showSaveAndBackButton = false,

  showNewButtonLoading = false,
  showBackButtonLoading = false,
  showDeleteButtonLoading = false,
  showSaveButtonLoading = false,
  showSaveAndBackButtonLoading = false,

  clickNew,
  clickBack,
  clickDelete,
  clickSave,
  clickSaveAndBack,
}: IToolsDetailsProps) => {
  const theme = useTheme();
  const smMinor = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
  const mdMinor = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));

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
      {showSaveButton && !showSaveButtonLoading && (
        <Button
          color="primary"
          disableElevation
          variant="contained"
          onClick={clickSave}
          startIcon={<Icon>save</Icon>}
        >
          <Typography
            variant="button"
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
          >
            Salvar
          </Typography>
        </Button>
      )}

      {showSaveButtonLoading && <Skeleton width="118.58px" height="36.5px" />}

      {showSaveAndBackButton &&
        !showSaveAndBackButtonLoading &&
        !smMinor &&
        !mdMinor && (
          <Button
            color="primary"
            disableElevation
            variant="outlined"
            onClick={clickSaveAndBack}
            startIcon={<Icon>save</Icon>}
          >
            <Typography
              variant="button"
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="ellipsis"
            >
              Salvar e Voltar
            </Typography>
          </Button>
        )}

      {showSaveAndBackButtonLoading && !smMinor && !mdMinor && (
        <Skeleton width="186.23px" height="36.5px" />
      )}

      {showNewButton && !showNewButtonLoading && !smMinor && (
        <Button
          color="primary"
          disableElevation
          variant="outlined"
          onClick={clickNew}
          startIcon={<Icon>add</Icon>}
        >
          <Typography
            variant="button"
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
          >
            {textNewButton}
          </Typography>
        </Button>
      )}

      {showNewButtonLoading && !smMinor && (
        <Skeleton width="98.83px" height="36.5px" />
      )}

      {showDeleteButton && !showDeleteButtonLoading && (
        <Button
          color="primary"
          disableElevation
          variant="outlined"
          onClick={clickDelete}
          startIcon={<Icon>delete</Icon>}
        >
          <Typography
            variant="button"
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
          >
            Apagar
          </Typography>
        </Button>
      )}

      {showDeleteButtonLoading && <Skeleton width="115.72px" height="36.5px" />}

      {showBackButton && !smMinor &&
        (showNewButton ||
          showDeleteButton ||
          showSaveButton ||
          showSaveAndBackButton) && (
          <Divider variant="middle" orientation="vertical" />
        )}

      {showBackButton && !showBackButtonLoading && !smMinor && (
        <Button
          color="primary"
          disableElevation
          variant="outlined"
          onClick={clickBack}
          startIcon={<Icon>arrow_back</Icon>}
        >
          <Typography
            variant="button"
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
          >
            Voltar
          </Typography>
        </Button>
      )}

      {showBackButtonLoading && !smMinor && (
        <Skeleton width="112.34px" height="36.5px" />
      )}
    </Box>
  );
};
