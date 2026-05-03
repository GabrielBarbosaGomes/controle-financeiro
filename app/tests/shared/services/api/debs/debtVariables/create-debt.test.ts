import { describe, it, expect, vi, beforeEach } from "vitest";
import { createDebtVariable } from "~/shared/services/api/debs/debtVariables/create-debt";
import type { ICreateDebtVariablePayload } from "~/shared/services/api/debs/debtVariables/create-debt";

vi.mock("~/shared/services/api/axiosConfig", () => ({
  coreApi: {
    post: vi.fn(),
  },
}));

import { coreApi } from "~/shared/services/api/axiosConfig";

const mockPost = vi.mocked(coreApi.post);

const payloadValido: ICreateDebtVariablePayload = {
  id: 0,
  codUsuario: 1,
  nome: "Mercado",
  valor: 350,
  comentario: "Compras do mês",
  data: new Date("2024-02-10"),
};

describe("createDebtVariable", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("deve retornar void quando a criação é bem-sucedida", async () => {
    mockPost.mockResolvedValueOnce({ data: {}, status: 201 });

    const result = await createDebtVariable(payloadValido);

    expect(result).toBeUndefined();
    expect(mockPost).toHaveBeenCalledTimes(1);
  });

  it("deve retornar Error quando valor é null", async () => {
    const payload = { ...payloadValido, valor: null };

    const result = await createDebtVariable(payload);

    expect(result).toBeInstanceOf(Error);
    expect((result as Error).message).toBe("Valor não pode ser nulo.");
    expect(mockPost).not.toHaveBeenCalled();
  });

  it("deve retornar Error quando a API lança exceção", async () => {
    mockPost.mockRejectedValueOnce(new Error("Erro interno"));

    const result = await createDebtVariable(payloadValido);

    expect(result).toBeInstanceOf(Error);
    expect((result as Error).message).toBe("Erro interno");
  });

  it("deve enviar os dados corretos para a API", async () => {
    mockPost.mockResolvedValueOnce({ data: {}, status: 201 });

    await createDebtVariable(payloadValido);

    expect(mockPost).toHaveBeenCalledWith("/Debt/variable/insert", {
      codUsuario: payloadValido.codUsuario,
      nome: payloadValido.nome,
      valor: payloadValido.valor,
      comentario: payloadValido.comentario,
      data: payloadValido.data,
    });
  });

  it("deve retornar mensagem padrão quando exceção não tem message", async () => {
    mockPost.mockRejectedValueOnce({});

    const result = await createDebtVariable(payloadValido);

    expect(result).toBeInstanceOf(Error);
    expect((result as Error).message).toBe("Erro ao criar despesa variável.");
  });
});
