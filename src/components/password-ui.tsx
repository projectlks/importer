import clsx from "clsx";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import type { PasswordRuleStatus } from "@/lib/password-policy";

type PasswordFieldWithToggleProps = {
  id?: string;
  name?: string;
  value: string;
  show: boolean;
  onChange: (value: string) => void;
  onToggle: () => void;
  placeholder?: string;
  required?: boolean;
  minLength?: number;
  pattern?: string;
  title?: string;
  disabled?: boolean;
  className?: string;
};

export function PasswordFieldWithToggle({
  id,
  name,
  value,
  show,
  onChange,
  onToggle,
  placeholder,
  required,
  minLength,
  pattern,
  title,
  disabled,
  className,
}: PasswordFieldWithToggleProps) {
  return (
    <div className="relative">
      <input
        id={id}
        name={name}
        className={clsx("input-lite pr-16", className)}
        type={show ? "text" : "password"}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        required={required}
        minLength={minLength}
        pattern={pattern}
        title={title}
        disabled={disabled}
      />
      <button
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded px-2 py-1 text-xs text-slate-500 hover:bg-brand-50 hover:text-brand-800"
        type="button"
        onClick={onToggle}
        aria-label={show ? "Hide password" : "Show password"}
      >
        {show ? <EyeSlashIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
      </button>
    </div>
  );
}

export function PasswordPolicyChecklist({ rules }: { rules: PasswordRuleStatus[] }) {
  return (
    <ul className="space-y-1 text-xs">
      {rules.map((rule) => (
        <li
          key={rule.label}
          className={clsx(
            "flex items-center justify-between gap-3",
            rule.valid ? "text-emerald-600" : "text-rose-500",
          )}
        >
          <span className="flex items-center gap-2">
            <span className={clsx("h-1.5 w-1.5 rounded-full", rule.valid ? "bg-emerald-500" : "bg-rose-400")} />
            <span>{rule.label}</span>
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em]">
            {rule.valid ? "OK" : "Need"}
          </span>
        </li>
      ))}
    </ul>
  );
}
