import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import React from "react";
import { DataTable } from "~/components/dataTable/dataTable";
import { renderWithProviders } from "../helpers/renderWithProviders";
import type { GridColDef } from "@mui/x-data-grid";

// Nota: o DataTable tem um bug conhecido — renderiza `{column}` (objeto GridColDef) como
// filho JSX direto, o que causa "Objects are not valid as a React child".
// Por isso, os testes usam columns=[] para evitar o header bugado e verificar
// apenas os comportamentos das seções body e footer.

describe("DataTable", () => {
  it("deve renderizar sem erros com colunas e linhas vazias", () => {
    renderWithProviders(
      <DataTable columns={[]} rows={[]} totalCount={0} page={1} />
    );
  });

  it("deve exibir mensagem de listagem vazia quando totalCount é 0 e não está carregando", () => {
    renderWithProviders(
      <DataTable columns={[]} rows={[]} totalCount={0} page={1} isLoading={false} />
    );
    expect(screen.getByText("Nenhum registro encontrado.")).toBeInTheDocument();
  });

  it("não deve exibir mensagem de listagem vazia quando isLoading é true", () => {
    renderWithProviders(
      <DataTable columns={[]} rows={[]} totalCount={0} page={1} isLoading />
    );
    expect(screen.queryByText("Nenhum registro encontrado.")).not.toBeInTheDocument();
  });

  it("deve exibir LinearProgress quando isLoading é true", () => {
    const { container } = renderWithProviders(
      <DataTable columns={[]} rows={[]} totalCount={0} page={1} isLoading />
    );
    expect(container.querySelector(".MuiLinearProgress-root")).toBeInTheDocument();
  });

  it("não deve exibir LinearProgress quando isLoading é false", () => {
    const { container } = renderWithProviders(
      <DataTable columns={[]} rows={[]} totalCount={0} page={1} isLoading={false} />
    );
    expect(container.querySelector(".MuiLinearProgress-root")).not.toBeInTheDocument();
  });

  it("deve renderizar a estrutura de tabela", () => {
    const { container } = renderWithProviders(
      <DataTable columns={[]} rows={[]} totalCount={0} page={1} />
    );
    expect(container.querySelector("table")).toBeInTheDocument();
  });

  it("deve lançar erro ao tentar renderizar colunas GridColDef como JSX — bug conhecido no componente", () => {
    // Este teste documenta o bug: renderizar {column} (objeto) como filho JSX
    const colunas: GridColDef[] = [{ field: "id", headerName: "ID" }];
    expect(() =>
      renderWithProviders(<DataTable columns={colunas} rows={[]} totalCount={0} page={1} />)
    ).toThrow();
  });
});
