import { describe, it, expect } from "vitest";
import type { AxiosError, AxiosResponse } from "axios";
import { errorInterceptor } from "~/shared/services/api/axiosConfig/interceptors/errorInterceptor";
import { successInterceptor } from "~/shared/services/api/axiosConfig/interceptors/successInterceptor";

describe("successInterceptor", () => {
  it("deve retornar o response sem alterações", () => {
    const mockResponse = {
      data: { id: 1, nome: "Teste" },
      status: 200,
      statusText: "OK",
      headers: {},
      config: {} as any,
    } as AxiosResponse;

    const result = successInterceptor(mockResponse);
    expect(result).toBe(mockResponse);
  });

  it("deve retornar response com dados complexos intactos", () => {
    const mockResponse = {
      data: [{ id: 1 }, { id: 2 }],
      status: 200,
      statusText: "OK",
      headers: {},
      config: {} as any,
    } as AxiosResponse;

    const result = successInterceptor(mockResponse);
    expect(result.data).toEqual([{ id: 1 }, { id: 2 }]);
  });
});

describe("errorInterceptor", () => {
  it("deve rejeitar com 'Erro de conexão.' para Network Error", async () => {
    const networkError = {
      message: "Network Error",
      response: undefined,
    } as AxiosError;

    await expect(errorInterceptor(networkError)).rejects.toThrow("Erro de conexão.");
  });

  it("deve rejeitar o error original para outros erros", async () => {
    const genericError = {
      message: "Internal Server Error",
      response: { status: 500 },
    } as AxiosError;

    await expect(errorInterceptor(genericError)).rejects.toBe(genericError);
  });

  it("deve rejeitar o error original para status 401 sem mensagem customizada", async () => {
    const authError = {
      message: "Unauthorized",
      response: { status: 401 },
    } as AxiosError;

    await expect(errorInterceptor(authError)).rejects.toBe(authError);
  });

  it("deve rejeitar o error original para status 404", async () => {
    const notFoundError = {
      message: "Not Found",
      response: { status: 404 },
    } as AxiosError;

    await expect(errorInterceptor(notFoundError)).rejects.toBe(notFoundError);
  });
});
