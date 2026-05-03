import { describe, it, expect, vi, beforeEach } from "vitest";
import { updateIncome } from "~/shared/services/api/income/update-income";
import type { ICreateIncome } from "~/shared/services/api/income/create-income";

vi.mock("~/shared/services/api/axiosConfig", () => ({
  coreApi: {
    put: vi.fn(),
  },
}));

import { coreApi } from "~/shared/services/api/axiosConfig";

const mockPut = vi.mocked(coreApi.put);

const payloadValido: ICreateIncome = {
  codUsuario: 1,
  CodFaturamento: 10,
  origem: "Salário",
  valor: 5000,
  comentario: "Ajuste salarial",
  data: new Date("2024-03-01"),
};

describe("updateIncome", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("deve retornar void quando a atualização é bem-sucedida", async () => {
    mockPut.mockResolvedValueOnce({ data: {}, status: 200 });

    const result = await updateIncome(payloadValido);

    expect(result).toBeUndefined();
    expect(mockPut).toHaveBeenCalledTimes(1);
  });

  it("deve retornar Error quando valor é null", async () => {
    const payloadInvalido: ICreateIncome = { ...payloadValido, valor: null };

    const result = await updateIncome(payloadInvalido);

    expect(result).toBeInstanceOf(Error);
    expect((result as Error).message).toBe("Valor não pode ser nulo.");
    expect(mockPut).not.toHaveBeenCalled();
  });

  it("deve retornar Error quando a API lança exceção", async () => {
    mockPut.mockRejectedValueOnce(new Error("Timeout na requisição"));

    const result = await updateIncome(payloadValido);

    expect(result).toBeInstanceOf(Error);
    expect((result as Error).message).toBe("Timeout na requisição");
  });

  it("deve enviar id como CodFaturamento para a API", async () => {
    mockPut.mockResolvedValueOnce({ data: {}, status: 200 });

    await updateIncome(payloadValido);

    expect(mockPut).toHaveBeenCalledWith("/Income/update", expect.objectContaining({
      id: payloadValido.CodFaturamento,
    }));
  });

  it("deve retornar mensagem padrão quando a exceção não tem message", async () => {
    mockPut.mockRejectedValueOnce({});

    const result = await updateIncome(payloadValido);

    expect(result).toBeInstanceOf(Error);
    expect((result as Error).message).toBe("Erro ao Atualizar Faturamento.");
  });
});
