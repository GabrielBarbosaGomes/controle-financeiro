import {
  DataGrid,
  GridActionsCellItem,
  GridOverlay,
  type GridColDef,
} from "@mui/x-data-grid";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router";
import { ToolsList } from "~/components/toolsList/toolsList";
import { useDebounce } from "~/shared/hooks/useDebounce";
import { LayoutPage } from "~/shared/layouts/layoutPages";
import { deleteIncome, type IDeleteIncome } from "~/shared/services/api/income/delete-income";
import { getIncome, type IIncome } from "~/shared/services/api/income/get-income";

export default function Income() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [dataIncome, setDataIncome] = useState<IIncome[]>();

  const {mes} = useParams<"mes">();


  const { debounce } = useDebounce();
  const navigate = useNavigate();

  const search = useMemo(() => {
    return searchParams.get("busca") || "";
  }, [searchParams]);

  const page = useMemo(() => {
    return Number(searchParams.get("pagina") || "1");
  }, [searchParams]);

  useEffect(() => {
    setIsLoading(true);

    debounce(() => {
      getIncome(page, search, new Date(mes!)).then((result) => {
        setIsLoading(false);

        if (result instanceof Error) {
          alert(result.message);
          return;
        }

        setDataIncome(result.data);
      });
    });
  }, []);

  const handleDelete = (id: number) => {
      if (confirm("Realmente deseja apagar?")) {
        const payload: IDeleteIncome = {
          codUsuario: 1,
          id: id,
        };
  
        deleteIncome(payload).then((result) => {
          if (result instanceof Error) {
            alert(result.message);
            return;
          }
          setDataIncome((olddataIncome) => {
            return [
              ...(olddataIncome ?? []).filter((oldRow) => oldRow.id !== id),
            ];
          });
          alert("registro apagado com sucesso!");
        });
      }
    };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "origem", headerName: "Origem Faturamento", flex: 1 },
    { field: "valor",
      headerName: "Valor Faturamento",
      flex: 1,
      valueFormatter: (params) => {
        return new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(Number(params));
      },
    },
    { field: "comentario", headerName: "Comentario", flex: 1 },
    { field: "data",
      headerName: "Data",
      flex: 1,
      valueFormatter: (params) => {
        return new Intl.DateTimeFormat("pt-BR", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }).format(new Date(params));
      }
    },
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
            onClick={() => navigate(`/Faturamento/Detalhe/${id}`)}
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
      titulo="Faturamento"
      barraDeFerramentas={
        <ToolsList
          showButton
          showInputResearch
          changeTextResearch={(text) =>
            setSearchParams({ busca: text, page: "1" }, { replace: true })
          }
          textButton="Novo"
          clickButton={() => navigate("/Faturamento/Detalhe/Novo")}
        />
      }
    >
      <DataGrid
        columns={columns}
        rows={dataIncome || []}
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
        onRowClick={(row) => navigate("/Faturamento/Detalhe/" + row.id)}
        slots={{
          noRowsOverlay: () => <GridOverlay>Nada Encontrado!</GridOverlay>,
        }}
      />
    </LayoutPage>
  );
}
