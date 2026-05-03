import { describe, it, expect, vi, beforeEach } from "vitest";
import { updateDebtFixed } from "~/shared/services/api/debs/debtFixed/update-debt";
import type { IDebtFixed } from "~/shared/services/api/debs/debtFixed/create-debt";

vi.mock("~/shared/services/api/axiosConfig", () => ({
  coreApi: {
    put: vi.fn(),
  },
}));

import { coreApi } from "~/shared/services/api/axiosConfig";

const mockPut = vi.mocked(coreApi.put);

const payloadValido: IDebtFixed = {
  codUsuario: 1,
  CodDespesa: 5,
  nome: "Aluguel",
  valor: 1500,
  valorParcela: 1500,
  quantidadeParcelas: 1,
  tempoIndeterminado: true,
  finalizado: false,
  comentario: "",
  data: new Date("2024-01-01"),
};

describe("updateDebtFixed", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("deve retornar void quando a atualização é bem-sucedida", async () => {
    mockPut.mockResolvedValueOnce({ data: {}, status: 200 });

    const result = await updateDebtFixed(payloadValido);

    expect(result).toBeUndefined();
    expect(mockPut).toHaveBeenCalledTimes(1);
  });

  it("deve retornar Error quando valorParcela é null", async () => {
    const payload = { ...payloadValido, valorParcela: null };

    const result = await updateDebtFixed(payload);

    expect(result).toBeInstanceOf(Error);
    expect((result as Error).message).toBe("Valor ou valor da parcela não pode ser nulo.");
    expect(mockPut).not.toHaveBeenCalled();
  });

  it("deve retornar Error quando valor é null", async () => {
    const payload = { ...payloadValido, valor: null };

    const result = await updateDebtFixed(payload);

    expect(result).toBeInstanceOf(Error);
    expect((result as Error).message).toBe("Valor ou valor da parcela não pode ser nulo.");
  });

  it("deve retornar Error quando quantidadeParcelas é 0", async () => {
    const payload = { ...payloadValido, quantidadeParcelas: 0 };

    const result = await updateDebtFixed(payload);

    expect(result).toBeInstanceOf(Error);
    expect((result as Error).message).toBe("Quantidade de parcelas deve ser maior que zero.");
  });

  it("deve retornar Error quando a API lança exceção", async () => {
    mockPut.mockRejectedValueOnce(new Error("Conflito de dados"));

    const result = await updateDebtFixed(payloadValido);

    expect(result).toBeInstanceOf(Error);
    expect((result as Error).message).toBe("Conflito de dados");
  });

  it("deve enviar id como CodDespesa para a API", async () => {
    mockPut.mockResolvedValueOnce({ data: {}, status: 200 });

    await updateDebtFixed(payloadValido);

    expect(mockPut).toHaveBeenCalledWith("/Debt/fixed/update", expect.objectContaining({
      id: payloadValido.CodDespesa,
    }));
  });
});
