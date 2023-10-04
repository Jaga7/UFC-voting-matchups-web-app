import { ReactNode } from "react";

export type InputTypes =
  | "text"
  | "number"
  | "checkbox"
  | "date"
  | "radio"
  | "password";

export interface FormInputProps {
  label: string;
  value: { [key: string]: string };
  name: string;
  type: InputTypes;
  error: { [key: string]: string };
  touched: { [key: string]: string };
  onChange: (e: any) => void;
  onBlur: (e: any) => void;
  isTextarea?: boolean;
  select?: boolean;
  selectOptions?: { id: number; name: string }[];
  children?: ReactNode | ReactNode[];
}
