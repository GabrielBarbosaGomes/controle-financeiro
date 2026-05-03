import { describe, it, expect, vi, beforeEach } from "vitest";
import { getDebtVariables, getDebtVariablesById } from "~/shared/services/api/debs/debtVariables/get-debt";

vi.mock("~/shared/services/api/axiosConfig", () => ({
  coreApi: {
    get: vi.fn(),
  },
}));

import { coreApi } from "~/shared/services/api/axiosConfig";

const mockGet = vi.mocked(coreApi.get);

const filtroValido = {
  busca: "",
  dateDespesa: new Date("2024-02-01"),
  pagina: 1,
};

describe("getDebtVariables", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("deve retornar data e totalCount quando a API responde com sucesso", async () => {
    const mockData = [
      { id: 1, codUsuario: 1, nome: "Mercado", valor: 500, data: new Date() },
    ];
    mockGet.mockResolvedValueOnce({ data: mockData });

    const result = await getDebtVariables(filtroValido);

    expect(result).not.toBeInstanceOf(Error);
    if (!(result instanceof Error)) {
      expect(result.data).toEqual(mockData);
      expect(result.totalCount).toBe(mockData.length);
    }
  });

  it("deve retornar Error quando a API lança exceção", async () => {
    mockGet.mockRejectedValueOnce(new Error("Serviço indisponível"));

    const result = await getDebtVariables(filtroValido);

    expect(result).toBeInstanceOf(Error);
    expect((result as Error).message).toBe("Serviço indisponível");
  });

  it("deve chamar a URL correta", async () => {
    mockGet.mockResolvedValueOnce({ data: [] });

    await getDebtVariables(filtroValido);

    expect(mockGet).toHaveBeenCalledWith(
      "/Debt/variable/get",
      expect.objectContaining({ params: expect.any(Object) })
    );
  });

  it("deve retornar mensagem padrão quando exceção não tem message", async () => {
    mockGet.mockRejectedValueOnce({});

    const result = await getDebtVariables(filtroValido);

    expect(result).toBeInstanceOf(Error);
    expect((result as Error).message).toBe("Erro ao listar as despesas fixas.");
  });
});

describe("getDebtVariablesById", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("deve retornar data e totalCount quando encontra o registro", async () => {
    const mockData = [{ id: 2, codUsuario: 1, nome: "Farmácia", valor: 150, data: new Date() }];
    mockGet.mockResolvedValueOnce({ data: mockData });

    const result = await getDebtVariablesById({ codUsuario: 1, codDispesaVariable: 2 });

    expect(result).not.toBeInstanceOf(Error);
    if (!(result instanceof Error)) {
      expect(result.data).toEqual(mockData);
    }
  });

  it("deve retornar Error quando a API falha", async () => {
    mockGet.mockRejectedValueOnce(new Error("Not found"));

    const result = await getDebtVariablesById({ codUsuario: 1, codDispesaVariable: 999 });

    expect(result).toBeInstanceOf(Error);
  });

  it("deve passar os parâmetros corretos na requisição", async () => {
    mockGet.mockResolvedValueOnce({ data: [] });

    await getDebtVariablesById({ codUsuario: 1, codDispesaVariable: 8 });

    expect(mockGet).toHaveBeenCalledWith(
      "/Debt/variable/get",
      expect.objectContaining({
        params: expect.objectContaining({ codUsuario: 1, codDispesaVariavel: 8 }),
      })
    );
  });
});
