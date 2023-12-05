import { render, cleanup, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import Explore from "@/app/explore/page";

afterEach(() => {
  cleanup();
});

describe("Explore", () => {
  it("renders without crashing", () => {
    render(<Explore />);
  });

  it("renders the card", () => {
    render(<Explore />);
    const card = screen.getByTestId("card-id");
    expect(card).toBeInTheDocument();
  });

  it("renders footer", () => {
    render(<Explore />);
    const footer = screen.getByTestId("footer-id");
    expect(footer).toBeInTheDocument();
  });
});
