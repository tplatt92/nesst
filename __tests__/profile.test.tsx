import { render, cleanup, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import Profile from "@/app/profile/page";

afterEach(() => {
  cleanup();
});

describe("Profile", () => {
  it("renders without crashing", () => {
    render(<Profile />);
  });

  // it("renders without crashing", () => {
  //   render(<Profile />);
  //   const profile = screen.getByTestId("profile-data");
  //   expect(profile).toBeInTheDocument();
  // });

//   it("renders footer", () => {
//     render(<Profile />);
//     const footer = screen.getByTestId("footer-id");
//     expect(footer).toBeInTheDocument();
//   });
});