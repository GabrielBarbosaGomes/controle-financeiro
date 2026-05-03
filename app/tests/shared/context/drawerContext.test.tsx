import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import React from "react";
import { DrawerProvider, useDrawerContext } from "~/shared/context/drawerContext";

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <DrawerProvider>{children}</DrawerProvider>
);

describe("DrawerContext", () => {
  it("deve inicializar com isDrawerOpen igual a false", () => {
    const { result } = renderHook(() => useDrawerContext(), { wrapper });
    expect(result.current.isDrawerOpen).toBe(false);
  });

  it("deve inicializar com drawerOptions como array vazio", () => {
    const { result } = renderHook(() => useDrawerContext(), { wrapper });
    expect(result.current.drawerOptions).toEqual([]);
  });

  it("toggleDrawerOpen deve alternar isDrawerOpen de false para true", () => {
    const { result } = renderHook(() => useDrawerContext(), { wrapper });

    act(() => {
      result.current.toggleDrawerOpen();
    });

    expect(result.current.isDrawerOpen).toBe(true);
  });

  it("toggleDrawerOpen deve alternar isDrawerOpen de true para false", () => {
    const { result } = renderHook(() => useDrawerContext(), { wrapper });

    act(() => {
      result.current.toggleDrawerOpen();
    });

    act(() => {
      result.current.toggleDrawerOpen();
    });

    expect(result.current.isDrawerOpen).toBe(false);
  });

  it("setDrawerOptions deve atualizar as opções do drawer", () => {
    const { result } = renderHook(() => useDrawerContext(), { wrapper });
    const novasOpcoes = [{ path: "/home", label: "Home", icon: "home" }];

    act(() => {
      result.current.setDrawerOptions(novasOpcoes);
    });

    expect(result.current.drawerOptions).toEqual(novasOpcoes);
  });

  it("setDrawerOptions deve substituir as opções existentes", () => {
    const { result } = renderHook(() => useDrawerContext(), { wrapper });
    const primeiraOpcao = [{ path: "/home", label: "Home", icon: "home" }];
    const segundaOpcao = [{ path: "/debt", label: "Despesas", icon: "money" }];

    act(() => {
      result.current.setDrawerOptions(primeiraOpcao);
    });

    act(() => {
      result.current.setDrawerOptions(segundaOpcao);
    });

    expect(result.current.drawerOptions).toEqual(segundaOpcao);
  });
});
