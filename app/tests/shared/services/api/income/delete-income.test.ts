import { describe, it, expect, vi, beforeEach } from "vitest";
import { deleteIncome } from "~/shared/services/api/income/delete-income";

vi.mock("~/shared/services/api/axiosConfig", () => ({
  coreApi: {
    delete: vi.fn(),
  },
}));

import { coreApi } from "~/shared/services/api/axiosConfig";

const mockDelete = vi.mocked(coreApi.delete);

describe("deleteIncome", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("deve retornar void quando a exclusão é bem-sucedida", async () => {
    mockDelete.mockResolvedValueOnce({ data: {}, status: 200 });

    const result = await deleteIncome({ codUsuario: 1, id: 5 });

    expect(result).toBeUndefined();
    expect(mockDelete).toHaveBeenCalledTimes(1);
  });

  it("deve retornar Error quando a API lança exceção", async () => {
    mockDelete.mockRejectedValueOnce(new Error("Registro não encontrado"));

    const result = await deleteIncome({ codUsuario: 1, id: 99 });

    expect(result).toBeInstanceOf(Error);
    expect((result as Error).message).toBe("Registro não encontrado");
  });

  it("deve enviar codUsuario e id no body da requisição", async () => {
    mockDelete.mockResolvedValueOnce({ data: {}, status: 200 });

    await deleteIncome({ codUsuario: 1, id: 7 });

    expect(mockDelete).toHaveBeenCalledWith("/Income/delete", {
      data: { codUsuario: 1, id: 7 },
    });
  });

  it("deve funcionar sem o campo id (exclusão por codUsuario)", async () => {
    mockDelete.mockResolvedValueOnce({ data: {}, status: 200 });

    const result = await deleteIncome({ codUsuario: 1 });

    expect(result).toBeUndefined();
  });

  it("deve retornar mensagem padrão quando a exceção não tem message", async () => {
    mockDelete.mockRejectedValueOnce({});

    const result = await deleteIncome({ codUsuario: 1, id: 1 });

    expect(result).toBeInstanceOf(Error);
    expect((result as Error).message).toBe("Erro ao excluir Faturamento.");
  });
});
