import { render, fireEvent, screen } from "@testing-library/react";
import MessagesPage from "../app/messages/page"; // replace with actual path to your component

describe("MessagesPage", () => {
  test("renders without crashing", () => {
    render(<MessagesPage />);
  });

  test("renders the title", () => {
    render(<MessagesPage />);

    // Use queryAllByText to get all elements with the text "Messages"
    const titles = screen.queryAllByText(/Messages/i);

    // Assert that at least one element with the text "Messages" exists
    expect(titles.length).toBeGreaterThan(0);

    // You can also assert against a specific element, for example, the h1 element
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

  // You might want to mock your connections data and test if the correct number of MessageContainerItem components are rendered
});
