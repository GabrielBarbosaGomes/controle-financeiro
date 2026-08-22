import { describe, it, expect, vi, beforeEach } from "vitest";
import { getAllDebts } from "~/shared/services/api/debs/get-debit-all";

vi.mock("~/shared/services/api/axiosConfig", () => ({
  coreApi: {
    get: vi.fn(),
  },
}));

import { coreApi } from "~/shared/services/api/axiosConfig";

const mockGet = vi.mocked(coreApi.get);

describe("getAllDebts", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("deve retornar data e totalCount quando a API responde com sucesso", async () => {
    const mockData = [
      { mesAno: new Date("2024-01-01"), totalGasto: 2500 },
      { mesAno: new Date("2024-02-01"), totalGasto: 3000 },
    ];
    mockGet.mockResolvedValueOnce({ data: mockData });

    const result = await getAllDebts({ page: 1, filter: new Date("2024-01-01") });

    expect(result).not.toBeInstanceOf(Error);
    if (!(result instanceof Error)) {
      expect(result.data).toEqual(mockData);
      expect(result.totalCount).toBe(mockData.length);
    }
  });

  it("deve retornar Error quando a API lança exceção", async () => {
    mockGet.mockRejectedValueOnce(new Error("Conexão recusada"));

    const result = await getAllDebts({ page: 1, filter: new Date() });

    expect(result).toBeInstanceOf(Error);
    expect((result as Error).message).toBe("Conexão recusada");
  });

  it("deve chamar a URL correta com os parâmetros", async () => {
    const filterDate = new Date("2024-03-01");
    mockGet.mockResolvedValueOnce({ data: [] });

    await getAllDebts({ page: 2, filter: filterDate });

    expect(mockGet).toHaveBeenCalledWith(
      "/Debt/all/get",
      expect.objectContaining({
        params: expect.objectContaining({ _page: 2, mesAno: filterDate }),
      })
    );
  });

  it("deve enviar codUsuario no filtro (senão o back-end filtra por usuário 0 e nunca retorna dados)", async () => {
    mockGet.mockResolvedValueOnce({ data: [] });

    await getAllDebts({ page: 1, filter: new Date("2024-01-01") });

    expect(mockGet).toHaveBeenCalledWith(
      "/Debt/all/get",
      expect.objectContaining({
        params: expect.objectContaining({ codUsuario: 1 }),
      })
    );
  });

  it("deve retornar mensagem padrão quando exceção não tem message", async () => {
    mockGet.mockRejectedValueOnce({});

    const result = await getAllDebts({ page: 1, filter: new Date() });

    expect(result).toBeInstanceOf(Error);
    expect((result as Error).message).toBe("Erro ao listar as despesas.");
  });

  it("deve retornar totalCount igual ao comprimento dos dados", async () => {
    const mockData = [
      { mesAno: new Date("2024-01-01"), totalGasto: 1000 },
    ];
    mockGet.mockResolvedValueOnce({ data: mockData });

    const result = await getAllDebts({ page: 1, filter: new Date() });

    if (!(result instanceof Error)) {
      expect(result.totalCount).toBe(1);
    }
  });
});
