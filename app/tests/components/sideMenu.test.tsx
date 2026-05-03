import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { SideMenu } from "~/components/sideMenu/sideMenu";
import { renderWithProviders } from "../helpers/renderWithProviders";

vi.mock("~/routes", () => ({
  optionsSideMenu: vi.fn(),
}));

describe("SideMenu", () => {
  it("deve renderizar sem erros", () => {
    renderWithProviders(<SideMenu />);
  });

  it("deve renderizar o conteúdo filho passado", () => {
    renderWithProviders(<SideMenu><p>Conteúdo interno</p></SideMenu>);
    expect(screen.getByText("Conteúdo interno")).toBeInTheDocument();
  });

  it("deve exibir o botão de alternância de tema", () => {
    renderWithProviders(<SideMenu />);
    expect(screen.getByText(/aparência/i)).toBeInTheDocument();
  });

  it("deve exibir o texto 'Escuro' quando o tema está em modo claro", () => {
    renderWithProviders(<SideMenu />);
    expect(screen.getByText(/escuro/i)).toBeInTheDocument();
  });

  it("deve renderizar o Avatar do usuário", () => {
    renderWithProviders(<SideMenu />);
    const avatar = document.querySelector(".MuiAvatar-img");
    expect(avatar).toBeInTheDocument();
  });

  it("deve renderizar o Drawer", () => {
    renderWithProviders(<SideMenu />);
    expect(document.querySelector(".MuiDrawer-root")).toBeInTheDocument();
  });

  it("deve alternar o tema ao clicar no botão de aparência", async () => {
    const user = userEvent.setup();
    renderWithProviders(<SideMenu />);

    // MUI ListItemButton renderiza como div[role="button"], não como li
    const themeButton = screen.getByText(/aparência/i).closest("[role='button']")!;
    await user.click(themeButton);

    expect(screen.getByText(/aparência: claro/i)).toBeInTheDocument();
  });
});
