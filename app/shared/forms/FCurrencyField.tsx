import { TextField, type TextFieldProps } from "@mui/material";
import { NumericFormat } from 'react-number-format';
import {
  Controller,
  useFormContext,
} from "react-hook-form";

type FCurrencyFieldProps = {
  name: string;
  label: string;
  isRequired?: boolean;
};

export const FCurrencyField = ({
  name,
  label,
  isRequired = false,
  ...rest
}: FCurrencyFieldProps) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: isRequired ? `${label} obrigatório` : false }}
      render={({ field, fieldState }) => (
        // <TextField
        //   {...field}
        //   {...rest}
        //   label={fieldState.error ? "Error" : label}
        //   value={field.value}
        //   onChange={field.onChange}
        //   error={!!fieldState.error}
        //   helperText={fieldState.error?.message}
        //   focused={!!fieldState.error}
        //   required={isRequired}
        // />

        <NumericFormat
        {...field}
        value={field.value}
        onChange={field.onChange}
        customInput={TextField}
        thousandSeparator="."
        decimalSeparator=","
        valueIsNumericString
        prefix="R$ "
        variant="standard"
        label={fieldState.error ? "Error" : label}
        error={!!fieldState.error}
        helperText={fieldState.error?.message}
        focused={!!fieldState.error}
        required={isRequired}
        
      />
      )}
    />
  );
};
