import { render, fireEvent, screen } from "@testing-library/react";
import MessagesPage from "../app/messages/page";

describe("MessagesPage", () => {
  test("renders without crashing", () => {
    render(<MessagesPage />);
  });

  test("renders the title", () => {
    render(<MessagesPage />);

    const titles = screen.queryAllByText(/Messages/i);
    expect(titles.length).toBeGreaterThan(0);
    const h1Title = titles.find(
      (element) => element.tagName.toLowerCase() === "h1"
    );

    expect(h1Title).toBeInTheDocument();
  });

  test("renders the Nomads and Nests buttons", () => {
    render(<MessagesPage />);

    const nomadsButton = screen.getByText(/Nomads/i);
    const nestsButton = screen.getByText(/Nests/i);

    expect(nomadsButton).toBeInTheDocument();
    expect(nestsButton).toBeInTheDocument();
  });

  test("changes button color when clicked", () => {
    render(<MessagesPage />);

    const nomadsButton = screen.getByText(/Nomads/i);
    fireEvent.click(nomadsButton);

    expect(nomadsButton).toHaveClass("text-nesstDarkGrey");
  });
});
