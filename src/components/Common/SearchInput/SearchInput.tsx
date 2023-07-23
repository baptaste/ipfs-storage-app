import * as React from "react";
// import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { CloseIcon, SearchIcon } from "../Icons";

interface ISearchInputProps {
  focused?: boolean;
  value?: string;
  placeholder?: string;
  onCancel?: () => void;
  onChange: (e: any) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

export function SearchInput(props: ISearchInputProps) {
  const { focused, value, placeholder = "Search", onCancel, onChange, onFocus, onBlur } = props;
  const ref = React.useRef(null);
  // const [focused, setFocused] = React.useState<boolean>(false);

  const handleFocus = () => {
    // setFocused(true);
    if (onFocus) {
      onFocus();
    }
    // if (ref?.current) {
    //   (ref.current as HTMLElement).focus();
    // }
  };

  const handleBlur = () => {
    // setFocused(false);
    if (onBlur) {
      onBlur();
    }
    // if (ref?.current) {
    //   (ref.current as HTMLElement).blur();
    // }
  };

  const handleCancel = () => {
    console.log("SearchInput component, handleCancel called");
    if (onCancel && focused) {
      onCancel();
    }
  };

  return (
    <div
      className={`SearchInput w-full flex flex-col items-center justify-center pl-4 pr-2 bg-slate-200 rounded-md border-solid border-2 ${
        focused ? "border-primary" : "border-slate-200"
      }`}
    >
      <div className="w-full h-full flex items-center justify-between">
        <input
          ref={ref}
          type="text"
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          className="h-fit w-full pr-4 break-all rounded-md text-lg text-slate-900 bg-transparent focus:outline-none"
        />
        <div onClick={handleCancel}>{focused ? <CloseIcon /> : <SearchIcon />}</div>
      </div>
    </div>
  );
}
