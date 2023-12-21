import { render, screen, fireEvent } from "@testing-library/react";
import LikedPropertiesItem from "../app/components/LikedPropertiesItem";

describe("LikedPropertiesItem Component", () => {
  const mockPropertyData = {
    id: "1",
    name: "Sample Property",
    description: "A description for the sample property.",
    image: ["/sample-image.jpg"],
    alt: "property image",
  };

  it("renders property name and description", () => {
    render(<LikedPropertiesItem {...mockPropertyData} />);

    expect(screen.getByText("Sample Property")).toBeInTheDocument();
    expect(
      screen.getByText("A description for the sample property.")
    ).toBeInTheDocument();
  });

  it("renders property image", () => {
    render(<LikedPropertiesItem {...mockPropertyData} />);

    const propertyImage = screen.getByAltText("property image");
    expect(propertyImage).toBeInTheDocument();
  });
});
