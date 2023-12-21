import React from "react";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import CustomTextarea from "../app/components/CustomTextArea.tsx"; // Adjust the import path based on your project structure

afterEach(() => {
  cleanup();
});

describe("CustomTextarea", () => {
  const defaultProps = {
    id: "textareaId",
    placeholder: "Type something...",
    value: "Initial value",
    onChange: jest.fn(),
  };

  it("renders the textarea with correct props", () => {
    render(<CustomTextarea {...defaultProps} />);

    const textareaElement = screen.getByRole("textbox");

    expect(textareaElement).toBeInTheDocument();
    expect(textareaElement).toHaveAttribute("id", "textareaId");
    expect(textareaElement).toHaveAttribute("placeholder", "Type something...");
    expect(textareaElement).toHaveValue("Initial value");
  });

  it("applies the correct styles", () => {
    render(<CustomTextarea {...defaultProps} />);

    const textareaElement = screen.getByRole("textbox");

    expect(textareaElement).toHaveClass("w-full");
    expect(textareaElement).toHaveClass("p-2");
    expect(textareaElement).toHaveClass("pl-4");
    expect(textareaElement).toHaveClass("h-32");
    expect(textareaElement).toHaveClass("border");
    expect(textareaElement).toHaveClass("border-white");
    expect(textareaElement).toHaveClass("rounded-xl");
    expect(textareaElement).toHaveClass("scroll-y-0");
    expect(textareaElement).toHaveClass("mt-2");
    expect(textareaElement).toHaveClass("bg-black");
    expect(textareaElement).toHaveClass("placeholder-white");
  });
});
