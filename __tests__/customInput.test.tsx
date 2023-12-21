import React from "react";
import { render, fireEvent } from "@testing-library/react";
import CustomInput from "../app/components/CustomInput";

describe("CustomInput component", () => {
  const defaultProps = {
    id: "test-input",
    placeholder: "Test Placeholder",
    type: "text",
    value: "",
    onChange: jest.fn(),
    onError: jest.fn(),
    required: false,
  };

  it("renders without crashing", () => {
    render(<CustomInput {...defaultProps} />);
    const inputElement = document.getElementById(defaultProps.id);
    expect(inputElement).toBeInTheDocument();
  });

  it("renders with the correct placeholder", () => {
    const { getByPlaceholderText } = render(<CustomInput {...defaultProps} />);
    const inputElement = getByPlaceholderText(defaultProps.placeholder);
    expect(inputElement).toBeInTheDocument();
  });

  it("updates value on change", () => {
    const { getByPlaceholderText } = render(<CustomInput {...defaultProps} />);
    const inputElement = getByPlaceholderText(defaultProps.placeholder);
    fireEvent.change(inputElement, { target: { value: "new value" } });
    expect(defaultProps.onChange).toHaveBeenCalledWith(expect.any(Object));
  });

  it("handles required prop correctly", () => {
    const { getByPlaceholderText } = render(
      <CustomInput {...defaultProps} required />
    );
    const inputElement = getByPlaceholderText(defaultProps.placeholder);
    expect(inputElement).toHaveAttribute("required");
  });
});
