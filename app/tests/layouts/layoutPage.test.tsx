import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { LayoutPage } from "~/shared/layouts/layoutPages";
import { renderWithProviders } from "../helpers/renderWithProviders";

describe("LayoutPage", () => {
  it("deve renderizar o título informado", () => {
    renderWithProviders(<LayoutPage titulo="Despesas" />);
    expect(screen.getByText("Despesas")).toBeInTheDocument();
  });

  it("deve renderizar o conteúdo filho", () => {
    renderWithProviders(
      <LayoutPage titulo="Home">
        <p>Conteúdo da página</p>
      </LayoutPage>
    );
    expect(screen.getByText("Conteúdo da página")).toBeInTheDocument();
  });

  it("deve renderizar a barra de ferramentas quando barraDeFerramentas é fornecida", () => {
    renderWithProviders(
      <LayoutPage titulo="Home" barraDeFerramentas={<div>Toolbar aqui</div>} />
    );
    expect(screen.getByText("Toolbar aqui")).toBeInTheDocument();
  });

  it("não deve renderizar a barra de ferramentas quando não é fornecida", () => {
    renderWithProviders(<LayoutPage titulo="Home" />);
    expect(screen.queryByText("Toolbar aqui")).not.toBeInTheDocument();
  });

  it("deve exibir o LinearProgress quando isLoading é true", () => {
    const { container } = renderWithProviders(
      <LayoutPage titulo="Carregando..." isLoading />
    );
    expect(container.querySelector(".MuiLinearProgress-root")).toBeInTheDocument();
  });

  it("não deve exibir LinearProgress quando isLoading é false", () => {
    const { container } = renderWithProviders(
      <LayoutPage titulo="Pronto" isLoading={false} />
    );
    expect(container.querySelector(".MuiLinearProgress-root")).not.toBeInTheDocument();
  });

  it("deve renderizar diferentes títulos corretamente", () => {
    const { rerender } = renderWithProviders(<LayoutPage titulo="Faturamento" />);
    expect(screen.getByText("Faturamento")).toBeInTheDocument();

    rerender(<LayoutPage titulo="Despesas" />);
    expect(screen.getByText("Despesas")).toBeInTheDocument();
  });
});
