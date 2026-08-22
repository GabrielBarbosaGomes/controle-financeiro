import { describe, it, expect, vi, beforeEach } from "vitest";
import { updateDebtVariable } from "~/shared/services/api/debs/debtVariables/update-debt";
import type { ICreateDebtVariablePayload } from "~/shared/services/api/debs/debtVariables/create-debt";

vi.mock("~/shared/services/api/axiosConfig", () => ({
  coreApi: {
    put: vi.fn(),
  },
}));

import { coreApi } from "~/shared/services/api/axiosConfig";

const mockPut = vi.mocked(coreApi.put);

const payloadValido: ICreateDebtVariablePayload = {
  id: 3,
  codUsuario: 1,
  nome: "Gasolina",
  valor: 200,
  categoria: "Transporte",
  comentario: "Abastecimento",
  data: new Date("2024-03-05"),
};

describe("updateDebtVariable", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("deve retornar void quando a atualização é bem-sucedida", async () => {
    mockPut.mockResolvedValueOnce({ data: {}, status: 200 });

    const result = await updateDebtVariable(payloadValido);

    expect(result).toBeUndefined();
    expect(mockPut).toHaveBeenCalledTimes(1);
  });

  it("deve retornar Error quando valor é null", async () => {
    const payload = { ...payloadValido, valor: null };

    const result = await updateDebtVariable(payload);

    expect(result).toBeInstanceOf(Error);
    expect((result as Error).message).toBe("Valor não pode ser nulo.");
    expect(mockPut).not.toHaveBeenCalled();
  });

  it("deve retornar Error quando a API lança exceção", async () => {
    mockPut.mockRejectedValueOnce(new Error("Registro não existe"));

    const result = await updateDebtVariable(payloadValido);

    expect(result).toBeInstanceOf(Error);
    expect((result as Error).message).toBe("Registro não existe");
  });

  it("deve enviar os dados corretos para a API", async () => {
    mockPut.mockResolvedValueOnce({ data: {}, status: 200 });

    await updateDebtVariable(payloadValido);

    expect(mockPut).toHaveBeenCalledWith("/Debt/variable/update", {
      id: payloadValido.id,
      codUsuario: payloadValido.codUsuario,
      nome: payloadValido.nome,
      valor: payloadValido.valor,
      categoria: payloadValido.categoria,
      comentario: payloadValido.comentario,
      data: payloadValido.data,
    });
  });

  it("deve retornar mensagem padrão quando exceção não tem message", async () => {
    mockPut.mockRejectedValueOnce({});

    const result = await updateDebtVariable(payloadValido);

    expect(result).toBeInstanceOf(Error);
    expect((result as Error).message).toBe("Erro ao atualizar despesa variável.");
  });
});
