import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { ToolsDetails } from "~/components/toolsDetails/toolsDetails";
import { renderWithProviders } from "../helpers/renderWithProviders";

describe("ToolsDetails", () => {
  it("deve renderizar sem erros com props padrão", () => {
    renderWithProviders(<ToolsDetails />);
  });

  it("deve exibir o botão Salvar por padrão", () => {
    renderWithProviders(<ToolsDetails />);
    expect(screen.getByRole("button", { name: /salvar/i })).toBeInTheDocument();
  });

  it("deve exibir o botão Apagar por padrão", () => {
    renderWithProviders(<ToolsDetails />);
    expect(screen.getByRole("button", { name: /apagar/i })).toBeInTheDocument();
  });

  it("deve ocultar o botão Salvar quando showSaveButton é false", () => {
    renderWithProviders(<ToolsDetails showSaveButton={false} />);
    expect(screen.queryByRole("button", { name: /salvar/i })).not.toBeInTheDocument();
  });

  it("deve ocultar o botão Apagar quando showDeleteButton é false", () => {
    renderWithProviders(<ToolsDetails showDeleteButton={false} />);
    expect(screen.queryByRole("button", { name: /apagar/i })).not.toBeInTheDocument();
  });

  it("deve exibir o botão Salvar e Voltar quando showSaveAndBackButton é true", () => {
    renderWithProviders(<ToolsDetails showSaveAndBackButton />);
    expect(screen.getByRole("button", { name: /salvar e voltar/i })).toBeInTheDocument();
  });

  it("deve chamar clickSave quando o botão Salvar é clicado", async () => {
    const user = userEvent.setup();
    const clickSave = vi.fn();
    renderWithProviders(<ToolsDetails clickSave={clickSave} />);

    await user.click(screen.getByRole("button", { name: /salvar/i }));

    expect(clickSave).toHaveBeenCalledTimes(1);
  });

  it("deve chamar clickDelete quando o botão Apagar é clicado", async () => {
    const user = userEvent.setup();
    const clickDelete = vi.fn();
    renderWithProviders(<ToolsDetails clickDelete={clickDelete} />);

    await user.click(screen.getByRole("button", { name: /apagar/i }));

    expect(clickDelete).toHaveBeenCalledTimes(1);
  });

  it("deve exibir texto customizado no botão Novo", () => {
    renderWithProviders(<ToolsDetails showNewButton textNewButton="Duplicar" />);
    expect(screen.getByRole("button", { name: /duplicar/i })).toBeInTheDocument();
  });

  it("deve exibir Skeleton quando showSaveButtonLoading é true", () => {
    const { container } = renderWithProviders(<ToolsDetails showSaveButtonLoading />);
    expect(container.querySelector(".MuiSkeleton-root")).toBeInTheDocument();
  });

  it("deve chamar clickSaveAndBack quando o botão Salvar e Voltar é clicado", async () => {
    const user = userEvent.setup();
    const clickSaveAndBack = vi.fn();
    renderWithProviders(
      <ToolsDetails showSaveAndBackButton clickSaveAndBack={clickSaveAndBack} />
    );

    await user.click(screen.getByRole("button", { name: /salvar e voltar/i }));

    expect(clickSaveAndBack).toHaveBeenCalledTimes(1);
  });
});
