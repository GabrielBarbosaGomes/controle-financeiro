import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { HorizontalTabs } from "~/components/tabs/tabs";
import { renderWithProviders } from "../helpers/renderWithProviders";

describe("HorizontalTabs", () => {
  it("deve renderizar sem erros com uma aba", () => {
    renderWithProviders(
      <HorizontalTabs>
        <HorizontalTabs.Tab label="Aba 1">Conteúdo 1</HorizontalTabs.Tab>
      </HorizontalTabs>
    );
    expect(screen.getByText("Aba 1")).toBeInTheDocument();
  });

  it("deve renderizar múltiplas abas", () => {
    renderWithProviders(
      <HorizontalTabs>
        <HorizontalTabs.Tab label="Fixo">Conteúdo Fixo</HorizontalTabs.Tab>
        <HorizontalTabs.Tab label="Variável">Conteúdo Variável</HorizontalTabs.Tab>
      </HorizontalTabs>
    );

    expect(screen.getByText("Fixo")).toBeInTheDocument();
    expect(screen.getByText("Variável")).toBeInTheDocument();
  });

  it("deve exibir o conteúdo da primeira aba por padrão", () => {
    renderWithProviders(
      <HorizontalTabs>
        <HorizontalTabs.Tab label="Aba 1">Conteúdo da Aba 1</HorizontalTabs.Tab>
        <HorizontalTabs.Tab label="Aba 2">Conteúdo da Aba 2</HorizontalTabs.Tab>
      </HorizontalTabs>
    );

    expect(screen.getByText("Conteúdo da Aba 1")).toBeInTheDocument();
    expect(screen.queryByText("Conteúdo da Aba 2")).not.toBeInTheDocument();
  });

  it("deve exibir o conteúdo da aba clicada", async () => {
    const user = userEvent.setup();
    renderWithProviders(
      <HorizontalTabs>
        <HorizontalTabs.Tab label="Aba 1">Conteúdo da Aba 1</HorizontalTabs.Tab>
        <HorizontalTabs.Tab label="Aba 2">Conteúdo da Aba 2</HorizontalTabs.Tab>
      </HorizontalTabs>
    );

    await user.click(screen.getByText("Aba 2"));

    expect(screen.queryByText("Conteúdo da Aba 1")).not.toBeInTheDocument();
    expect(screen.getByText("Conteúdo da Aba 2")).toBeInTheDocument();
  });

  it("deve chamar onChangeTab com o índice correto ao trocar de aba", async () => {
    const user = userEvent.setup();
    const onChangeTab = vi.fn();
    renderWithProviders(
      <HorizontalTabs onChangeTab={onChangeTab}>
        <HorizontalTabs.Tab label="Aba 1">Conteúdo 1</HorizontalTabs.Tab>
        <HorizontalTabs.Tab label="Aba 2">Conteúdo 2</HorizontalTabs.Tab>
      </HorizontalTabs>
    );

    await user.click(screen.getByText("Aba 2"));

    expect(onChangeTab).toHaveBeenCalledWith(1);
  });

  it("deve usar o índice padrão correto via defaultTabIndex", () => {
    renderWithProviders(
      <HorizontalTabs defaultTabIndex={1}>
        <HorizontalTabs.Tab label="Aba 1">Conteúdo da Aba 1</HorizontalTabs.Tab>
        <HorizontalTabs.Tab label="Aba 2">Conteúdo da Aba 2</HorizontalTabs.Tab>
      </HorizontalTabs>
    );

    expect(screen.queryByText("Conteúdo da Aba 1")).not.toBeInTheDocument();
    expect(screen.getByText("Conteúdo da Aba 2")).toBeInTheDocument();
  });

  it("deve ter o atributo aria-label correto no componente de abas", () => {
    renderWithProviders(
      <HorizontalTabs>
        <HorizontalTabs.Tab label="Aba 1">Conteúdo</HorizontalTabs.Tab>
      </HorizontalTabs>
    );

    expect(screen.getByRole("tablist")).toHaveAttribute("aria-label", "Abas de edição");
  });
});
