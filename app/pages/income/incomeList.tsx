import { Box, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ToolsList } from "~/components/toolsList/toolsList";
import { LayoutPage } from "~/shared/layouts/layoutPages";
import { getIncomeMonths, type IIncomeMonths } from "~/shared/services/api/income/get-income";

 export default function IncomeList() {
   const [incomeData, setIncomeData] = useState<IIncomeMonths[]>();
   const [isLoading, setIsLoading] = useState(false);

   const navigate = useNavigate();

   useEffect(() => {
     setIsLoading(true);
     getIncomeMonths(1, "").then((result) => {
       setIsLoading(false);
       if (result instanceof Error) {
         alert(result.message);
         return;
       }

       console.log(result);
       setIncomeData(result.data);
     });
   }, []);
   return (
     <LayoutPage
       titulo="Faturamento"
       isLoading={isLoading}
       barraDeFerramentas={
         <ToolsList 
          showInputResearch
          showButton={false}
         />
       }
     >
       {incomeData?.map((income, index) => (
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
             const date = new Date(income.mesAno);
             const formatted = date.toISOString().substring(0, 10);
             navigate(`/Faturamento/Mes/${formatted}`);
         }}
         >
           <Box className="flex flex-row align-middle justify-between w-full">
             <div className="text-2xl font-bold">
               {new Date().getMonth() === new Date(income.mesAno).getMonth()
                 ? "Mês Atual"
                 : new Intl.DateTimeFormat("pt-BR", {
                     year: "numeric",
                     month: "long",
                   }).format(new Date(income.mesAno))}
             </div>
             <div className="text-2xl font-bold">
               {new Intl.NumberFormat("pt-BR", {
                 style: "currency",
                 currency: "BRL",
               }).format(income.totalFaturado)}
             </div>
           </Box>
         </Paper>
       ))}
     </LayoutPage>
   );
 }