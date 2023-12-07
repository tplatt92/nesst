import { render, cleanup, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import Register from "@/app/page";

//Cleanup
afterEach(() => {
  cleanup();
});

describe("register", () => {
  it("renders without crashing", () => {
    render(<Register />);
  });
});