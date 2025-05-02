const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";
const API_URL = import.meta.env.VITE_API_URL;

//  GET all genres (used in filters and forms)
export const getGenres = async () => {
  if (USE_MOCK) {
    try {
      const res = await fetch("/data/genres.json");
      return await res.json();
    } catch (err) {
      console.error("Error loading mock genres:", err);
      return [];
    }
  } else {
    try {
      const res = await fetch(`${API_URL}/api/Genres`);
      if (!res.ok) throw new Error("Failed to fetch genres");
      return await res.json();
    } catch (err) {
      console.error("API error (getGenres):", err);
      return [];
    }
  }
};

// Admin Only: Create genre
export const createGenre = async (genreData, token) => {
  if (USE_MOCK) {
    console.warn("Mock mode: createGenre not supported.");
    return false;
  }

  try {
    const res = await fetch(`${API_URL}/api/Genres`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(genreData),
    });

    if (!res.ok) return false;

    return await res.json();
  } catch (err) {
    console.error("Error creating genre:", err);
    return false;
  }
};

// Admin Only: Update genre
export const updateGenre = async (genreId, genreData, token) => {
  if (USE_MOCK) {
    console.warn("Mock mode: updateGenre not supported.");
    return false;
  }

  try {
    const res = await fetch(`${API_URL}/api/Genres/${genreId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(genreData),
    });

    if (!res.ok) return false;

    return await res.json();
  } catch (err) {
    console.error("Error updating genre:", err);
    return false;
  }
};

// Admin Only: Delete genre
export const deleteGenre = async (genreId, token) => {
  if (USE_MOCK) {
    console.warn("Mock mode: deleteGenre not supported.");
    return false;
  }

  try {
    const res = await fetch(`${API_URL}/api/Genres/${genreId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.ok;
  } catch (err) {
    console.error("Error deleting genre:", err);
    return false;
  }
};
