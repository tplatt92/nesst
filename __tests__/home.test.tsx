import { render, cleanup, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import Home from "@/app/page";

//Cleanup
afterEach(() => {
  cleanup();
});

describe("Home", () => {
  it("renders without crashing", () => {
    render(<Home />);
  });

  it("renders a h1 element with the text content About", () => {
    const { getByRole } = render(<Home />);

    const heading = getByRole("heading", { name: /nesst/i, level: 1 });

    expect(heading).toBeInTheDocument();
  });

  it("render a button on the page with the text registere", () => {
    const { getByRole } = render(<Home />);

    const button = getByRole("button", { name: /register/i });

    expect(button).toBeInTheDocument();
  });

  it("render a button on the page with the text registere", () => {
    const { getByRole } = render(<Home />);

    const button = getByRole("button", { name: /log in/i });

    expect(button).toBeInTheDocument();
  });
});
