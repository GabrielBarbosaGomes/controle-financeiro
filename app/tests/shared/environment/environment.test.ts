import { describe, it, expect } from "vitest";
import { Environment } from "~/shared/environment";

describe("Environment", () => {
  it("deve ter LIMITE_DE_LINHA igual a 5", () => {
    expect(Environment.LIMITE_DE_LINHA).toBe(5);
  });

  it("deve ter INPUT_DE_BUSCA definido", () => {
    expect(Environment.INPUT_DE_BUSCA).toBe("Pesquisar...");
  });

  it("deve ter LISTAGEM_VAZIA definido", () => {
    expect(Environment.LISTAGEM_VAZIA).toBe("Nenhum registro encontrado.");
  });

  it("deve ter URL_BASE definida como string não vazia", () => {
    expect(typeof Environment.URL_BASE).toBe("string");
    expect(Environment.URL_BASE.length).toBeGreaterThan(0);
  });
});
