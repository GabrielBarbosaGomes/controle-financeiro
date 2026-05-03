import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { FTextField } from "~/shared/forms/FTextField";

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
      <FTextField name="testField" label="Campo Teste" type="text" isRequired={isRequired} />
    </FormProvider>
  );
};

describe("FTextField", () => {
  it("deve renderizar o campo com o label correto", () => {
    render(<WrapperWithForm />);
    expect(screen.getByLabelText("Campo Teste")).toBeInTheDocument();
  });

  it("deve renderizar com valor inicial vazio", () => {
    render(<WrapperWithForm />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveValue("");
  });

  it("deve renderizar com valor inicial quando defaultValues é fornecido", () => {
    render(<WrapperWithForm defaultValues={{ testField: "valor inicial" }} />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveValue("valor inicial");
  });

  it("deve atualizar o valor quando o usuário digita", async () => {
    const user = userEvent.setup();
    render(<WrapperWithForm />);

    const input = screen.getByRole("textbox");
    await user.type(input, "novo valor");

    expect(input).toHaveValue("novo valor");
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
