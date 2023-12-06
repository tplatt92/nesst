import { render, cleanup, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import Favourites from "@/app/page";

//Cleanup
afterEach(() => {
  cleanup();
});

describe("favourites", () => {
  it("renders without crashing", () => {
    render(<Favourites />);
  });

//   it("renders footer", () => {
//     render(<Favourites />);
//     const footer = screen.getByTestId("footer-id");
//     expect(footer).toBeInTheDocument();
//   });
});
