import { ButtonHTMLAttributes, ReactNode, TextareaHTMLAttributes } from "react";
import React, {
  Dispatch,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  RefObject,
  SetStateAction,
} from "react";
import { LinkProps } from "react-router-dom";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: string;
  iconClassName?: string;
  variant?: "primary" | "secondary";
  iconAlignment?: "left" | "right";
  children: ReactNode;
}
export interface CustomLinkProps {
  className?: string;
  children: React.ReactNode | string;
  href: string;
}

export interface CustomInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  label?: string;
  error?: string;
  type?: string;
  icon?: string;
}

export interface LabelProps {
  label: string;
  className?: string;
}

export interface CustomTextProps {
  text?: string;
  className?: string;
  children?: React.ReactNode;
}

export interface StepsProps {
  earlierStepResponse?: string;
  incrementFunction: Dispatch<
    SetStateAction<{ step: number; response: string }>
  >;
}

export interface LabelProps extends React.HTMLProps<HTMLLabelElement> {
  label: string;
  className?: string;
}

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  labelClassName?: string;
  containerClassName?: string;
  className?: string;
  errorClassName?: string;
  type: HTMLInputTypeAttribute;
  error?: string | null;
  errorAlignment?: ErrorAlignment;
  ref?: RefObject<HTMLInputElement>;
}

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label?: string;
  labelClassName?: string;
  containerClassName?: string;
  className?: string;
  errorClassName?: string;
  error?: string | null;
  errorAlignment?: ErrorAlignment;
  ref?: RefObject<HTMLTextAreaElement>;
}

export interface ErrorTextProps {
  error: string;
  name?: string;
  className?: string;
  alignment?: ErrorAlignment;
}

type ErrorAlignment = "bottom" | "topRight";

export interface OrDividerProps {
  name?: string;
  className?: string;
}

export interface CustomLinkProp extends LinkProps {
  className?: string;
  variant?: "primary" | "muted";
  icon?: string;
  iconClassName?: string;
  iconAlignment?: "left" | "right";
  isLoading?: boolean;
  children: React.ReactNode;
}
export type ToastType = "success" | "error" | "info" | "loading";

export interface Step1FormValues {
  fullname: string;
  email: string;
  password: string;
  confirmpassword: string;
}

export interface Step3FormValues {
  phone: string;
}

export interface TooltipProps {
  children: ReactNode;
  className?: string;
  tooltipContent: string | ReactNode;
  alignment?: "" | "top" | "right" | "bottom" | "left";
}
