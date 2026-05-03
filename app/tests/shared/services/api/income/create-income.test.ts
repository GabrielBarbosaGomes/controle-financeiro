import { describe, it, expect, vi, beforeEach } from "vitest";
import { createIncome } from "~/shared/services/api/income/create-income";
import type { ICreateIncome } from "~/shared/services/api/income/create-income";

vi.mock("~/shared/services/api/axiosConfig", () => ({
  coreApi: {
    post: vi.fn(),
  },
}));

import { coreApi } from "~/shared/services/api/axiosConfig";

const mockPost = vi.mocked(coreApi.post);

const payloadValido: ICreateIncome = {
  codUsuario: 1,
  origem: "Salário",
  valor: 3000,
  comentario: "Pagamento mensal",
  data: new Date("2024-01-15"),
};

describe("createIncome", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("deve retornar void quando a criação é bem-sucedida", async () => {
    mockPost.mockResolvedValueOnce({ data: {}, status: 201 });

    const result = await createIncome(payloadValido);

    expect(result).toBeUndefined();
    expect(mockPost).toHaveBeenCalledTimes(1);
  });

  it("deve retornar Error quando valor é null", async () => {
    const payloadInvalido: ICreateIncome = { ...payloadValido, valor: null };

    const result = await createIncome(payloadInvalido);

    expect(result).toBeInstanceOf(Error);
    expect((result as Error).message).toBe("Valor não pode ser nulo.");
    expect(mockPost).not.toHaveBeenCalled();
  });

  it("deve retornar Error quando a API lança exceção", async () => {
    mockPost.mockRejectedValueOnce(new Error("Erro de servidor"));

    const result = await createIncome(payloadValido);

    expect(result).toBeInstanceOf(Error);
    expect((result as Error).message).toBe("Erro de servidor");
  });

  it("deve enviar os dados corretos para a API", async () => {
    mockPost.mockResolvedValueOnce({ data: {}, status: 201 });

    await createIncome(payloadValido);

    expect(mockPost).toHaveBeenCalledWith("/Income/insert", {
      codUsuario: payloadValido.codUsuario,
      origem: payloadValido.origem,
      valor: payloadValido.valor,
      comentario: payloadValido.comentario,
      data: payloadValido.data,
    });
  });

  it("deve retornar mensagem padrão quando a exceção não tem message", async () => {
    mockPost.mockRejectedValueOnce({});

    const result = await createIncome(payloadValido);

    expect(result).toBeInstanceOf(Error);
    expect((result as Error).message).toBe("Erro ao criar despesa Fixa.");
  });
});
