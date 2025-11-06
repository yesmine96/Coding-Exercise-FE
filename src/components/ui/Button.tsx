import React from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../../utils/cn";

// Define props type
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  disabled: boolean;
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  disabled,

  ...props
}) => {
  const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
    primary:
      "bg-primary text-white hover:bg-white hover:text-primary border-primary hover:border-primary",
    secondary: "bg-gray-500 text-white hover:bg-gray-600",
  };
  const sizes: Record<NonNullable<ButtonProps["size"]>, string> = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-md",
    lg: "px-6 py-3 text-lg",
  };
  return (
    <button
      disabled={disabled}
      className={cn(
        "rounded font-semibold bg-transparent no-underline border border-transparent cursor-pointer ",
        variants[variant],
        sizes[size],
        {
          "opacity-50 cursor-not-allowed": disabled,
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
