import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import Home from "~/pages/home/home";
import { renderWithProviders } from "../helpers/renderWithProviders";

vi.mock("~/routes", () => ({
  optionsSideMenu: vi.fn(),
}));

vi.mock("~/shared/services/api/dashboard/get-resumo", () => ({
  getDashboardResumo: vi.fn(),
}));

vi.mock("~/shared/services/api/dashboard/get-serie", () => ({
  getDashboardSerie: vi.fn(),
}));

vi.mock("~/shared/services/api/dashboard/get-anos-disponiveis", () => ({
  getAnosDisponiveis: vi.fn(),
}));

import { getDashboardResumo } from "~/shared/services/api/dashboard/get-resumo";
import { getDashboardSerie } from "~/shared/services/api/dashboard/get-serie";
import { getAnosDisponiveis } from "~/shared/services/api/dashboard/get-anos-disponiveis";

const mockGetDashboardResumo = vi.mocked(getDashboardResumo);
const mockGetDashboardSerie = vi.mocked(getDashboardSerie);
const mockGetAnosDisponiveis = vi.mocked(getAnosDisponiveis);

const resumoPositivo = {
  saldoAtual: 1500,
  maiorCategoriaGasto: "Moradia",
  maiorCategoriaValor: 1200,
  saudeFinanceiraPercentual: 30,
  saudeFinanceiraStatus: "Saudável",
};

const serieMensal = [
  { periodo: new Date("2026-07-01"), receita: 5000, despesa: 4000, saldo: 1000 },
  { periodo: new Date("2026-08-01"), receita: 5000, despesa: 3500, saldo: 1500 },
];

describe("Home page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockGetDashboardSerie.mockResolvedValue(serieMensal);
    mockGetAnosDisponiveis.mockResolvedValue([2024, 2025, 2026]);
  });

  it("deve renderizar sem erros", async () => {
    mockGetDashboardResumo.mockResolvedValueOnce(resumoPositivo);
    renderWithProviders(<Home />);

    await waitFor(() => {
      expect(mockGetDashboardResumo).toHaveBeenCalledTimes(1);
    });
  });

  it("deve exibir o título 'Página inicial'", () => {
    mockGetDashboardResumo.mockResolvedValueOnce(resumoPositivo);
    renderWithProviders(<Home />);
    expect(screen.getByText("Página inicial")).toBeInTheDocument();
  });

  it("deve renderizar o gráfico de linha", () => {
    mockGetDashboardResumo.mockResolvedValueOnce(resumoPositivo);
    const { container } = renderWithProviders(<Home />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("deve buscar a série com o período 'mes' por padrão, sem ano/mês selecionados", async () => {
    mockGetDashboardResumo.mockResolvedValueOnce(resumoPositivo);
    renderWithProviders(<Home />);

    await waitFor(() => {
      expect(mockGetDashboardSerie).toHaveBeenCalledWith(1, {
        periodo: "mes",
        ano: undefined,
        mes: undefined,
      });
    });
  });

  it("deve exibir o saldo atual formatado quando a API responde", async () => {
    mockGetDashboardResumo.mockResolvedValueOnce(resumoPositivo);
    renderWithProviders(<Home />);

    await waitFor(() => {
      expect(screen.getByText(/R\$\s*1\.500,00/i)).toBeInTheDocument();
    });
  });

  it("deve exibir a imagem de saldo positivo quando o saldo é >= 0", async () => {
    mockGetDashboardResumo.mockResolvedValueOnce(resumoPositivo);
    renderWithProviders(<Home />);

    await waitFor(() => {
      expect(screen.getByAltText("Saldo positivo")).toBeInTheDocument();
    });
  });

  it("deve exibir a imagem de saldo negativo quando o saldo é < 0", async () => {
    mockGetDashboardResumo.mockResolvedValueOnce({
      ...resumoPositivo,
      saldoAtual: -500,
      saudeFinanceiraStatus: "Crítico",
    });
    renderWithProviders(<Home />);

    await waitFor(() => {
      expect(screen.getByAltText("Saldo negativo")).toBeInTheDocument();
    });
  });

  it("deve exibir a categoria de maior gasto", async () => {
    mockGetDashboardResumo.mockResolvedValueOnce(resumoPositivo);
    renderWithProviders(<Home />);

    await waitFor(() => {
      expect(screen.getByText("Moradia")).toBeInTheDocument();
    });
  });

  it("deve tratar erro da API sem quebrar a UI", async () => {
    const alertSpy = vi.spyOn(window, "alert").mockImplementation(() => {});
    mockGetDashboardResumo.mockResolvedValueOnce(new Error("Falha ao buscar resumo"));

    renderWithProviders(<Home />);

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith("Falha ao buscar resumo");
    });

    alertSpy.mockRestore();
  });

  it("deve exibir os 3 filtros de período com 'Mês' selecionado por padrão", () => {
    mockGetDashboardResumo.mockResolvedValueOnce(resumoPositivo);
    renderWithProviders(<Home />);

    expect(screen.getByRole("button", { name: "Semana" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Ano" })).toBeInTheDocument();

    const botaoMes = screen.getByRole("button", { name: "Mês" });
    expect(botaoMes).toHaveAttribute("aria-pressed", "true");
  });

  it("deve rebuscar a série ao clicar no filtro 'Ano'", async () => {
    mockGetDashboardResumo.mockResolvedValueOnce(resumoPositivo);
    renderWithProviders(<Home />);

    await waitFor(() => {
      expect(mockGetDashboardSerie).toHaveBeenCalledWith(1, { periodo: "mes", ano: undefined, mes: undefined });
    });

    await userEvent.click(screen.getByRole("button", { name: "Ano" }));

    await waitFor(() => {
      expect(mockGetDashboardSerie).toHaveBeenCalledWith(1, { periodo: "ano", ano: undefined, mes: undefined });
    });
  });

  it("deve mostrar o seletor de ano no filtro 'Mês' e rebuscar ao escolher um ano", async () => {
    mockGetDashboardResumo.mockResolvedValueOnce(resumoPositivo);
    renderWithProviders(<Home />);

    await waitFor(() => {
      expect(mockGetDashboardSerie).toHaveBeenCalledWith(1, { periodo: "mes", ano: undefined, mes: undefined });
    });

    await userEvent.click(screen.getByText("Últimos 12 meses"));
    await userEvent.click(await screen.findByRole("option", { name: "2025" }));

    await waitFor(() => {
      expect(mockGetDashboardSerie).toHaveBeenCalledWith(1, { periodo: "mes", ano: 2025, mes: undefined });
    });
  });

  it("deve mostrar seletor de mês desabilitado no filtro 'Semana' até um ano ser escolhido", async () => {
    mockGetDashboardResumo.mockResolvedValueOnce(resumoPositivo);
    renderWithProviders(<Home />);

    await userEvent.click(screen.getByRole("button", { name: "Semana" }));

    const [, selectMes] = screen.getAllByRole("combobox");
    expect(selectMes).toHaveAttribute("aria-disabled", "true");
  });

  it("deve rebuscar a série com ano e mês ao selecionar ambos no filtro 'Semana'", async () => {
    mockGetDashboardResumo.mockResolvedValueOnce(resumoPositivo);
    renderWithProviders(<Home />);

    await userEvent.click(screen.getByRole("button", { name: "Semana" }));

    const [selectAno] = screen.getAllByRole("combobox");
    await userEvent.click(selectAno);
    await userEvent.click(await screen.findByRole("option", { name: "2026" }));

    const [, selectMes] = screen.getAllByRole("combobox");
    await userEvent.click(selectMes);
    await userEvent.click(await screen.findByRole("option", { name: "Agosto" }));

    await waitFor(() => {
      expect(mockGetDashboardSerie).toHaveBeenCalledWith(1, { periodo: "semana", ano: 2026, mes: 8 });
    });
  });
});
