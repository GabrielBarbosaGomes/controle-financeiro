import {
  Checkbox,
  FormControlLabel,
  TextField,
  type TextFieldProps,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  Controller,
  useController,
  useForm,
  useFormContext,
} from "react-hook-form";

type FCheckboxProps = {
  name: string;
  label: string;
};

export const FCheckbox = ({ name, label }: FCheckboxProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <FormControlLabel
          control={
            <Checkbox
              checked={!!field.value}
              onChange={(e) => field.onChange(e.target.checked)}
            />
          }
          label={label}
        />
      )}
    />
  );
};
