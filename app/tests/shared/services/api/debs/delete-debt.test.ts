import { describe, it, expect, vi, beforeEach } from "vitest";
import { deleteDebt } from "~/shared/services/api/debs/delete-debt";

vi.mock("~/shared/services/api/axiosConfig", () => ({
  coreApi: {
    delete: vi.fn(),
  },
}));

import { coreApi } from "~/shared/services/api/axiosConfig";

const mockDelete = vi.mocked(coreApi.delete);

describe("deleteDebt", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("deve retornar void quando a exclusão de despesa fixa é bem-sucedida", async () => {
    mockDelete.mockResolvedValueOnce({ data: {}, status: 200 });

    const result = await deleteDebt({ codUsuario: 1, codDispesaFixa: 2, nomeDispesa: "fixed" });

    expect(result).toBeUndefined();
    expect(mockDelete).toHaveBeenCalledTimes(1);
  });

  it("deve retornar void quando a exclusão de despesa variável é bem-sucedida", async () => {
    mockDelete.mockResolvedValueOnce({ data: {}, status: 200 });

    const result = await deleteDebt({ codUsuario: 1, codDispesaVariavel: 3, nomeDispesa: "variable" });

    expect(result).toBeUndefined();
  });

  it("deve retornar Error quando a API lança exceção", async () => {
    mockDelete.mockRejectedValueOnce(new Error("Não autorizado"));

    const result = await deleteDebt({ codUsuario: 1, codDispesaFixa: 1, nomeDispesa: "fixed" });

    expect(result).toBeInstanceOf(Error);
    expect((result as Error).message).toBe("Não autorizado");
  });

  it("deve enviar os dados corretos no body da requisição", async () => {
    mockDelete.mockResolvedValueOnce({ data: {}, status: 200 });

    await deleteDebt({ codUsuario: 1, codDispesaFixa: 7, nomeDispesa: "fixed" });

    expect(mockDelete).toHaveBeenCalledWith("/Debt/delete", {
      data: {
        codUsuario: 1,
        codDispesaFixa: 7,
        codDispesaVariavel: undefined,
        nomeDispesa: "fixed",
      },
    });
  });

  it("deve aceitar nomeDispesa 'all' para exclusão total", async () => {
    mockDelete.mockResolvedValueOnce({ data: {}, status: 200 });

    const result = await deleteDebt({ codUsuario: 1, nomeDispesa: "all" });

    expect(result).toBeUndefined();
  });

  it("deve retornar mensagem padrão quando exceção não tem message", async () => {
    mockDelete.mockRejectedValueOnce({});

    const result = await deleteDebt({ codUsuario: 1, nomeDispesa: "fixed" });

    expect(result).toBeInstanceOf(Error);
    expect((result as Error).message).toBe("Erro ao excluir despesa.");
  });
});
