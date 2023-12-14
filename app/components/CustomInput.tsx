import { InputElementProps } from "@/types/types";

const CustomInput: React.FC<InputElementProps> = ({
  id,
  placeholder,
  type,
  value,
  onChange,
  onError,
  required = false,
}) => (
  <div className="w-full">
    <input
      id={id}
      placeholder={placeholder}
      type={type}
      value={value || ""}
      onChange={onChange}
      className="w-full p-2 pl-4 border border-white rounded-full  mt-2 bg-black placeholder-white"
      required={required}
    />
  </div>
);

export default CustomInput;
