import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import React from "react";
import Login from "~/pages/login/login";
import { renderWithProviders } from "../helpers/renderWithProviders";

describe("Login page", () => {
  it("deve renderizar sem erros", () => {
    renderWithProviders(<Login />);
  });

  it("deve exibir o campo de Email", () => {
    renderWithProviders(<Login />);
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
  });

  it("deve exibir o campo de Senha", () => {
    renderWithProviders(<Login />);
    expect(screen.getByLabelText("Senha")).toBeInTheDocument();
  });

  it("deve ter o campo de Senha com type='password'", () => {
    renderWithProviders(<Login />);
    const senhaInput = screen.getByLabelText("Senha");
    expect(senhaInput).toHaveAttribute("type", "password");
  });

  it("deve exibir o logo da aplicação", () => {
    renderWithProviders(<Login />);
    const logo = screen.getByAltText("logo");
    expect(logo).toBeInTheDocument();
  });

  it("deve ter o campo de Email com placeholder correto", () => {
    renderWithProviders(<Login />);
    expect(screen.getByPlaceholderText("email")).toBeInTheDocument();
  });

  it("deve ter o campo de Senha com placeholder correto", () => {
    renderWithProviders(<Login />);
    expect(screen.getByPlaceholderText("senha")).toBeInTheDocument();
  });
});
