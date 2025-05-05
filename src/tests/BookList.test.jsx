import { render, screen, fireEvent } from "@testing-library/react";
import BookList from "../components/BookList";
import { BookContext } from "../context/BookContext";
import { AuthContext } from "../context/AuthContext";
import { BookmarkContext } from "../context/BookmarkContext";


// Create mock book data — 12 books for testing load-more behavior
const mockBooks = Array.from({ length: 12 }, (_, i) => ({
  id: `${i}`,
  title: `Book ${i}`,
  authorNames: [`Author ${i}`],
  genreNames: ["Fiction"],
  country: "Spain",
  region: "Region",
  yearPublished: "2000",
  description: `Desc ${i}`,
  coverImage: "test.jpg",
}));
// Utility function to wrap BookList in all required context providers
const renderWithAllContexts = (books, props = {}) => {
  return render(
    <AuthContext.Provider value={{ isAdmin: false }}>
      <BookmarkContext.Provider value={{ favourites: [], toBeRead: [], toggleBookmark: () => {} }}>
        <BookContext.Provider value={{ books }}>
          <BookList books={books} {...props} />
        </BookContext.Provider>
      </BookmarkContext.Provider>
    </AuthContext.Provider>
  );
};

describe("BookList", () => {
      //  Edge case: Empty array
  it("displays a message when no books are found", () => {
    renderWithAllContexts([]);
    expect(screen.getByText("No books found. Try changing your filters.")).toBeInTheDocument();
  });
  it("renders book titles", () => {
    renderWithAllContexts(mockBooks);

    // Use getAllByText because each title is rendered twice (front and back of BookCard)
    // Only neeed to ensure at least one of them is in the document
    expect(screen.getAllByText("Book 0")[0]).toBeInTheDocument();
    expect(screen.getAllByText("Book 1")[0]).toBeInTheDocument();
  });

  it("shows 'Show More Stories' button when more than 9 books", () => {
    renderWithAllContexts(mockBooks);
     // Verify button for loading more books is visible when applicable
    expect(screen.getByRole("button", { name: /show more stories/i })).toBeInTheDocument();
  });

  it("loads more books when 'Show More Stories' is clicked", () => {
    renderWithAllContexts(mockBooks);
    const loadMoreBtn = screen.getByRole("button", { name: /show more stories/i });
    fireEvent.click(loadMoreBtn);

    // Check that a book beyond the initial 9 appears after clicking
    // Again, use getAllByText to avoid the error caused by duplicate titles
    expect(screen.getAllByText("Book 10")[0]).toBeInTheDocument();
  });

  it("renders horizontally when horizontal prop is true", () => {
    // Only render a few books and set horizontal mode to true
    renderWithAllContexts(mockBooks.slice(0, 3), { horizontal: true });
    // Grab a book card and check its wrapper class for horizontal stylingv
    const list = screen.getAllByText("Book 0")[0].closest(".d-flex");
    expect(list).toHaveClass("overflow-auto");
  });
});
