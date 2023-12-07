import { render, cleanup, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import Messages from "@/app/messages/page";

//Cleanup
afterEach(() => {
  cleanup();
});

describe("messeges", () => {
  it("renders without crashing", () => {
    render(<Messages />);
  });

  it("renders footer", () => {
    render(<Messages />);
    const footer = screen.getByTestId("footer-id");
    expect(footer).toBeInTheDocument();
  });
});
