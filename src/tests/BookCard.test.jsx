import { render, screen, fireEvent, within } from "@testing-library/react";
import BookCard from "../components/BookCard";
import { AuthContext } from "../context/AuthContext";
import { BookmarkContext } from "../context/BookmarkContext";

// Mock book data used in all tests
const mockBook = {
  id: "1",
  title: "Test Book",
  authorNames: ["Author One", "Author Two"],
  genreNames: ["Fiction"],
  country: "Spain",
  region: "Granada",
  yearPublished: "2020",
  description: "A test description",
  coverImage: "test.jpg",
};

// Helper function to wrap the BookCard with necessary context providers
const renderWithProviders = (ui) => {
  return render(
    <AuthContext.Provider value={{ isAdmin: false }}>
      <BookmarkContext.Provider
        value={{
          favourites: [],
          toBeRead: [],
          toggleBookmark: () => {},
        }}
      >
        {ui}
      </BookmarkContext.Provider>
    </AuthContext.Provider>
  );
};

describe("BookCard", () => {
  // Test the front-facing view of the BookCard
  it("renders the book title, author, and country on the front", () => {
    // Render the card with providers
    renderWithProviders(<BookCard book={mockBook} />);

    // Grab the front face of the card (using data-testid set in component)
    const front = screen.getByTestId("book-card-front");

    // Check that title, authors, and country are correctly displayed on the front
    expect(within(front).getByText("Test Book")).toBeInTheDocument();
    expect(within(front).getByText("Author One, Author Two")).toBeInTheDocument();
    expect(within(front).getByText("Spain")).toBeInTheDocument();
  });

  // Test the flip interaction and back-side content
  it("flips the card on click and shows the description", () => {
    renderWithProviders(<BookCard book={mockBook} />);

    // Simulate click on the whole card container to trigger flip
    const container = screen.getByTestId("book-card-container");
    fireEvent.click(container);

    // Assert that the description from the back of the card is visible
    expect(screen.getByText(/A test description/i)).toBeInTheDocument();
  });
});

