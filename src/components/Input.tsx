type Props = {
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputClassName: string;
  placeholder: string;
  required?:boolean
};

export default function Input({
  name,
  label,
  value,
  onChange,
  inputClassName,
  placeholder,
  required = false,
}: Props) {
  return (
    <>
      <label htmlFor={name} className="text-[0.875rem] mb-1">{label}</label>
      <input
        type={name}
        name={name}
        id={name}
        className={inputClassName}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      />
    </>
  );
}
