//larger text area for the form bio
import React from "react";
import { TextareaElementProps } from "@/types/types";

const CustomTextarea: React.FC<TextareaElementProps> = ({
  id,
  placeholder,
  value,
  onChange,
}) => (
  <textarea
    id={id}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className="w-full p-2 pl-4 h-32 border border-white rounded-xl scroll-y-0 mt-2 bg-black placeholder-white"
  />
);

export default CustomTextarea;
