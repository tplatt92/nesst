import { render, screen, fireEvent } from "@testing-library/react";
import Footer from "../app/components/Footer";
import { axe, toHaveNoViolations } from "jest-axe";

expect.extend(toHaveNoViolations);

const mockPathname = "/explore";

describe("Footer", () => {
  it("renders the component without crashing", () => {
    render(<Footer pathnameUrl={mockPathname} />);
    const footer = screen.getByTestId("footer-id");
    expect(footer).toBeInTheDocument();
  });

  it('displays "Explore" link as active when pathname is /explore', () => {
    render(<Footer pathnameUrl="/explore" />);
    const exploreLink = screen.getByText("Explore");
    expect(exploreLink).toHaveClass("text-xs");
  });

  it('displays "Favourites" link as active when pathname is /favourites', () => {
    render(<Footer pathnameUrl="/favourites" />);
    const favouritesLink = screen.getByText("Favourites");
    expect(favouritesLink).toHaveClass("text-xs");
  });

  it('displays "Messages" link as active when pathname is /messages', () => {
    render(<Footer pathnameUrl="/messages" />);
    const messagesLink = screen.getByText("Messages");
    expect(messagesLink).toHaveClass("text-xs");
  });

  it('displays "Profile" link as active when pathname is /profile', () => {
    render(<Footer pathnameUrl="/profile" />);
    const profileLink = screen.getByText("Profile");
    expect(profileLink).toHaveClass("text-xs");
  });

  it('changes active link when clicking on "Favourites" link', () => {
    render(<Footer pathnameUrl="/explore" />);
    const favouritesLink = screen.getByText("Favourites");
    fireEvent.click(favouritesLink);
    expect(favouritesLink).toHaveClass("text-xs");
  });
});

describe("Accessibility Tests for Footer", () => {
  it("should have no accessibility violations", async () => {
    const { container } = render(<Footer pathnameUrl="/explore" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
