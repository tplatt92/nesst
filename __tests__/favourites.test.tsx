import { render, cleanup, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import Favourites from "@/app/favourites/page";

//Cleanup
afterEach(() => {
  cleanup();
});

describe("favourites", () => {
  it("renders without crashing", () => {
    render(<Favourites />);
  });

  it("renders the footer", () => {
    render(<Favourites />);
    const footer = screen.getByTestId("footer-id");
    expect(footer).toBeInTheDocument();
  });
});
