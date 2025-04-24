import Tab from "@mui/joy/Tab";
import TabList from "@mui/joy/TabList";
import TabPanel from "@mui/joy/TabPanel";
import Tabs from "@mui/joy/Tabs";
import {
  Backdrop,
  Box,
  Fade,
  Icon,
  IconButton,
  LinearProgress,
  Modal,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { DataTable } from "~/components/dataTable/dataTable";
import { HorizontalTabs } from "~/components/tabs/tabs";
import { ToolsList } from "~/components/toolsList/toolsList";
import { Environment } from "~/shared/environment";
import { useDebounce } from "~/shared/hooks/useDebounce";
import { LayoutPage } from "~/shared/layouts/layoutPages";
import {
  getDebtFixed,
  type IDetailsDebtsFixed,
} from "~/shared/services/api/debs/debtFixed/get-debt";
import {
  deleteDebt,
  type IDeleteDebt,
} from "~/shared/services/api/debs/delete-debt";
import {
  getAllDebts,
  type IListDebts,
} from "~/shared/services/api/debs/get-debit-all";
import {
  DataGrid,
  GridActionsCellItem,
  type GridColDef,
} from "@mui/x-data-grid";
import { getDebtVariables, type IDetailsDebtVariables } from "~/shared/services/api/debs/debtVariables/get-debt";


export default function Debt() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = useDebounce();
  const [dataDebtFixed, setDataDebtFixed] = useState<IDetailsDebtsFixed[]>();
  const [dataDebtVariavel, setDataDebtVariavel] = useState<IDetailsDebtVariables[]>();
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  
  const search = useMemo(() => {
    return searchParams.get("busca") || "";
  }, [searchParams]);

  const page = useMemo(() => {
    return Number(searchParams.get("pagina") || "1");
  }, [searchParams]);

  useEffect(() => {
    setIsLoading(true);

    debounce(() => {
      // getAllDebts(page, search).then((result) => {
      //   setIsLoading(false);

      //   if (result instanceof Error) {
      //     alert(result.message);
      //     return;
      //   }

      //   console.log("result", result);

      //   setDataDebtFixed(result.data);
      //   setTotalCount(result.totalCount);
      // });
      getDebtFixed(page, search).then((result) => {
        setIsLoading(false);

        if (result instanceof Error) {
          alert(result.message);
          return;
        }
        console.log("result", result);
        setDataDebtFixed(result.data);
        setTotalCount(result.totalCount);
        console.log("result.data", result.data);
      });

      getDebtVariables(page, search).then((result) => {
        setIsLoading(false);

        if (result instanceof Error) {
          alert(result.message);
          return;
        }
        console.log("result", result);
        setDataDebtVariavel(result.data);
        setTotalCount(result.totalCount);
      });

    });
  }, [search, page]);

  const handleDelete = (id: number) => {
    console.log("delete", id);
    if (confirm("Realmente deseja apagar?")) {
      const reqDelete: IDeleteDebt = {
        codUsuario: 1,
        codDispesaFixa: id,
        nomeDispesa: "fixed",
      };

      deleteDebt(reqDelete).then((result) => {
        if (result instanceof Error) {
          alert(result.message);
          return;
        }
        setDataDebtFixed((olddataDebtFixed) => {
          return [
            ...(olddataDebtFixed ?? []).filter((oldRow) => oldRow.id !== id),
          ];
        });
        alert("registro apagado com sucesso!");
      });
    }
  };

  const columnsFixed: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "nome", headerName: "Nome Despesa", width: 300 },
    { field: "valor", headerName: "Valor Despesa", width: 200 },
    { field: "comentario", headerName: "comentario", width: 300 },
    { field: "data", headerName: "data", width: 300 },
    { field: "finalizado", headerName: "Finalizado", width: 300 },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            // icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={() => navigate(`/Despesas/Fixed/Detalhe/${id}`)}
            color="inherit"
            showInMenu={true}
          />,
          <GridActionsCellItem
            // icon={<DeleteIcon />}
            label="Delete"
            onClick={() => handleDelete(Number(id))}
            color="inherit"
            showInMenu={true}
          />,
        ];
      },
    },
  ];
  
  const columnsVariable: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "nome", headerName: "Nome Despesa", width: 300 },
    { field: "valor", headerName: "Valor Despesa", width: 200 },
    { field: "comentario", headerName: "comentario", width: 300 },
    { field: "data", headerName: "data", width: 300 },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            // icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={() => navigate(`/Despesas/Variables/Detalhe/${id}`)}
            color="inherit"
            showInMenu={true}
          />,
          <GridActionsCellItem
            // icon={<DeleteIcon />}
            label="Delete"
            onClick={() => handleDelete(Number(id))}
            color="inherit"
            showInMenu={true}
          />,
        ];
      },
    },
  ];

  // function modalNewDebt() {
  //   return(
  //     <></>
  //   )
  // }

  return (
    <LayoutPage
      titulo="Despesas"
      barraDeFerramentas={
        <ToolsList
          showInputResearch
          showButton
          textButton="Nova"
          clickButton={() => setOpen(!open)}
          // clickButton={() => navigate("/Despesas/Fixed/Detalhe/Nova")}
          researchText={search}
          changeTextResearch={(text) =>
            setSearchParams({ busca: text, page: "1" }, { replace: true })
          }
        />
      }
    >
      <HorizontalTabs selectedTab={0}  >
      
      <HorizontalTabs.Tab label="fixo" >
        <DataGrid
          columns={columnsFixed}
          rows={dataDebtFixed ?? []}
          loading={isLoading}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 5, page: page - 1},
            },
          }}
          onPaginationModelChange={(model) => {
            setSearchParams(
              { busca: search, pagina: (model.page + 1).toString() },
              { replace: true }
            );
          }}
          pageSizeOptions={[5, 10, 25]}
          disableColumnSorting 
        />
      </HorizontalTabs.Tab >
      <HorizontalTabs.Tab label="variavel" >
        <DataGrid
          columns={columnsVariable}
          rows={dataDebtVariavel ?? []}
          loading={isLoading}
          disableColumnSorting 
          initialState={{
            pagination: {
              paginationModel: { pageSize: 5, page: page - 1 },
            },
          }}
          onPaginationModelChange={(model) => {
            setSearchParams(
              { busca: search, pagina: (model.page + 1).toString() },
              { replace: true }
            );
          }}
          pageSizeOptions={[5, 10, 25]}


        />
      </HorizontalTabs.Tab>
      {/* </TabsComponent> */}
      </HorizontalTabs>

      {/* <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={() => setOpen(!open)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box bgcolor="primary.main ">
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          </Box>
        </Fade>
      </Modal> */}
    </LayoutPage>
  );
}
