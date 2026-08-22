import type { Route } from "../home/+types/home";
import { useEffect, useState } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import {
  Box,
  MenuItem,
  Paper,
  Select,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { LayoutPage } from "~/shared/layouts/layoutPages";
import {
  getDashboardResumo,
  type IDashboardResumo,
} from "~/shared/services/api/dashboard/get-resumo";
import {
  getDashboardSerie,
  type TPeriodoGrafico,
} from "~/shared/services/api/dashboard/get-serie";
import { getAnosDisponiveis } from "~/shared/services/api/dashboard/get-anos-disponiveis";

import plusPerson from "../../assets/img/ChatGPT Image Apr 8, 2025, 01_34_50 PM.png";
import lessPerson from "../../assets/img/ChatGPT Image Apr 8, 2025, 01_34_42 PM.png";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Página inicial" },
    { name: "description", content: "Dashboard financeiro" },
  ];
}

const NOMES_MESES = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];

const formatarMoeda = (valor: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(valor);

const corPorStatus = (status: string) => {
  switch (status) {
    case "Saudável":
      return "success.main";
    case "Atenção":
      return "warning.main";
    case "Crítico":
      return "error.main";
    default:
      return "text.secondary";
  }
};

const formatarPeriodo = (data: Date, periodo: TPeriodoGrafico) => {
  if (periodo === "ano") {
    return new Intl.DateTimeFormat("pt-BR", { year: "numeric" }).format(data);
  }

  if (periodo === "semana") {
    return new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "2-digit" }).format(data);
  }

  return new Intl.DateTimeFormat("pt-BR", { month: "short", year: "2-digit" }).format(data);
};

export default function Home() {
  const [resumo, setResumo] = useState<IDashboardResumo>();
  const [meses, setMeses] = useState<string[]>([]);
  const [saldosPorPeriodo, setSaldosPorPeriodo] = useState<number[]>([]);
  const [periodo, setPeriodo] = useState<TPeriodoGrafico>("mes");
  const [anoSelecionado, setAnoSelecionado] = useState<number | "">("");
  const [mesSelecionado, setMesSelecionado] = useState<number | "">("");
  const [anosDisponiveis, setAnosDisponiveis] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getDashboardResumo(1).then((result) => {
      setIsLoading(false);

      if (result instanceof Error) {
        alert(result.message);
        return;
      }

      setResumo(result);
    });

    getAnosDisponiveis(1).then((result) => {
      if (result instanceof Error) {
        alert(result.message);
        return;
      }

      setAnosDisponiveis(result);
    });
  }, []);

  useEffect(() => {
    getDashboardSerie(1, {
      periodo,
      ano: anoSelecionado === "" ? undefined : anoSelecionado,
      mes: mesSelecionado === "" ? undefined : mesSelecionado,
    }).then((result) => {
      if (result instanceof Error) {
        alert(result.message);
        return;
      }

      setMeses(result.map((item) => formatarPeriodo(new Date(item.periodo), periodo)));
      setSaldosPorPeriodo(result.map((item) => item.saldo));
    });
  }, [periodo, anoSelecionado, mesSelecionado]);

  const trocarPeriodo = (novoPeriodo: TPeriodoGrafico | null) => {
    if (!novoPeriodo) return;
    setPeriodo(novoPeriodo);
    setAnoSelecionado("");
    setMesSelecionado("");
  };

  const saldoPositivo = (resumo?.saldoAtual ?? 0) >= 0;

  return (
    <LayoutPage titulo="Página inicial" isLoading={isLoading}>
      <Box display="flex" flexWrap="wrap" gap={3} margin="2em">
        <Paper elevation={4} className="p-4 flex-1" sx={{ minWidth: "16em" }}>
          <Typography variant="subtitle2" color="text.secondary">
            Saldo atual
          </Typography>
          <Typography variant="h4" color={saldoPositivo ? "success.main" : "error.main"}>
            {formatarMoeda(resumo?.saldoAtual ?? 0)}
          </Typography>
        </Paper>

        <Paper elevation={4} className="p-4 flex-1" sx={{ minWidth: "16em" }}>
          <Typography variant="subtitle2" color="text.secondary">
            Saúde financeira
          </Typography>
          <Typography variant="h4" color={corPorStatus(resumo?.saudeFinanceiraStatus ?? "")}>
            {resumo?.saudeFinanceiraStatus ?? "-"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {resumo ? `${resumo.saudeFinanceiraPercentual}% da receita poupado este mês` : ""}
          </Typography>
        </Paper>

        <Paper elevation={4} className="p-4 flex-1" sx={{ minWidth: "16em" }}>
          <Typography variant="subtitle2" color="text.secondary">
            Com o que mais gastei este mês
          </Typography>
          <Typography variant="h4">
            {resumo?.maiorCategoriaGasto ?? "Sem dados"}
          </Typography>
          {resumo?.maiorCategoriaGasto && (
            <Typography variant="body2" color="text.secondary">
              {formatarMoeda(resumo.maiorCategoriaValor)}
            </Typography>
          )}
        </Paper>
      </Box>

      <Box display="flex" justifyContent="space-around" margin="5em" gap={5}>
        <Box flex={1}>
          <Box display="flex" justifyContent="flex-end" alignItems="center" gap={2} marginBottom={2}>
            {(periodo === "ano" || periodo === "semana") && (
              <Select
                size="small"
                displayEmpty
                value={anoSelecionado}
                onChange={(e) => setAnoSelecionado(e.target.value === "" ? "" : Number(e.target.value))}
              >
                <MenuItem value="">{periodo === "ano" ? "Todos os anos" : "Ano"}</MenuItem>
                {anosDisponiveis.map((ano) => (
                  <MenuItem key={ano} value={ano}>
                    {ano}
                  </MenuItem>
                ))}
              </Select>
            )}

            {periodo === "mes" && (
              <Select
                size="small"
                displayEmpty
                value={anoSelecionado}
                onChange={(e) => setAnoSelecionado(e.target.value === "" ? "" : Number(e.target.value))}
              >
                <MenuItem value="">Últimos 12 meses</MenuItem>
                {anosDisponiveis.map((ano) => (
                  <MenuItem key={ano} value={ano}>
                    {ano}
                  </MenuItem>
                ))}
              </Select>
            )}

            {periodo === "semana" && (
              <Select
                size="small"
                displayEmpty
                disabled={anoSelecionado === ""}
                value={mesSelecionado}
                onChange={(e) => setMesSelecionado(e.target.value === "" ? "" : Number(e.target.value))}
              >
                <MenuItem value="">Mês</MenuItem>
                {NOMES_MESES.map((nome, index) => (
                  <MenuItem key={nome} value={index + 1}>
                    {nome}
                  </MenuItem>
                ))}
              </Select>
            )}

            <ToggleButtonGroup
              size="small"
              exclusive
              value={periodo}
              onChange={(_, novoPeriodo: TPeriodoGrafico | null) => trocarPeriodo(novoPeriodo)}
            >
              <ToggleButton value="semana">Semana</ToggleButton>
              <ToggleButton value="mes">Mês</ToggleButton>
              <ToggleButton value="ano">Ano</ToggleButton>
            </ToggleButtonGroup>
          </Box>

          <LineChart
            xAxis={[{ scaleType: "band", data: meses }]}
            series={[{ data: saldosPorPeriodo, label: "Saldo" }]}
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
          <img
            src={saldoPositivo ? plusPerson : lessPerson}
            alt={saldoPositivo ? "Saldo positivo" : "Saldo negativo"}
          />
        </Box>
      </Box>
    </LayoutPage>
  );
}
