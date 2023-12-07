import { render, cleanup, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import Login from "@/app/page";

//Cleanup
afterEach(() => {
  cleanup();
});

describe("login", () => {
  it("renders without crashing", () => {
    render(<Login />);
  });
});