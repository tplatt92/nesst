import React from "react";
import { render, fireEvent, cleanup, screen } from "@testing-library/react";
import FilterSheet from "../app/components/FilterSheet";

afterEach(() => {
  cleanup();
});

describe("FilterSheet", () => {
  it("renders without crashing", () => {
    render(<FilterSheet />);
  });

  it("render apply button on the page  ", () => {
    const { getByRole, debug } = render(<FilterSheet />);
    debug();

    const button = getByRole("button", { name: /apply/i });

    expect(button).toBeInTheDocument();
  });

  test("renders theapply buttons", () => {
    render(<FilterSheet />);

    const applyButton = screen.getByText(/apply/i);
   

    expect(applyButton).toBeInTheDocument();
    
  });
});
