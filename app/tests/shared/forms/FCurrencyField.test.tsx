import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { FCurrencyField } from "~/shared/forms/FCurrencyField";

const WrapperWithForm = ({
  defaultValues = {},
  isRequired = false,
}: {
  defaultValues?: Record<string, unknown>;
  isRequired?: boolean;
}) => {
  const methods = useForm({ defaultValues });
  return (
    <FormProvider {...methods}>
      <FCurrencyField name="valorField" label="Valor" isRequired={isRequired} />
    </FormProvider>
  );
};

describe("FCurrencyField", () => {
  it("deve renderizar o campo com o label correto", () => {
    render(<WrapperWithForm />);
    expect(screen.getByLabelText("Valor")).toBeInTheDocument();
  });

  it("deve renderizar como input de texto", () => {
    render(<WrapperWithForm />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("deve renderizar com valor inicial quando defaultValues é fornecido", () => {
    render(<WrapperWithForm defaultValues={{ valorField: "1000" }} />);
    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
  });

  it("deve aceitar entrada do usuário", async () => {
    const user = userEvent.setup();
    render(<WrapperWithForm />);

    const input = screen.getByRole("textbox");
    await user.click(input);
    await user.type(input, "100");

    expect(input).toBeInTheDocument();
  });

  it("deve ter atributo required quando isRequired é true", () => {
    render(<WrapperWithForm isRequired />);
    const input = screen.getByRole("textbox");
    expect(input).toBeRequired();
  });

  it("não deve ter atributo required quando isRequired é false", () => {
    render(<WrapperWithForm isRequired={false} />);
    const input = screen.getByRole("textbox");
    expect(input).not.toBeRequired();
  });
});
