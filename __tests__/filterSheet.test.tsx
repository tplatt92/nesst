import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import FilterSheet from "../app/components/FilterSheet";

afterEach(() => {
  cleanup();
});

describe("FilterSheet", () => {
  it("renders without crashing", () => {
    render(<FilterSheet />);
  });

//   it("render a button on the page with the text ", () => {
//     const { getByRole, debug } = render(<FilterSheet />);
//     debug();

//     const button = getByRole("button", { name: /apply/i });

//     expect(button).toBeInTheDocument();
//   });
});
