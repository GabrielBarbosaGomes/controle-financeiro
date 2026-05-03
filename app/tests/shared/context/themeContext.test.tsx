import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import React from "react";
import { AppThemeProvider, useAppThemeProvider } from "~/shared/context/themeContext";

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <AppThemeProvider>{children}</AppThemeProvider>
);

describe("ThemeContext", () => {
  it("deve inicializar com themeName igual a 'light'", () => {
    const { result } = renderHook(() => useAppThemeProvider(), { wrapper });
    expect(result.current.themeName).toBe("light");
  });

  it("toggleTheme deve mudar de 'light' para 'dark'", () => {
    const { result } = renderHook(() => useAppThemeProvider(), { wrapper });

    act(() => {
      result.current.toggleTheme();
    });

    expect(result.current.themeName).toBe("dark");
  });

  it("toggleTheme deve mudar de 'dark' para 'light'", () => {
    const { result } = renderHook(() => useAppThemeProvider(), { wrapper });

    act(() => {
      result.current.toggleTheme();
    });

    act(() => {
      result.current.toggleTheme();
    });

    expect(result.current.themeName).toBe("light");
  });

  it("toggleTheme deve ser uma função", () => {
    const { result } = renderHook(() => useAppThemeProvider(), { wrapper });
    expect(typeof result.current.toggleTheme).toBe("function");
  });
});
