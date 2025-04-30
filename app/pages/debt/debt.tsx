import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import {
  DataGrid,
  GridActionsCellItem,
  GridOverlay,
  type GridColDef,
} from "@mui/x-data-grid";

import { ToolsList } from "~/components/toolsList/toolsList";
import { useDebounce } from "~/shared/hooks/useDebounce";
import { LayoutPage } from "~/shared/layouts/layoutPages";
import { HorizontalTabs } from "~/components/tabs/tabs";
import {
  getDebtFixed,
  type IDetailsDebtsFixed,
} from "~/shared/services/api/debs/debtFixed/get-debt";
import {
  deleteDebt,
  type IDeleteDebt,
} from "~/shared/services/api/debs/delete-debt";
import {
  getDebtVariables,
  type IDetailsDebtVariables,
} from "~/shared/services/api/debs/debtVariables/get-debt";

export default function Debt() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = useDebounce();
  const [dataDebtFixed, setDataDebtFixed] = useState<IDetailsDebtsFixed[]>();
  const [dataDebtVariavel, setDataDebtVariavel] = useState<IDetailsDebtVariables[]>();
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [abaSelected, setAbaSelected] = useState(0);

  const search = useMemo(() => {
    return searchParams.get("busca") || "";
  }, [searchParams]);

  const page = useMemo(() => {
    return Number(searchParams.get("pagina") || "1");
  }, [searchParams]);

  useEffect(() => {
    setIsLoading(true);

    debounce(() => {
      getDebtFixed(page, search).then((result) => {
        setIsLoading(false);

        if (result instanceof Error) {
          alert(result.message);
          return;
        }
        setDataDebtFixed(result.data);
        setTotalCount(result.totalCount);
      });

      getDebtVariables(page, search).then((result) => {
        setIsLoading(false);

        if (result instanceof Error) {
          alert(result.message);
          return;
        }
        setDataDebtVariavel(result.data);
        setTotalCount(result.totalCount);
      });
    });
  }, [search, page]);

  const handleDelete = (id: number) => {
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
    { field: "nome", headerName: "Nome Despesa", flex: 1 },
    { field: "valor", headerName: "Valor Despesa", flex: 1 },
    { field: "comentario", headerName: "comentario", flex: 1 },
    { field: "data", headerName: "data", flex: 1 },
    { field: "finalizado", headerName: "Finalizado", width: 150 },
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
    { field: "nome", headerName: "Nome Despesa", flex: 1  },
    { field: "valor", headerName: "Valor Despesa", flex: 1  },
    { field: "comentario", headerName: "comentario", flex: 1  },
    { field: "data", headerName: "data", flex: 1  },
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

  return (
    <LayoutPage
      titulo="Despesas"
      isLoading={isLoading}
      barraDeFerramentas={
        <ToolsList
          showInputResearch
          showButton
          textButton="Nova"
          clickButton={() =>
            abaSelected === 0
              ? navigate("/Despesas/Fixed/Detalhe/Nova")
              : navigate("/Despesas/Variables/Detalhe/Nova")
          }
          researchText={search}
          changeTextResearch={(text) =>
            setSearchParams({ busca: text, page: "1" }, { replace: true })
          }
        />
      }
    >
      <HorizontalTabs
        selectedTab={0}
        onChangeTab={(index) => {
          setAbaSelected(index);
        }}
      >
        <HorizontalTabs.Tab label="fixo">
          <DataGrid
            columns={columnsFixed}
            rows={dataDebtFixed ?? []}
            loading={isLoading}
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
            disableColumnSorting
            onRowClick={(row) => navigate("/Despesas/Fixed/Detalhe/" + row.id)}
            slots={{
              noRowsOverlay: () => <GridOverlay>Nada Encontrado!</GridOverlay>,
            }}
          />
        </HorizontalTabs.Tab>

        <HorizontalTabs.Tab label="variavel">
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
            onRowClick={(row) =>
              navigate("/Despesas/Variables/Detalhe/" + row.id)
            }
            slots={{
              noRowsOverlay: () => <GridOverlay>Nada Encontrado!</GridOverlay>,
            }}
          />
        </HorizontalTabs.Tab>
      </HorizontalTabs>
    </LayoutPage>
  );
}
