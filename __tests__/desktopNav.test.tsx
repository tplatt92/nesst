import "@testing-library/jest-dom";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import mockRouter from "next-router-mock";
import DesktopNav from "../app/components/DesktopNav";

jest.mock("next/router", () => jest.requireActual("next-router-mock"));

afterEach(() => {
  cleanup();
});

describe("DesktopNav", () => {
  it("renders correctly", () => {
    mockRouter.setCurrentUrl("/explore");

    render(<DesktopNav />);

    expect(screen.getByText("Explore")).toHaveClass("text-md");
    expect(screen.getByText("Favourites")).toHaveClass("text-md");
  });

  it("changes active link styles on route change", () => {
    mockRouter.setCurrentUrl("/explore");

    render(<DesktopNav />);

    mockRouter.push("/favourites");

    expect(screen.getByText("Favourites")).toHaveClass("text-md");
  });

  it("handles link clicks", () => {
    render(<DesktopNav />);

    fireEvent.click(screen.getByText("Explore"));

    expect(mockRouter).toMatchObject({
      asPath: "/favourites",
      pathname: "/favourites",
    });
  });
});
