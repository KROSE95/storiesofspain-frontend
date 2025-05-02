const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";
const API_URL = import.meta.env.VITE_API_URL;

//  Load authors from API
const loadAPIAuthors = async () => {
  try {
    const res = await fetch(`${API_URL}/api/Authors`);
    if (!res.ok) throw new Error("Failed to fetch authors");
    return await res.json();
  } catch (err) {
    console.error("API error:", err);
    return [];
  }
};

//  Load authors from mock JSON
const loadMockAuthors = async () => {
  try {
    const res = await fetch("/data/authors.json");
    return await res.json();
  } catch (err) {
    console.error("Error loading mock authors:", err);
    return [];
  }
};


//  Get all authors (used in dropdowns, filters)
export const getAuthors = async () => {
  return USE_MOCK ? await loadMockAuthors() : await loadAPIAuthors();
};

//  Admin ONLY: Create a new author
export const createAuthor = async (authorData, token) => {
  if (USE_MOCK) {
    console.warn("Mock mode: createAuthor not supported.");
    return false; //clearer than null for checking later
  }

  try {
    const res = await fetch(`${API_URL}/api/Authors`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(authorData), //converting javascript object to json string
    });

    if (!res.ok) {
      console.error("Failed to create author. Status:", res.status);
      return false; // if the API rejects it (e.g., 403), return false
    }

    return await res.json(); //return created author object
  } catch (err) {
    console.error("Error creating author:", err);
    return false; //network or code error.
  }
};

// Admin ONLY: edit author
export const updateAuthor = async (authorId, authorData, token) => {
  if (USE_MOCK) {
    console.warn("Mock mode: updateAuthor not supported.");
    return null;
  }

  try {
    const res = await fetch(`${API_URL}/api/Authors/${authorId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(authorData),
    });

    if (!res.ok) throw new Error("Failed to update author");

    return await res.json();
  } catch (err) {
    console.error("Error updating author:", err);
    return null;
  }
};

// admin ONLY: delete author
export const deleteAuthor = async (authorId, token) => {
    if (USE_MOCK) {
      console.warn("Mock mode: deleteAuthor not supported.");
      return false;
    }
  
    try {
      const res = await fetch(`${API_URL}/api/Authors/${authorId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      return res.ok;
    } catch (err) {
      console.error("Error deleting author:", err);
      return false;
    }
  };
  