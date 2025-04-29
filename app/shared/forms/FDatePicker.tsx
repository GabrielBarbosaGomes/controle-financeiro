import {
  Checkbox,
  FormControlLabel,
  TextField,
  type TextFieldProps,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import {
  Controller,
  useController,
  useForm,
  useFormContext,
} from "react-hook-form";

type FDatePickerProps = TextFieldProps & {
  name: string;
  label: string;
};

export const FDatePicker = ({ name, label }: FDatePickerProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label={label}
                value={field.value ? dayjs(field.value) : null}
                onChange={(newValue) =>
                  field.onChange(newValue ? newValue.toDate() : null)
                }
                slotProps={{
                  textField: {
                    error: !!fieldState.error,
                    helperText: fieldState.error?.message,
                    fullWidth: true,
                  },
                }}
              />
            </LocalizationProvider>
      )}
    />
  );
};
