import { render, screen, waitFor } from "@testing-library/react";
import DiscoverGlobe from "../components/DiscoverGlobe";
import { vi } from "vitest";

describe("DiscoverGlobe", () => {
  // Before all tests, simulate globe image load failure
  beforeAll(() => {
    // Mock Image.prototype.src so it triggers an error when set
    // Use Vitest's vi.spyOn to simulate image load failure
    vi.spyOn(global.Image.prototype, "src", "set").mockImplementation(
      function () {
        setTimeout(() => {
          this.onerror?.(); // safely call onerror if it exists
        }, 0);
      }
    );
  });

  it("renders fallback content if globe image fails to load", async () => {
    //renders the component
    render(<DiscoverGlobe />);

    // Wait until the fallback text appears (globe failed to load)
    await waitFor(() =>
      expect(screen.getByText(/globe not available/i)).toBeInTheDocument()
    );
    // Check that the fallback button is visible
    expect(
      screen.getByRole("button", { name: /surprise me/i })
    ).toBeInTheDocument();

    // Optional: only assert image if one exists in fallback
    const fallbackImg = screen.queryByRole("img", {
      name: /static globe fallback/i,
    });
    if (fallbackImg) {
      expect(fallbackImg).toBeInTheDocument();
    }
  });
});
