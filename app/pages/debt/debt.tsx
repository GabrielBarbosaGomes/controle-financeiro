import {
    Icon,
  IconButton,
  LinearProgress,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { ToolsList } from "~/components/toolsList/toolsList";
import { Environment } from "~/shared/environment";
import { useDebounce } from "~/shared/hooks/useDebounce";
import { LayoutPage } from "~/shared/layouts/layoutPages";
import {
  ExiteMoneyService,
  type IListDebts,
} from "~/shared/services/api/exitMoney/exitMoneyService";

export default function Debt() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = useDebounce();
  const [rows, setRows] = useState<IListDebts[]>();
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const search = useMemo(() => {
    return searchParams.get("busca") || "";
  }, [searchParams]);

  const page = useMemo(() => {
    return Number(searchParams.get("pagina") || "1");
  }, [searchParams]);

  useEffect(() => {
    setIsLoading(true);

    debounce(() => {
      ExiteMoneyService.getAll(page, search).then((result) => {
        setIsLoading(false);

        if (result instanceof Error) {
          alert(result.message);
          return;
        }

        setRows(result.data);
        setTotalCount(result.totalCount);
      });
    });
  }, [search, page]);

  const handleDelete = (id: number) => {
    console.log('delete', id)
    if(confirm('Realmente deseja apagar?')){
        ExiteMoneyService.deleteById(id)
        .then(result => {
            if( result instanceof Error){
                alert(result.message)
                return
            }
            setRows(oldRows => {
                return [
                    ...(oldRows ?? []).filter(oldRow => oldRow.codDispesaFixa !== id)
                ]
            })
            alert('registro apagado com sucesso!')
        })
    }
  }

  return (
    <LayoutPage
      titulo="Despesas"
      barraDeFerramentas={
        <ToolsList
          showInputResearch
          showButton
          textButton="Nova"
          clickButton={()=> navigate('/Despesas/Detalhe/Nova')}
          researchText={search}
          changeTextResearch={(text) =>
            setSearchParams({ busca: text, page: '1' }, { replace: true })
          }
        />
      }
    >
      <TableContainer
        component={Paper}
        variant="outlined"
        sx={{ margin: 1, width: "auto" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Ações</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Valor</TableCell>
              <TableCell>Comentario</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.map((row) => (
              <TableRow key={row.codDispesaFixa}>
                <TableCell>
                    <IconButton size="small" onClick={()=> handleDelete(row.codDispesaFixa)}>
                        <Icon>delete</Icon>
                    </IconButton>
                    <IconButton size="small" onClick={() => navigate(`/Despesas/Detalhe/${row.codDispesaFixa}`)}>
                        <Icon>edit</Icon>
                    </IconButton>
                </TableCell>
                <TableCell>{row.nomeDispesaFixa}</TableCell>
                <TableCell>{row.valorDispesaFixa}</TableCell>
                <TableCell>{row.comentarioDispesaFixa}</TableCell>
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
            {(totalCount > 0 && totalCount > Environment.LIMITE_DE_LINHA) && (
              <TableRow>
                <TableCell colSpan={Math.ceil(totalCount / Environment.LIMITE_DE_LINHA)}>
                <Pagination
                    page={page}
                    count={10}
                    onChange={(_, newPage)=> setSearchParams({ search, page: newPage.toString()}, {replace: true})}
                />
                </TableCell>
              </TableRow>
            )}
          </TableFooter>
        </Table>
      </TableContainer>
    </LayoutPage>
  );
}
