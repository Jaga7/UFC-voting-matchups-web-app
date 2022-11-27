import React from "react";
import { FormInputProps } from "../../types/form/FormInputPropsT";
import { MenuItem, TextField } from "@mui/material";

export const FormInput: React.FC<FormInputProps> = ({
  label,
  value,
  name,
  type,
  error,
  touched,
  onChange,
  onBlur,
  isTextarea,
  selectOptions,
  children,
  select,
}) => {
  return (
    <>
      <TextField
        fullWidth
        select={select}
        label={label}
        placeholder={label}
        InputLabelProps={{ shrink: true }}
        FormHelperTextProps={{ sx: { maxWidth: "fit-content" } }}
        helperText={touched[name] && error[name]}
        type={type}
        name={name}
        id={name}
        error={!!touched[name] && !!error[name]}
        value={value[name]}
        onChange={onChange}
        onBlur={onBlur}
        multiline={isTextarea}
        rows={6}
      >
        {children}
        {select &&
          selectOptions &&
          selectOptions.map((opt) => (
            <MenuItem key={opt.id} value={opt.id}>
              {opt.name}
            </MenuItem>
          ))}
      </TextField>
    </>
  );
};
