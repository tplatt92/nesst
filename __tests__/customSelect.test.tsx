// __tests__/CustomSelect.test.js

import React from "react";
import { render, fireEvent } from "@testing-library/react";
import CustomSelect from "../app/components/CustomSelect"; // adjust the path accordingly
describe("CustomSelect component", () => {
  const defaultProps = {
    id: "test-select",
    value: "option1", // Set the default value
    onChange: jest.fn(),
    options: [
      { value: "option1", label: "Option 1" },
      { value: "option2", label: "Option 2" },
      // Add more options as needed
    ],
  };

  it("renders with the correct options", () => {
    const { getByTestId } = render(<CustomSelect {...defaultProps} />);
    const selectElement = getByTestId("test-select") as HTMLSelectElement; // Cast to HTMLSelectElement

    // Check if the selected value matches the expected default value
    expect(selectElement.value).toBe(defaultProps.value);

    // Check the text content of each option
    defaultProps.options.forEach((option) => {
      expect(selectElement).toHaveTextContent(option.label);
    });
  });

  it("updates value on change", () => {
    const { getByTestId } = render(<CustomSelect {...defaultProps} />);
    const selectElement = getByTestId("test-select") as HTMLSelectElement; // Cast to HTMLSelectElement
    fireEvent.change(selectElement, { target: { value: "option2" } });
    expect(defaultProps.onChange).toHaveBeenCalledWith(expect.any(Object));
  });

  // Add more tests as needed for specific cases or additional functionality.
});
