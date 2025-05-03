import { Box, Icon, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ToolsList } from "~/components/toolsList/toolsList";
import { LayoutPage } from "~/shared/layouts/layoutPages";
import {
  getAllDebts,
  type IListDebts,
} from "~/shared/services/api/debs/get-debit-all";

export default function DebtList() {
  const [debtData, setDebtData] = useState<IListDebts[]>();
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    getAllDebts(1, "").then((result) => {
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
      />
    }
    >
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
