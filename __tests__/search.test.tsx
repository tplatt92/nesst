import { render, cleanup, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import Search from "@/app/components/Search";

//Cleanup
afterEach(() => {
  cleanup();
});

describe("Search", () => {
  it("renders without crashing", () => {
    const mockSetter = jest.fn();
    render(<Search setProperties={mockSetter} />);
  });

  it("renders an input with placeholder text", async () => {
    const mockSetter = jest.fn();
    render(<Search setProperties={mockSetter} />);

    const searchInput = await screen.getByPlaceholderText(
      /search destinations/i
    );
    expect(searchInput).toBeInTheDocument();
  });

  it("renders an button with the type submit", async () => {
    const mockSetter = jest.fn();
    render(<Search setProperties={mockSetter} />);

    const searchButton = await screen.getByRole("button", { name: "" });
    expect(searchButton).toBeInTheDocument();
    expect(searchButton).toHaveAttribute("type", "submit");
  });

  //   it("calls the search function when button is clicked", async () => {
  //     const mockSetter = jest.fn();
  //     const mockFormSubmit = jest.fn();

  //     render(<Search setProperties={mockSetter} />);

  //     const searchButton = await screen.getByRole("button", { name: "" });
  //     fireEvent.submit(searchButton);
  //     expect(mockFormSubmit).toHaveBeenCalled();
  //   });
  //   it("submit the search form with the correct value", async () => {
  //     const mockSetter = jest.fn();
  //     const mockFormSubmit = jest.fn();

  //     render(<Search setProperties={mockSetter} />);

  //     const searchInput = await screen.getByPlaceholderText(
  //       /search destinations/i
  //     );
  //     fireEvent.change(searchInput, { target: { value: "test" } });

  //     const searchButton = await screen.getByRole("button", { name: "" });
  //     fireEvent.click(searchButton);
  //     expect(mockSetter).toHaveBeenCalledWith({
  //       location: "test",
  //     });
  //   });
});
