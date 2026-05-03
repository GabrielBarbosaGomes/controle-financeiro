import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { ItemsMenu } from "~/components/sideMenu/ItemsMenu";
import { renderWithProviders } from "../helpers/renderWithProviders";

describe("ItemsMenu", () => {
  it("deve renderizar o label do item de menu", () => {
    renderWithProviders(
      <ItemsMenu label="Dashboard" icon="home" to="/home" onClick={undefined} />
    );
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
  });

  it("deve renderizar o ícone informado", () => {
    renderWithProviders(
      <ItemsMenu label="Dashboard" icon="home" to="/home" onClick={undefined} />
    );
    expect(screen.getByText("home")).toBeInTheDocument();
  });

  it("deve chamar onClick quando clicado e onClick está definido", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    renderWithProviders(
      <ItemsMenu label="Despesas" icon="money" to="/despesas" onClick={onClick} />
    );

    await user.click(screen.getByText("Despesas"));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("não deve lançar erro quando onClick é undefined e o item é clicado", async () => {
    const user = userEvent.setup();
    renderWithProviders(
      <ItemsMenu label="Faturamento" icon="attach_money" to="/faturamento" onClick={undefined} />
    );

    await expect(
      user.click(screen.getByText("Faturamento"))
    ).resolves.not.toThrow();
  });

  it("deve ser renderizado como um ListItemButton", () => {
    renderWithProviders(
      <ItemsMenu label="Home" icon="home" to="/home" onClick={undefined} />
    );
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("deve renderizar múltiplos itens de menu independentes", () => {
    renderWithProviders(
      <>
        <ItemsMenu label="Item 1" icon="home" to="/item1" onClick={undefined} />
        <ItemsMenu label="Item 2" icon="money" to="/item2" onClick={undefined} />
      </>
    );

    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
  });
});
