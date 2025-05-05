import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AdminDashPage from "../pages/AdminDashPage";
import { AuthContext } from "../context/AuthContext";
import { BookContext } from "../context/BookContext";
import { BookmarkContext } from "../context/BookmarkContext";
import { vi } from "vitest";

//  Mock CreateBookModal and EditBookModal as simple placeholder components
// This prevents rendering their full internal logic during these tests
vi.mock("../components/CreateBookModal", () => ({
  default: () => <div data-testid="create-modal" />,
}));
vi.mock("../components/EditBookModal", () => ({
  default: () => <div data-testid="edit-modal" />,
}));

describe("AdminDashPage", () => {
  //  Mock data for books
  const mockBooks = [
    { id: "1", title: "Test Book", authorIds: ["1"], genreIds: ["1"] },
  ];

  //  Mock implementation for BookContext
  const mockContext = {
    books: mockBooks,
    addBook: vi.fn(),
    editBook: vi.fn(),
    deleteBook: vi.fn(),
  };

  //  Mock implementation for BookmarkContext to prevent errors
  const mockBookmarkContext = {
    favourites: [],
    toBeRead: [],
    toggleBookmark: vi.fn(),
  };

  //  Helper to render the AdminDashPage wrapped in all necessary providers
  const renderPage = (userRole = "admin") => {
    render(
      <AuthContext.Provider value={{ user: { role: userRole }, isAdmin: true }}>
        <BookmarkContext.Provider value={mockBookmarkContext}>
          <BookContext.Provider value={mockContext}>
            <MemoryRouter>
              <AdminDashPage />
            </MemoryRouter>
          </BookContext.Provider>
        </BookmarkContext.Provider>
      </AuthContext.Provider>
    );
  };

  //  Admin should see dashboard UI and modals
  it("renders dashboard for admin", () => {
    renderPage();
    expect(screen.getByText("Admin Dashboard")).toBeInTheDocument();
    expect(screen.getByText(/add New Book/i)).toBeInTheDocument();
    expect(screen.getByTestId("create-modal")).toBeInTheDocument();
    expect(screen.getByTestId("edit-modal")).toBeInTheDocument();
  });

  //  Non-admin users should be redirected (simulated here by checking element absence)
  it("redirects non-admin users", () => {
    renderPage("user");
    expect(screen.queryByText("Admin Dashboard")).not.toBeInTheDocument();
  });

  //  When clicking the delete icon and confirming, the deleteBook handler should be called
  it("calls deleteBook when confirmed", () => {
    // Stub the confirmation dialog to always return true
    vi.spyOn(window, "confirm").mockReturnValue(true);
    renderPage();

    // Grab the delete icon via its test ID and simulate a click
    const deleteIcon = screen.getByTestId("delete-button");
    fireEvent.click(deleteIcon);

    // Verify that the deleteBook mock was called with the correct book ID
    expect(mockContext.deleteBook).toHaveBeenCalledWith("1");
  });
});
