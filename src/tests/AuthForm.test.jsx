import { render, screen, fireEvent } from "@testing-library/react";
import AuthForm from "../components/AuthForm";
import { vi } from "vitest";

describe("AuthForm", () => {
  // Create a mock function to simulate form submission
  const mockSubmit = vi.fn();

  // Reset the mock function before each test to clear previous calls
  beforeEach(() => {
    mockSubmit.mockReset();
  });

  //  Test 1: Check that email and password fields are shown, but NOT username
  it("renders email and password fields", () => {
    render(
      <AuthForm
        onSubmit={mockSubmit}
        title="Login"
        submitLabel="Log In"
        showUsernameField={false}
      />
    );

    // These inputs should be present
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();

    // This input should not be visible for login
    expect(screen.queryByPlaceholderText("Username")).not.toBeInTheDocument();
  });

  //  Test 2: Check that username input appears when `showUsernameField` is true
  it("renders username field if showUsernameField is true", () => {
    render(
      <AuthForm
        onSubmit={mockSubmit}
        title="Register"
        submitLabel="Sign Up"
        showUsernameField={true}
      />
    );

    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
  });

  // Test 3: Simulate filling out and submitting the login form
  it("calls onSubmit with email and password", async () => {
    mockSubmit.mockResolvedValue(true); // simulate success

    render(
      <AuthForm
        onSubmit={mockSubmit}
        title="Login"
        submitLabel="Log In"
        showUsernameField={false}
      />
    );

    // Fill out the form
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });

    // Submit the form
    fireEvent.click(screen.getByRole("button", { name: "Log In" }));

    // Check that it was called with correct arguments
    expect(mockSubmit).toHaveBeenCalledWith("test@example.com", "password123");
  });

  //  Test 4: Simulate filling out and submitting the registration form
  it("calls onSubmit with email, password, and username", async () => {
    mockSubmit.mockResolvedValue(true); // simulate success

    render(
      <AuthForm
        onSubmit={mockSubmit}
        title="Register"
        submitLabel="Sign Up"
        showUsernameField={true}
      />
    );

    // Fill out all fields
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });

    // Submit the form
    fireEvent.click(screen.getByRole("button", { name: "Sign Up" }));

    // Check that all three values were passed
    expect(mockSubmit).toHaveBeenCalledWith(
      "test@example.com",
      "password123",
      "testuser"
    );
  });

  //  Test 5: Show an error if the form submission fails
  it("shows an error message if submission fails", async () => {
    mockSubmit.mockResolvedValue(false); // simulate failure

    render(
      <AuthForm
        onSubmit={mockSubmit}
        title="Login"
        submitLabel="Log In"
        showUsernameField={false}
      />
    );

    // Fill with incorrect credentials
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "fail@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "wrongpass" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Log In" }));

    // Expect error message to appear
    await screen.findByText("Something went wrong. Please try again.");
    expect(screen.getByText("Something went wrong. Please try again.")).toBeInTheDocument();
  });
});

