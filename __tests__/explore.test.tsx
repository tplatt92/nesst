import { render, cleanup, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import Explore from "@/app/explore/page";
import Footer from "@/app/components/Footer";

afterEach(() => {
  cleanup();
});

describe("Explore", () => {
  it("renders without crashing", () => {
    render(<Explore />);
  });


// it("renders footer", () => {
//   render(<Explore />);
//   const footer= screen.getByTestId("footer");
//   expect(footer).toBeInTheDocument();
});
});
