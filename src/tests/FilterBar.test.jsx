import { render, screen, fireEvent } from "@testing-library/react";
import FilterBar from "../components/FilterBar";
import { vi } from "vitest";

describe("FilterBar", () => {
  // Sample mock data simulating available book entries
  const mockBooks = [
    {
      id: "1",
      country: "Spain",
      region: "Andalusia",
      genreNames: ["Fiction"],
      authorNames: ["Author A"],
    },
    {
      id: "2",
      country: "Spain",
      region: "Catalonia",
      genreNames: ["Mystery"],
      authorNames: ["Author B"],
    },
  ];

  // Initial empty filter state
  const filters = {
    country: "",
    region: "",
    genre: "",
    author: "",
  };

  // Mock function to track filter changes
  const mockFilterChange = vi.fn();

  // Test 1: Component renders all form controls correctly
  it("renders all filter options", () => {
    render(
      <FilterBar
        filters={filters}
        onFilterChange={mockFilterChange}
        books={mockBooks}
      />
    );

    // Check select dropdowns and input presence
    // Use getByLabelText to ensure labels are properly linked to form controls
    expect(screen.getByLabelText(/country/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/region/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/genre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/author/i)).toBeInTheDocument();

    // Ensure dropdowns are populated dynamically from book data
    expect(screen.getByRole("option", { name: "Spain" })).toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: "Andalusia" })
    ).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Mystery" })).toBeInTheDocument();
  });

  // Test 2: Calls the provided handler when a dropdown value is changed
  it("calls onFilterChange when selecting filters", () => {
    render(
      <FilterBar
        filters={filters}
        onFilterChange={mockFilterChange}
        books={mockBooks}
      />
    );

    // Simulate a user selecting "Spain" from the Country dropdown
    fireEvent.change(screen.getByLabelText(/country/i), {
      target: { value: "Spain" },
    });

    // Ensure the correct handler is called with the expected arguments
    expect(mockFilterChange).toHaveBeenCalledWith("country", "Spain");
  });

  it("calls onFilterChange with reset when reset button is clicked", () => {
    render(
      <FilterBar
        filters={filters}
        onFilterChange={mockFilterChange}
        books={mockBooks}
      />
    );
    // Simulate clicking the reset button
    fireEvent.click(screen.getByRole("button", { name: /reset filters/i }));
    // Ensure "reset" is passed to the handler as expected
    expect(mockFilterChange).toHaveBeenCalledWith("reset");
  });
  it("handles books with missing genreNames gracefully", () => {
    const booksWithMissingGenres = [
      {
        id: "1",
        country: "Spain",
        region: "Andalusia",
        // genreNames is missing
        authorNames: ["Author A"],
      },
      {
        id: "2",
        country: "Spain",
        region: "Catalonia",
        genreNames: ["Mystery"], // only one has genres
        authorNames: ["Author B"],
      },
    ];

    render(
      <FilterBar
        filters={filters}
        onFilterChange={mockFilterChange}
        books={booksWithMissingGenres}
      />
    );

    // Component should render genre select without error
    expect(screen.getByLabelText(/genre/i)).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Mystery" })).toBeInTheDocument();
  });

  it("calls onFilterChange when typing in the author input", () => {
    render(
      <FilterBar
        filters={filters}
        onFilterChange={mockFilterChange}
        books={mockBooks}
      />
    );

    // Simulate user typing into the author input field
    fireEvent.change(screen.getByLabelText(/author/i), {
      target: { value: "Cervantes" },
    });

    // Should call the handler with field name and input value
    expect(mockFilterChange).toHaveBeenCalledWith("author", "Cervantes");
  });
});

