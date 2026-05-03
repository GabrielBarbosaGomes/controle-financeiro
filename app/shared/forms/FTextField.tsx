import { TextField, type TextFieldProps } from "@mui/material";
import { useEffect, useState } from "react";
import {
  Controller,
  useController,
  useForm,
  useFormContext,
} from "react-hook-form";

type FTextFieldProps = TextFieldProps & {
  name: string;
  label: string;
  type: string;
  isRequired?: boolean;
};

export const FTextField = ({
  name,
  label,
  type,
  isRequired = false,
  ...rest
}: FTextFieldProps) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: isRequired ? `${label} obrigatório` : false }}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          {...rest}
          label={fieldState.error ? "Error" : label}
          value={field.value}
          onChange={field.onChange}
          error={!!fieldState.error}
          helperText={fieldState.error?.message}
          type={type}
          focused={!!fieldState.error}
          required={isRequired}
        />
      )}
    />
  );
};
