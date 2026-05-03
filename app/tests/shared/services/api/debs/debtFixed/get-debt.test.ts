import { describe, it, expect, vi, beforeEach } from "vitest";
import { getDebtFixed, getDebtFixedById } from "~/shared/services/api/debs/debtFixed/get-debt";

vi.mock("~/shared/services/api/axiosConfig", () => ({
  coreApi: {
    get: vi.fn(),
  },
}));

import { coreApi } from "~/shared/services/api/axiosConfig";

const mockGet = vi.mocked(coreApi.get);

const filtroValido = {
  busca: "",
  dateDespesa: new Date("2024-01-01"),
  pagina: 1,
};

describe("getDebtFixed", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("deve retornar data e totalCount quando a API responde com sucesso", async () => {
    const mockData = [
      { id: 1, codUsuario: 1, nome: "Internet", valor: 100, valorParcela: 100, quantidadeParcelas: 12, tempoIndeterminado: false, finalizado: false, data: new Date() },
    ];
    mockGet.mockResolvedValueOnce({ data: mockData });

    const result = await getDebtFixed(filtroValido);

    expect(result).not.toBeInstanceOf(Error);
    if (!(result instanceof Error)) {
      expect(result.data).toEqual(mockData);
      expect(result.totalCount).toBe(mockData.length);
    }
  });

  it("deve retornar Error quando a API lança exceção", async () => {
    mockGet.mockRejectedValueOnce(new Error("Falha na conexão"));

    const result = await getDebtFixed(filtroValido);

    expect(result).toBeInstanceOf(Error);
    expect((result as Error).message).toBe("Falha na conexão");
  });

  it("deve chamar a URL correta", async () => {
    mockGet.mockResolvedValueOnce({ data: [] });

    await getDebtFixed(filtroValido);

    expect(mockGet).toHaveBeenCalledWith(
      "/Debt/fixed/get",
      expect.objectContaining({ params: expect.any(Object) })
    );
  });

  it("deve retornar mensagem padrão quando exceção não tem message", async () => {
    mockGet.mockRejectedValueOnce({});

    const result = await getDebtFixed(filtroValido);

    expect(result).toBeInstanceOf(Error);
    expect((result as Error).message).toBe("Erro ao listar as despesas fixas.");
  });
});

describe("getDebtFixedById", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("deve retornar data e totalCount quando encontra o registro", async () => {
    const mockData = [{ id: 3, codUsuario: 1, nome: "Aluguel", valor: 1200, valorParcela: 1200, quantidadeParcelas: 1, tempoIndeterminado: true, finalizado: false, data: new Date() }];
    mockGet.mockResolvedValueOnce({ data: mockData });

    const result = await getDebtFixedById({ codUsuario: 1, codDispesaFixa: 3 });

    expect(result).not.toBeInstanceOf(Error);
    if (!(result instanceof Error)) {
      expect(result.data).toEqual(mockData);
    }
  });

  it("deve retornar Error quando a API falha", async () => {
    mockGet.mockRejectedValueOnce(new Error("Not found"));

    const result = await getDebtFixedById({ codUsuario: 1, codDispesaFixa: 999 });

    expect(result).toBeInstanceOf(Error);
  });

  it("deve passar codUsuario e codDispesaFixa nos params", async () => {
    mockGet.mockResolvedValueOnce({ data: [] });

    await getDebtFixedById({ codUsuario: 1, codDispesaFixa: 5 });

    expect(mockGet).toHaveBeenCalledWith(
      "/Debt/fixed/get",
      expect.objectContaining({
        params: expect.objectContaining({ codUsuario: 1, codDispesaFixa: 5 }),
      })
    );
  });
});
