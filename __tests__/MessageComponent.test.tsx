import { render, fireEvent } from "@testing-library/react";
import MessageItem from "../app/components/Message";

describe("MessageItem Component", () => {
  const mockMessage = {
    id: "1",
    profile_id: "someProfileId",
    content: "Hello, world!",
    created_at: "14-12-2023",
  };

  const mockProfile = {
    id: "someProfileId",
    username: "testUser",
  };

  const mockSetProfileCache = jest.fn();

  it("renders message content and username", () => {
    const { getByText } = render(
      <MessageItem
        message={mockMessage}
        profile={mockProfile}
        setProfileCache={mockSetProfileCache}
      />
    );

    expect(getByText("Hello, world!")).toBeInTheDocument();
    expect(getByText("testUser")).toBeInTheDocument();
  });

  it("applies styles based on the user", () => {
    const { getByText } = render(
      <MessageItem
        message={mockMessage}
        profile={mockProfile}
        setProfileCache={mockSetProfileCache}
      />
    );

    const messageItem = getByText("Hello, world!").closest("li");

    expect(messageItem).toBeInTheDocument();
  });

  it("fetches profile if not provided", () => {
    render(
      <MessageItem
        message={mockMessage}
        setProfileCache={mockSetProfileCache}
      />
    );
  });
});
