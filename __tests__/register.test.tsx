import { render, cleanup, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import SignUp from "@/app/register/page.tsx";

//Cleanup
afterEach(() => {
  cleanup();
});

describe("register", () => {
  it("renders without crashing", () => {
    render(<SignUp />);
  });

  it("renders a button with the text submit", async () => {
    render(<SignUp />);

    const emailInput = await screen.getByPlaceholderText("Your email address");
    const passwordInput = await screen.getByPlaceholderText("Your password");

    expect(emailInput).toBeInTheDocument();
  });
});
