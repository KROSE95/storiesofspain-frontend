const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";
const API_URL = import.meta.env.VITE_API_URL;

//  Helper to get token and decode user ID (optional)
const getToken = () => localStorage.getItem("token");
const getUserId = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.id || null;
};

//  GET bookmarks for the logged-in user
export const getBookmarks = async () => {
  if (USE_MOCK) {
    const userId = getUserId();
    const allBookmarks = JSON.parse(localStorage.getItem("bookmarks")) || {};
    return allBookmarks[userId] || { favourites: [], toBeRead: [] };
  }

  try {
    const res = await fetch(`${API_URL}/api/Bookmarks`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    if (!res.ok) throw new Error("Failed to fetch bookmarks");
    return await res.json();
  } catch (err) {
    console.error("API error (getBookmarks):", err);
    return { favourites: [], toBeRead: [] };
  }
};

//  ADD or REMOVE a book to a specific list (favourites / toBeRead)
export const toggleBookmark = async (book, listType) => {
  const userId = getUserId();
  if (!userId) return false;

  if (USE_MOCK) {
    const allBookmarks = JSON.parse(localStorage.getItem("bookmarks")) || {};
    const userBookmarks = allBookmarks[userId] || { favourites: [], toBeRead: [] };

    const list = userBookmarks[listType] || [];
    const exists = list.some((b) => b.id === book.id);
    const updatedList = exists
      ? list.filter((b) => b.id !== book.id)
      : [...list, book];

    userBookmarks[listType] = updatedList;
    allBookmarks[userId] = userBookmarks;
    localStorage.setItem("bookmarks", JSON.stringify(allBookmarks));
    return true;
  }

  try {
    const res = await fetch(`${API_URL}/api/Bookmarks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({ bookId: book.id, list: listType }),
    });

    return res.ok;
  } catch (err) {
    console.error("API error (toggleBookmark):", err);
    return false;
  }
};

// REMOVE a bookmark entirely (optional endpoint)
export const deleteBookmark = async (bookmarkId) => {
  if (USE_MOCK) {
    console.warn("Mock deleteBookmark not supported. Use toggleBookmark.");
    return false;
  }

  try {
    const res = await fetch(`${API_URL}/api/Bookmarks/${bookmarkId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    return res.ok;
  } catch (err) {
    console.error("API error (deleteBookmark):", err);
    return false;
  }
};
