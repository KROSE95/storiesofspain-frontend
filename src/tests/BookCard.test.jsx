import { render, screen, fireEvent, within } from "@testing-library/react";
import BookCard from "../components/BookCard";
import { AuthContext } from "../context/AuthContext";
import { BookmarkContext } from "../context/BookmarkContext";

// Sample book data
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
  it("renders the book title, author, and country on the front", () => {
    renderWithProviders(<BookCard book={mockBook} />);
    
    const front = screen.getByTestId("book-card-front");

    expect(within(front).getByText("Test Book")).toBeInTheDocument();
    expect(within(front).getByText("Author One, Author Two")).toBeInTheDocument();
    expect(within(front).getByText("Spain")).toBeInTheDocument();
  });

  it("flips the card on click and shows the description", () => {
    renderWithProviders(<BookCard book={mockBook} />);
    
    const container = screen.getByTestId("book-card-container");
    fireEvent.click(container);

    expect(screen.getByText(/A test description/i)).toBeInTheDocument();
  });
});
