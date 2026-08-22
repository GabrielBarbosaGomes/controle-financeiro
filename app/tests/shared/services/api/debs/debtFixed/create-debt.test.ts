import { describe, it, expect, vi, beforeEach } from "vitest";
import { createDebtFixed } from "~/shared/services/api/debs/debtFixed/create-debt";
import type { IDebtFixed } from "~/shared/services/api/debs/debtFixed/create-debt";

vi.mock("~/shared/services/api/axiosConfig", () => ({
  coreApi: {
    post: vi.fn(),
  },
}));

import { coreApi } from "~/shared/services/api/axiosConfig";

const mockPost = vi.mocked(coreApi.post);

const payloadValido: IDebtFixed = {
  codUsuario: 1,
  CodDespesa: 0,
  nome: "Internet",
  valor: 1200,
  valorParcela: 100,
  quantidadeParcelas: 12,
  tempoIndeterminado: false,
  finalizado: false,
  categoria: "Moradia",
  comentario: "Plano fibra",
  data: new Date("2024-01-01"),
};

describe("createDebtFixed", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("deve retornar void quando a criação é bem-sucedida", async () => {
    mockPost.mockResolvedValueOnce({ data: {}, status: 201 });

    const result = await createDebtFixed(payloadValido);

    expect(result).toBeUndefined();
    expect(mockPost).toHaveBeenCalledTimes(1);
  });

  it("deve retornar Error quando valorParcela é null", async () => {
    const payload = { ...payloadValido, valorParcela: null };

    const result = await createDebtFixed(payload);

    expect(result).toBeInstanceOf(Error);
    expect((result as Error).message).toBe("Valor ou valor da parcela não pode ser nulo.");
    expect(mockPost).not.toHaveBeenCalled();
  });

  it("deve retornar Error quando valor é null", async () => {
    const payload = { ...payloadValido, valor: null };

    const result = await createDebtFixed(payload);

    expect(result).toBeInstanceOf(Error);
    expect((result as Error).message).toBe("Valor ou valor da parcela não pode ser nulo.");
    expect(mockPost).not.toHaveBeenCalled();
  });

  it("deve retornar Error quando quantidadeParcelas é 0", async () => {
    const payload = { ...payloadValido, quantidadeParcelas: 0 };

    const result = await createDebtFixed(payload);

    expect(result).toBeInstanceOf(Error);
    expect((result as Error).message).toBe("Quantidade de parcelas deve ser maior que zero.");
    expect(mockPost).not.toHaveBeenCalled();
  });

  it("deve retornar Error quando quantidadeParcelas é negativa", async () => {
    const payload = { ...payloadValido, quantidadeParcelas: -1 };

    const result = await createDebtFixed(payload);

    expect(result).toBeInstanceOf(Error);
    expect((result as Error).message).toBe("Quantidade de parcelas deve ser maior que zero.");
  });

  it("deve retornar Error quando a API lança exceção", async () => {
    mockPost.mockRejectedValueOnce(new Error("Falha no servidor"));

    const result = await createDebtFixed(payloadValido);

    expect(result).toBeInstanceOf(Error);
    expect((result as Error).message).toBe("Falha no servidor");
  });

  it("deve enviar os dados corretos para a API", async () => {
    mockPost.mockResolvedValueOnce({ data: {}, status: 201 });

    await createDebtFixed(payloadValido);

    expect(mockPost).toHaveBeenCalledWith("/Debt/fixed/insert", expect.objectContaining({
      codUsuario: payloadValido.codUsuario,
      nome: payloadValido.nome,
      valor: payloadValido.valor,
      valorParcela: payloadValido.valorParcela,
      quantidadeParcelas: payloadValido.quantidadeParcelas,
    }));
  });

  it("deve retornar mensagem padrão quando exceção não tem message", async () => {
    mockPost.mockRejectedValueOnce({});

    const result = await createDebtFixed(payloadValido);

    expect(result).toBeInstanceOf(Error);
    expect((result as Error).message).toBe("Erro ao criar despesa Fixa.");
  });
});
