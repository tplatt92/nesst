import React from "react";
import { render, fireEvent } from "@testing-library/react";
import CustomSelect from "../app/components/CustomSelect";
describe("CustomSelect component", () => {
  const defaultProps = {
    id: "test-select",
    value: "option1",
    onChange: jest.fn(),
    name: "test-select",
    options: [
      { value: "option1", label: "Option 1" },
      { value: "option2", label: "Option 2" },
    ],
  };

  it("renders with the correct options", () => {
    const { getByTestId } = render(<CustomSelect {...defaultProps} />);
    const selectElement = getByTestId("test-select") as HTMLSelectElement;

    expect(selectElement.value).toBe(defaultProps.value);

    defaultProps.options.forEach((option) => {
      expect(selectElement).toHaveTextContent(option.label);
    });
  });

  it("updates value on change", () => {
    const { getByTestId } = render(<CustomSelect {...defaultProps} />);
    const selectElement = getByTestId("test-select") as HTMLSelectElement;
    fireEvent.change(selectElement, { target: { value: "option2" } });
    expect(defaultProps.onChange).toHaveBeenCalledWith(expect.any(Object));
  });
});
