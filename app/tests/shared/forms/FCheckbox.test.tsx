import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { FCheckbox } from "~/shared/forms/FCheckbox";

const WrapperWithForm = ({
  defaultValues = {},
}: {
  defaultValues?: Record<string, unknown>;
}) => {
  const methods = useForm({ defaultValues });
  return (
    <FormProvider {...methods}>
      <FCheckbox name="checkField" label="Aceito os termos" />
    </FormProvider>
  );
};

describe("FCheckbox", () => {
  it("deve renderizar o checkbox com o label correto", () => {
    render(<WrapperWithForm />);
    expect(screen.getByLabelText("Aceito os termos")).toBeInTheDocument();
  });

  it("deve inicializar desmarcado quando defaultValues não é fornecido", () => {
    render(<WrapperWithForm />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).not.toBeChecked();
  });

  it("deve inicializar marcado quando defaultValues é true", () => {
    render(<WrapperWithForm defaultValues={{ checkField: true }} />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeChecked();
  });

  it("deve marcar o checkbox quando clicado", async () => {
    const user = userEvent.setup();
    render(<WrapperWithForm />);

    const checkbox = screen.getByRole("checkbox");
    await user.click(checkbox);

    expect(checkbox).toBeChecked();
  });

  it("deve desmarcar o checkbox quando clicado duas vezes", async () => {
    const user = userEvent.setup();
    render(<WrapperWithForm />);

    const checkbox = screen.getByRole("checkbox");
    await user.click(checkbox);
    await user.click(checkbox);

    expect(checkbox).not.toBeChecked();
  });

  it("deve ser um elemento checkbox", () => {
    render(<WrapperWithForm />);
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
  });
});
