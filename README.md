BookExplore – Discover Books by Location
BookExplore is a frontend web application that helps users discover and save books set in different parts of the world. Users can filter by country, region, author, or genre, explore random books via an interactive 3D globe, and manage their own favourites and to-be-read lists.

Key Features
-Filter books by region, genre, author, or title
-Save books to "Favourites" or "To Be Read" lists
-Discover random books using a 3D spinning globe
-User authentication (Sign up / Log in)
-Admin controls for creating, editing, and deleting books

Tech Stack
React (Vite)
React Bootstrap
React Router DOM
Context API for global state
Mock data (JSON) used instead of real API
React Globe GL
Vitest & React Testing Library

Live Demo
The project is deployed and accessible at:
https://playful-boba-c66264.netlify.app/

Project Structure
bookExploreApp/
├── public/
│ ├── covers/ # Book cover images
│ ├── globes/ # Static globe image
│ └── data/ # books.json, users.json
├── src/
│ ├── components/ # Reusable UI components (BookCard, Modals, etc.)
│ ├── context/ # Auth, Book, Bookmark Contexts
│ ├── pages/ # Route-level views (e.g. HomePage, AdminDash)
│ ├── services/ # bookService.js for fetching mock data
│ ├── tests/ # Unit tests with Vitest
│ ├── App.jsx # App layout and routes
│ └── main.jsx # Entry point
├── README.md
├── package.json
└── vite.config.js

Running Locally
git clone https://github.com/KROSE95/storiesofspain-frontend.git
cd bookExploreApp
npm install
npm run dev

To run tests (optional):
npm test

Known Limitations
Backend API is not functional or integrated
All data (books, users) is loaded from local JSON files
Features like user login, saving, and admin actions are frontend-only simulations

Coursework Context
This project was developed as part of a Master's in Software Engineering (Conversion) programme for the Frontend Web Development module. The backend was not connected for this submission. All data handling is mocked, and the frontend has been structured with a focus on test coverage, and future API integration.
