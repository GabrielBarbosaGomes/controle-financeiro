import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import React from "react";
import Home from "~/pages/home/home";
import { renderWithProviders } from "../helpers/renderWithProviders";

vi.mock("~/routes", () => ({
  optionsSideMenu: vi.fn(),
}));

describe("Home page", () => {
  it("deve renderizar sem erros", () => {
    renderWithProviders(<Home />);
  });

  it("deve exibir o título 'Página inicial'", () => {
    renderWithProviders(<Home />);
    expect(screen.getByText("Página inicial")).toBeInTheDocument();
  });

  it("deve renderizar o gráfico de linha", () => {
    const { container } = renderWithProviders(<Home />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("deve renderizar a imagem de saldo positivo", () => {
    renderWithProviders(<Home />);
    const img = screen.getByAltText("Saldo positivo");
    expect(img).toBeInTheDocument();
  });
});
