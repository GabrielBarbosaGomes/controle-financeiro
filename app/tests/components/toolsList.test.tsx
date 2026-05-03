import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { ToolsList } from "~/components/toolsList/toolsList";
import { renderWithProviders } from "../helpers/renderWithProviders";

describe("ToolsList", () => {
  it("deve renderizar sem erros com props padrão", () => {
    renderWithProviders(<ToolsList />);
  });

  it("deve exibir o campo de busca quando showInputResearch é true", () => {
    renderWithProviders(<ToolsList showInputResearch />);
    expect(screen.getByPlaceholderText("Pesquisar...")).toBeInTheDocument();
  });

  it("não deve exibir o campo de busca quando showInputResearch é false", () => {
    renderWithProviders(<ToolsList showInputResearch={false} />);
    expect(screen.queryByPlaceholderText("Pesquisar...")).not.toBeInTheDocument();
  });

  it("deve exibir o botão com texto padrão 'Novo'", () => {
    renderWithProviders(<ToolsList showButton />);
    expect(screen.getByRole("button", { name: /novo/i })).toBeInTheDocument();
  });

  it("deve exibir o botão com texto customizado", () => {
    renderWithProviders(<ToolsList showButton textButton="Adicionar" />);
    expect(screen.getByRole("button", { name: /adicionar/i })).toBeInTheDocument();
  });

  it("não deve exibir o botão quando showButton é false", () => {
    renderWithProviders(<ToolsList showButton={false} />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("deve chamar clickButton quando o botão é clicado", async () => {
    const user = userEvent.setup();
    const clickButton = vi.fn();
    renderWithProviders(<ToolsList showButton clickButton={clickButton} />);

    await user.click(screen.getByRole("button", { name: /novo/i }));

    expect(clickButton).toHaveBeenCalledTimes(1);
  });

  it("deve chamar changeTextResearch ao digitar no campo de busca", async () => {
    const user = userEvent.setup();
    const changeTextResearch = vi.fn();
    renderWithProviders(
      <ToolsList showInputResearch changeTextResearch={changeTextResearch} />
    );

    await user.type(screen.getByPlaceholderText("Pesquisar..."), "teste");

    expect(changeTextResearch).toHaveBeenCalled();
  });

  it("deve exibir o valor de researchText no campo de busca", () => {
    renderWithProviders(
      <ToolsList showInputResearch researchText="meu texto" />
    );
    expect(screen.getByDisplayValue("meu texto")).toBeInTheDocument();
  });
});
