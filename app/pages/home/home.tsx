import type { Route } from "../home/+types/home";
import { LineChart } from "@mui/x-charts/LineChart";
import {
  ContinuousColorLegend,
  PiecewiseColorLegend,
} from "@mui/x-charts/ChartsLegend";
import { LayoutPage } from "~/shared/layouts/layoutPages";
import { ToolsList } from "~/components/toolsList/toolsList";
import { ToolsDetails } from "~/components/toolsDetails/toolsDetails";

import plusPerson from "../../assets/img/ChatGPT Image Apr 8, 2025, 01_34_50 PM.png";
import lessPerson from "../../assets/img/ChatGPT Image Apr 8, 2025, 01_34_42 PM.png";
import { Box } from "@mui/material";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const months = [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ];

  const saldoPorMes = [
    1000, 1200, 800, 1500, 2000, 1800, 2200, 2500, 2300, 2800, 3000, 3200,
  ];

  return (
    <LayoutPage titulo="Página inicial">
      <Box display="flex" justifyContent="space-around" margin="5em" gap={5}>
        <Box flex={1}>
          <LineChart
            xAxis={[{ scaleType: "band", data: months }]}
            series={[{ data: saldoPorMes }]}
            height={300}
            margin={{ left: 100, right: 30, top: 30, bottom: 30 }}
            grid={{ vertical: false, horizontal: true }}
          />
        </Box>

        <Box
          width="30em"
          height="30em"
          overflow="hidden"
          display="flex"
          justifyContent="center"
          alignItems="center"
          borderRadius="50%"
          border="1em solid"
          boxShadow="0px 1px 41px 29px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)"
        >
          <img src={lessPerson} alt="Saldo positivo" />
        </Box>
      </Box>
    </LayoutPage>
  );
}
