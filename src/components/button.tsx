import { classNames } from "@/utils/classNames";
import * as React from "react";
import { twMerge } from "tailwind-merge";

const variants = {
  primary: "bg-indigo-600 text-white hover:bg-indigo-700 ",
  white: "border border-gray-300 hover:bg-gray-50 text-gray-700",
};

const sizes = {
  md: "py-2 px-4 text-sm",
  lg: "py-2 px-4 text-base",
  xl: "py-3 px-6 text-base",
};

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  isLoading?: boolean;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      type = "button",
      className = "",
      variant = "primary",
      size = "md",
      isLoading = false,
      ...props
    },
    ref
  ) => {
    const clNames = classNames(
      "flex justify-center items-center disabled:opacity-70 disabled:cursor-not-allowed rounded-md shadow-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
      variants[variant],
      sizes[size]
    );
    const mergedClassNames = twMerge(clNames, className);
    return (
      <button ref={ref} type={type} className={mergedClassNames} {...props}>
        {/* {isLoading && <Spinner size="sm" className="text-current" />} */}
        <span className="mx-2">{props.children}</span>
      </button>
    );
  }
);

Button.displayName = "Button";
