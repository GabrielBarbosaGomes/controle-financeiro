import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import React from "react";
import IncomeList from "~/pages/income/incomeList";
import { renderWithProviders } from "../helpers/renderWithProviders";

vi.mock("~/routes", () => ({
  optionsSideMenu: vi.fn(),
}));

vi.mock("~/shared/services/api/income/get-income", () => ({
  getIncomeMonths: vi.fn(),
}));

import { getIncomeMonths } from "~/shared/services/api/income/get-income";
const mockGetIncomeMonths = vi.mocked(getIncomeMonths);

describe("IncomeList page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("deve renderizar o título 'Faturamento'", async () => {
    mockGetIncomeMonths.mockResolvedValueOnce({ data: [], totalCount: 0 });

    renderWithProviders(<IncomeList />, { initialEntries: ["/Faturamento"] });

    expect(screen.getByText("Faturamento")).toBeInTheDocument();
  });

  it("deve exibir o campo de busca na toolbar", async () => {
    mockGetIncomeMonths.mockResolvedValueOnce({ data: [], totalCount: 0 });

    renderWithProviders(<IncomeList />, { initialEntries: ["/Faturamento"] });

    expect(screen.getByPlaceholderText("Pesquisar...")).toBeInTheDocument();
  });

  it("deve exibir os dados de faturamento retornados pela API", async () => {
    const mockData = [
      { mesAno: new Date("2024-03-01"), totalFaturado: 4000.0 },
    ];
    mockGetIncomeMonths.mockResolvedValueOnce({ data: mockData, totalCount: 1 });

    renderWithProviders(<IncomeList />, { initialEntries: ["/Faturamento"] });

    await waitFor(() => {
      expect(screen.getByText(/R\$\s*4\.000,00/i)).toBeInTheDocument();
    });
  });

  it("deve exibir 'Mês Atual' para o mês corrente", async () => {
    const mesAtual = new Date();
    const mockData = [{ mesAno: mesAtual, totalFaturado: 5000 }];
    mockGetIncomeMonths.mockResolvedValueOnce({ data: mockData, totalCount: 1 });

    renderWithProviders(<IncomeList />, { initialEntries: ["/Faturamento"] });

    await waitFor(() => {
      expect(screen.getByText("Mês Atual")).toBeInTheDocument();
    });
  });

  it("deve chamar getIncomeMonths na montagem do componente", async () => {
    mockGetIncomeMonths.mockResolvedValueOnce({ data: [], totalCount: 0 });

    renderWithProviders(<IncomeList />, { initialEntries: ["/Faturamento"] });

    await waitFor(() => {
      expect(mockGetIncomeMonths).toHaveBeenCalledTimes(1);
    });
  });

  it("deve tratar erro da API sem quebrar a UI", async () => {
    const alertSpy = vi.spyOn(window, "alert").mockImplementation(() => {});
    mockGetIncomeMonths.mockResolvedValueOnce(new Error("Serviço indisponível"));

    renderWithProviders(<IncomeList />, { initialEntries: ["/Faturamento"] });

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith("Serviço indisponível");
    });

    alertSpy.mockRestore();
  });
});
