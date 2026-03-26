import type { ReactNode, SelectHTMLAttributes } from "react";
import clsx from "clsx";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

type SelectFieldProps = SelectHTMLAttributes<HTMLSelectElement> & {
  children: ReactNode;
  wrapperClassName?: string;
};

export function SelectField({
  className,
  wrapperClassName,
  children,
  ...props
}: SelectFieldProps) {
  return (
    <div className={clsx("relative", wrapperClassName)}>
      <select className={clsx("select-lite pr-10", className)} {...props}>
        {children}
      </select>
      <ChevronDownIcon
        className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
        aria-hidden="true"
      />
    </div>
  );
}

