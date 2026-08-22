import { Box, Icon, Paper, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { ToolsList } from "~/components/toolsList/toolsList";
import { LayoutPage } from "~/shared/layouts/layoutPages";
import { Environment } from "~/shared/environment";
import {
  getAllDebts,
  type IListDebts,
  type IPropsPayloadGetAllDebts,
} from "~/shared/services/api/debs/get-debit-all";

export default function DebtList() {
  const [debtData, setDebtData] = useState<IListDebts[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  // const filter = searchParams.get("busca") || "";
  const searchFilters = useMemo<IPropsPayloadGetAllDebts>(() => {
      return {
        filter: new Date(searchParams.get("busca")!) || new Date(),
        page: Number(searchParams.get("pagina") || "1"),
      };
    }, [searchParams]);
  

  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    getAllDebts(searchFilters).then((result) => {
      setIsLoading(false);
      if (result instanceof Error) {
        alert(result.message);
        return;
      }

      console.log(result);
      setDebtData(result.data);
    });
  }, []);
  return (
    <LayoutPage
    titulo="Despesas"
    isLoading={isLoading}
    barraDeFerramentas={
      <ToolsList 
       showInputResearch
       showButton={false}
       researchText={searchFilters.filter.toString()}
       changeTextResearch={(text) =>
        setSearchParams({ busca: text, page: "1" }, { replace: true })
      }
      />
    }
    >
      {!isLoading && debtData?.length === 0 && (
        <Typography className="p-4 text-center" color="text.secondary">
          {Environment.LISTAGEM_VAZIA}
        </Typography>
      )}

      {debtData?.map((debt, index) => (
        <Paper
          key={index}
          elevation={10}
          className="p-4 m-4 flex flex-row align-middle justify-between gap-3 cursor-pointer"
          sx={{
            //  backgroundColor: "secondary",
            "&:hover": {
              backgroundColor: "secondary.main",
            },
          }}
          onClick={() => {
            const date = new Date(debt.mesAno);
            const formatted = date.toISOString().substring(0, 10);
            navigate(`/Despesas/Mes/${formatted}`);
        }}
        >
          <Box className="flex flex-row align-middle justify-between w-full">
            <div className="text-2xl font-bold">
              {new Date().getMonth() === new Date(debt.mesAno).getMonth()
                ? "Mês Atual"
                : new Intl.DateTimeFormat("pt-BR", {
                    year: "numeric",
                    month: "long",
                  }).format(new Date(debt.mesAno))}
            </div>
            <div className="text-2xl font-bold">
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(Number(debt.totalGasto))}
            </div>
          </Box>
          <Icon>keyboard_arrow_right</Icon>
        </Paper>
      ))}
    </LayoutPage>
  );
}
