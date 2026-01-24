import Icon from "@mdi/react";
import { mdiEyeOutline, mdiEyeOffOutline } from "@mdi/js";
import { useState } from "react";

type Props = {
  type: string;
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  required?: boolean;
  showEye?: boolean;
};

export default function Input({
  type,
  name,
  label,
  value,
  onChange,
  placeholder,
  required = false,
  showEye = false,
}: Props) {
  const [showInput, setShowInput] = useState<boolean>(false);
  const inputStyle =
    "border py-2 px-4 rounded-[10px] border-gray-400 focus:outline w-full dark:border-gray-700 dark:bg-gray-800";
  return (
    <>
      <label htmlFor={name} className="text-[0.875rem] mb-1">
        {label}
      </label>
      <input
        type={showInput ? "text" : type}
        name={name}
        id={name}
        className={`${inputStyle} ${showEye ? "pr-10" : ""}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      />
      {showEye && (
        <button
          className="p-2"
          type="button"
          onClick={() => setShowInput(!showInput)}
        >
          <Icon
            path={showInput ? mdiEyeOffOutline : mdiEyeOutline}
            size={1}
            className="absolute top-8.5 right-2 dark:text-gray-400 text-gray-500"
          />
        </button>
      )}
    </>
  );
}
