import { render, screen, fireEvent } from "@testing-library/react";
import EditAccountForm from "../app/components/EditAccountForm";
import { axe, toHaveNoViolations } from "jest-axe";

expect.extend(toHaveNoViolations);

jest.mock("../app/hooks/useUpdateProfile", () => ({
  useUpdateProfile: jest.fn(() => ({
    loading: false,
    updateProfile: jest.fn(),
  })),
}));

describe("EditAccountForm", () => {
  it("renders the component without crashing", () => {
    render(<EditAccountForm session={null} />);

    expect(screen.getByText("NESST")).toBeInTheDocument();
  });

  it("renders the update button with loading state", () => {
    render(<EditAccountForm session={null} />);
    const updateButton = screen.getByText("Loading ...");
    expect(updateButton).toBeInTheDocument();
  });

  it("renders the sign-out button", () => {
    render(<EditAccountForm session={null} />);
    const signOutButton = screen.getByText("Sign out");
    expect(signOutButton).toBeInTheDocument();
  });
  it("updates first name input correctly", () => {
    render(<EditAccountForm session={null} />);
    const firstNameInput = screen.getByLabelText("First Name");
    fireEvent.change(firstNameInput, { target: { value: "John" } });
    expect(firstNameInput).toHaveValue("John");
  });

  it("updates bio textarea correctly", () => {
    render(<EditAccountForm session={null} />);
    const bioTextarea = screen.getByLabelText(/Bio/i);
    fireEvent.change(bioTextarea, { target: { value: "A short bio" } });
    expect(bioTextarea).toHaveValue("A short bio");
  });
});

describe("Accessibility Tests for EditAccountForm", () => {
  it("should have no accessibility violations", async () => {
    const { container } = render(<EditAccountForm session={null} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
