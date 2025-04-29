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
  required?: boolean
};

export const FTextField = ({ name, label, type, required = false, ...rest }: FTextFieldProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={required ? { required: `${label} é obrigatório` } : {}}
      render={({ field, fieldState }) => (
        <TextField
          label={label}
          value={field.value}
          onChange={field.onChange}
          error={!!fieldState.error}
          helperText={fieldState.error?.message}
          type={type}
        />
      )}
    />
  );
};
