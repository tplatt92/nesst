// Import necessary libraries and components
import { render, screen, fireEvent } from "@testing-library/react";
import CreateAccountForm from "../app/components/CreateAccountForm"; // Update the path
import { axe, toHaveNoViolations } from "jest-axe";

expect.extend(toHaveNoViolations);

// Mock the useUpdateProfile hook
jest.mock("../app/hooks/useUpdateProfile", () => ({
  useUpdateProfile: jest.fn(() => ({
    loading: false,
    updateProfile: jest.fn(),
  })),
}));

describe("CreateAccountForm", () => {
  it("renders the component without crashing", () => {
    render(<CreateAccountForm session={null} />);

    expect(screen.getByText("NESST")).toBeInTheDocument();
  });

  it("renders the update button with loading state", () => {
    render(<CreateAccountForm session={null} />);
    const updateButton = screen.getByText("Loading ...");
    expect(updateButton).toBeInTheDocument();
  });

  it("updates first name input correctly", () => {
    render(<CreateAccountForm session={null} />);
    const firstNameInput = screen.getByLabelText("First Name");
    fireEvent.change(firstNameInput, { target: { value: "John" } });
    expect(firstNameInput).toHaveValue("John");
  });

  it("updates bio textarea correctly", () => {
    render(<CreateAccountForm session={null} />);
    const bioTextarea = screen.getByLabelText(/Bio/i);
    fireEvent.change(bioTextarea, { target: { value: "A short bio" } });
    expect(bioTextarea).toHaveValue("A short bio");
  });
});

describe("Accessibility Tests for CreateAccountForm", () => {
  it("should have no accessibility violations", async () => {
    const { container } = render(<CreateAccountForm session={null} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
