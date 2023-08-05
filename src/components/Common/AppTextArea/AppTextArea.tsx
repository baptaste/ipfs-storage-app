import * as React from "react";

interface AppTextAreaProps {
  disabled?: boolean;
  error?: boolean;
  label?: string;
  name?: string;
  placeholder?: string;
  required?: boolean;
  validated?: boolean;
  value?: string;
  onChange?: ((e: React.ChangeEvent<HTMLTextAreaElement>) => void) | undefined;
  onClick?: ((e: React.MouseEvent) => void) | undefined;
}

export function AppTextArea(props: AppTextAreaProps) {
  const {
    disabled = false,
    error,
    label,
    name,
    placeholder,
    required = false,
    validated = false,
    value,
    onChange,
    onClick,
  } = props;
  const [focused, setFocused] = React.useState(false);

  const getBorderColor = () => {
    if (focused) return "border-slate-500";
    if (error) return "border-red-500";
    if (validated) return "border-green-500";
    return "border-transparent";
  };

  const getInputColor = () => {
    if (error) return "text-red-600";
    if (validated) return "text-green-600";
    return "text-slate-900";
  };

  return (
    <div
      className={`AppTextArea w-full flex flex-col items-stretch justify-between rounded-md ${
        !label ? `border-solid border-2 ${getBorderColor()}` : ""
      }`.trim()}
    >
      {label ? (
        <label htmlFor={name} className="w-full mb-3 font-bold text-left text-base text-slate-900">
          {label}
          {required ? "*" : null}
        </label>
      ) : null}

      <div
        className={`min-h-[96px] w-full relative flex flex-col items-center justify-center p-4 bg-slate-200 rounded-md ${
          label ? `border-solid border-2 ${getBorderColor()}` : ""
        }`.trim()}
      >
        {!label ? (
          <p
            className={`w-fit absolute left-4 top-4 text-base text-slate-400 ${
              value && value.length ? "visible" : "invisible"
            }`}
          >
            {placeholder}
            {required ? "*" : null}
          </p>
        ) : null}

        <textarea
          value={value}
          name={name}
          placeholder={placeholder}
          rows={5}
          maxLength={500}
          className={`w-full break-all rounded-md text-base ${getInputColor()} bg-transparent focus:outline-none`.trim()}
          disabled={disabled}
          required={required}
          onClick={onClick}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      </div>
      {error ? <p className="w-full text-red-500 text-sm pt-2">{error}</p> : null}
    </div>
  );
}
