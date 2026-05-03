import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import React from "react";
import DebtList from "~/pages/debt/debtList";
import { renderWithProviders } from "../helpers/renderWithProviders";

vi.mock("~/routes", () => ({
  optionsSideMenu: vi.fn(),
}));

vi.mock("~/shared/services/api/debs/get-debit-all", () => ({
  getAllDebts: vi.fn(),
}));

import { getAllDebts } from "~/shared/services/api/debs/get-debit-all";
const mockGetAllDebts = vi.mocked(getAllDebts);

describe("DebtList page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("deve renderizar o título 'Despesas'", async () => {
    mockGetAllDebts.mockResolvedValueOnce({ data: [], totalCount: 0 });

    renderWithProviders(<DebtList />, { initialEntries: ["/Despesas"] });

    expect(screen.getByText("Despesas")).toBeInTheDocument();
  });

  it("deve exibir o campo de busca na toolbar", async () => {
    mockGetAllDebts.mockResolvedValueOnce({ data: [], totalCount: 0 });

    renderWithProviders(<DebtList />, { initialEntries: ["/Despesas"] });

    expect(screen.getByPlaceholderText("Pesquisar...")).toBeInTheDocument();
  });

  it("deve exibir os dados retornados pela API", async () => {
    const mockData = [
      { mesAno: new Date("2024-01-01"), totalGasto: 1500.5 },
    ];
    mockGetAllDebts.mockResolvedValueOnce({ data: mockData, totalCount: 1 });

    renderWithProviders(<DebtList />, { initialEntries: ["/Despesas"] });

    await waitFor(() => {
      expect(screen.getByText(/R\$\s*1\.500,50/i)).toBeInTheDocument();
    });
  });

  it("deve exibir 'Mês Atual' para o mês corrente", async () => {
    const mesAtual = new Date();
    const mockData = [{ mesAno: mesAtual, totalGasto: 200 }];
    mockGetAllDebts.mockResolvedValueOnce({ data: mockData, totalCount: 1 });

    renderWithProviders(<DebtList />, { initialEntries: ["/Despesas"] });

    await waitFor(() => {
      expect(screen.getByText("Mês Atual")).toBeInTheDocument();
    });
  });

  it("deve chamar getAllDebts na montagem do componente", async () => {
    mockGetAllDebts.mockResolvedValueOnce({ data: [], totalCount: 0 });

    renderWithProviders(<DebtList />, { initialEntries: ["/Despesas"] });

    await waitFor(() => {
      expect(mockGetAllDebts).toHaveBeenCalledTimes(1);
    });
  });

  it("deve tratar erro da API sem quebrar a UI", async () => {
    const alertSpy = vi.spyOn(window, "alert").mockImplementation(() => {});
    mockGetAllDebts.mockResolvedValueOnce(new Error("Falha ao buscar dados"));

    renderWithProviders(<DebtList />, { initialEntries: ["/Despesas"] });

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith("Falha ao buscar dados");
    });

    alertSpy.mockRestore();
  });
});
