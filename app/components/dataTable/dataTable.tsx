import { Icon, IconButton, LinearProgress, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from "@mui/material";
import type { GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { Environment } from "~/shared/environment";

interface IdataGridProps {
    columns: GridColDef[];
    rows: GridRowsProp;
    isLoading?: boolean;
    totalCount: number;
    page: number;
    onPageChange?: (page: number) => void;
    onRowClick?: (row: any) => void;
}

export const DataTable = ({columns, rows, totalCount, isLoading, page, ...props}: IdataGridProps) => {
  return (
    <TableContainer
            component={Paper}
            variant="outlined"
            sx={{ margin: 1, width: "auto" }}
          >
            <Table>
              <TableHead>
              {columns.map((column, index) => (
                <TableRow>
                    <TableCell key={index}>{column}</TableCell>
                </TableRow>
              ))}
                
              </TableHead>
              <TableBody>
                {rows?.map((row) => (
                  <TableRow key={row.cod_dispesa_fixa}>
                    <TableCell>{row.nome}</TableCell>
                    <TableCell>{row.valor}</TableCell>
                    <TableCell>{row.comentario ?? ""}</TableCell>
                    <TableCell>{new Date(row.data).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <IconButton
                        size="small"
                        onClick={() => handleDelete(row.cod_dispesa_fixa)}
                      >
                        <Icon>delete</Icon>
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() =>
                          navigate(
                            `/Despesas/Fixed/Detalhe/${row.cod_dispesa_fixa}`
                          )
                        }
                      >
                        <Icon>edit</Icon>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              {totalCount === 0 && !isLoading && (
                <caption>{Environment.LISTAGEM_VAZIA}</caption>
              )}

              <TableFooter>
                {isLoading && (
                  <TableRow>
                    <TableCell colSpan={3}>
                      <LinearProgress variant="indeterminate" />
                    </TableCell>
                  </TableRow>
                )}
                {totalCount > 0 && totalCount > Environment.LIMITE_DE_LINHA && (
                  <TableRow>
                    <TableCell
                      colSpan={Math.ceil(
                        totalCount / Environment.LIMITE_DE_LINHA
                      )}
                    >
                      <Pagination
                        page={page}
                        count={10}
                        onChange={(_, newPage) =>
                          setSearchParams(
                            { search, page: newPage.toString() },
                            { replace: true }
                          )
                        }
                      />
                    </TableCell>
                  </TableRow>
                )}
              </TableFooter>
            </Table>
          </TableContainer>
  );
};
