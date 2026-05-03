import { describe, it, expect, vi, beforeEach } from "vitest";
import { getIncome, getIncomeMonths, getIncomeById } from "~/shared/services/api/income/get-income";

vi.mock("~/shared/services/api/axiosConfig", () => ({
  coreApi: {
    get: vi.fn(),
  },
}));

import { coreApi } from "~/shared/services/api/axiosConfig";

const mockGet = vi.mocked(coreApi.get);

describe("getIncomeMonths", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("deve retornar data e totalCount quando a API responde com sucesso", async () => {
    const mockData = [
      { mesAno: new Date("2024-01-01"), totalFaturado: 5000 },
      { mesAno: new Date("2024-02-01"), totalFaturado: 6000 },
    ];
    mockGet.mockResolvedValueOnce({ data: mockData });

    const result = await getIncomeMonths(1, "");

    expect(result).not.toBeInstanceOf(Error);
    if (!(result instanceof Error)) {
      expect(result.data).toEqual(mockData);
      expect(result.totalCount).toBe(mockData.length);
    }
  });

  it("deve retornar Error quando a API lança exceção", async () => {
    mockGet.mockRejectedValueOnce(new Error("Falha na conexão"));

    const result = await getIncomeMonths(1, "");

    expect(result).toBeInstanceOf(Error);
    expect((result as Error).message).toBe("Falha na conexão");
  });

  it("deve chamar a URL correta com os parâmetros de página e filtro", async () => {
    mockGet.mockResolvedValueOnce({ data: [] });

    await getIncomeMonths(2, "jan");

    expect(mockGet).toHaveBeenCalledWith(
      expect.stringContaining("/Income/months/get")
    );
  });
});

describe("getIncome", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("deve retornar data e totalCount quando a API responde com sucesso", async () => {
    const mockData = [
      { id: 1, codUsuario: 1, origem: "Salário", valor: 3000, data: new Date(), comentario: "" },
    ];
    mockGet.mockResolvedValueOnce({ data: mockData });

    const result = await getIncome(1, "", new Date());

    expect(result).not.toBeInstanceOf(Error);
    if (!(result instanceof Error)) {
      expect(result.data).toEqual(mockData);
      expect(result.totalCount).toBe(mockData.length);
    }
  });

  it("deve retornar Error quando a API lança exceção", async () => {
    mockGet.mockRejectedValueOnce(new Error("Timeout"));

    const result = await getIncome();

    expect(result).toBeInstanceOf(Error);
    expect((result as Error).message).toBe("Timeout");
  });

  it("deve usar valores padrão quando parâmetros não são fornecidos", async () => {
    mockGet.mockResolvedValueOnce({ data: [] });

    await getIncome();

    expect(mockGet).toHaveBeenCalledWith(
      "/Income/all/get",
      expect.objectContaining({
        params: expect.objectContaining({ codUsuario: 1, _page: 1 }),
      })
    );
  });
});

describe("getIncomeById", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("deve retornar data e totalCount quando encontra o registro", async () => {
    const mockData = [{ id: 5, codUsuario: 1, origem: "Freelance", valor: 1500, data: new Date(), comentario: "" }];
    mockGet.mockResolvedValueOnce({ data: mockData });

    const result = await getIncomeById({ codUsuario: 1, id: 5 });

    expect(result).not.toBeInstanceOf(Error);
    if (!(result instanceof Error)) {
      expect(result.data).toEqual(mockData);
    }
  });

  it("deve retornar Error quando a API falha", async () => {
    mockGet.mockRejectedValueOnce(new Error("Not found"));

    const result = await getIncomeById({ codUsuario: 1, id: 999 });

    expect(result).toBeInstanceOf(Error);
  });

  it("deve passar os parâmetros codUsuario e id corretamente", async () => {
    mockGet.mockResolvedValueOnce({ data: [] });

    await getIncomeById({ codUsuario: 1, id: 42, origem: "Salário" });

    expect(mockGet).toHaveBeenCalledWith(
      "/Income/all/get",
      expect.objectContaining({
        params: expect.objectContaining({ codUsuario: 1, id: 42, origem: "Salário" }),
      })
    );
  });
});
