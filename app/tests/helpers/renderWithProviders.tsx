import React from "react";
import { render, type RenderOptions } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { AppThemeProvider } from "~/shared/context/themeContext";
import { DrawerProvider } from "~/shared/context/drawerContext";

interface RenderWithProvidersOptions extends Omit<RenderOptions, "wrapper"> {
  initialEntries?: string[];
}

export const renderWithProviders = (
  ui: React.ReactElement,
  { initialEntries = ["/"], ...options }: RenderWithProvidersOptions = {}
) => {
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <MemoryRouter initialEntries={initialEntries}>
      <AppThemeProvider>
        <DrawerProvider>{children}</DrawerProvider>
      </AppThemeProvider>
    </MemoryRouter>
  );

  return render(ui, { wrapper: Wrapper, ...options });
};
