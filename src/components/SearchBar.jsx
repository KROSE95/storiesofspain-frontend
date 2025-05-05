// import React from "react";
// import "./SearchBar.css";

// const countryOptions = ["Spain", "France", "Afghanistan", "Italy", "Mexico"];
// const genreOptions = ["Historical Fiction", "Fantasy", "Romance", "Mystery", "Adventure Fiction"];

// const SearchBar = ({ filters, onFilterChange }) => {
//   return (
//     <div className="row g-3 mb-4">
//       <div className="col-md-6">
//         <input
//           type="text"
//           className="form-control"
//           placeholder="Search by title..."
//           value={filters.title}
//           onChange={(e) => onFilterChange("title", e.target.value)}
//         />
//       </div>

//       <div className="col-md-6">
//         <input
//           type="text"
//           className="form-control"
//           placeholder="Search by author..."
//           value={filters.author}
//           onChange={(e) => onFilterChange("author", e.target.value)}
//         />
//       </div>

//       <div className="col-md-6">
//         <select
//           className="form-select"
//           value={filters.country}
//           onChange={(e) => onFilterChange("country", e.target.value)}
//         >
//           <option value="">Filter by country</option>
//           {countryOptions.map((country) => (
//             <option key={country} value={country.toLowerCase()}>
//               {country}
//             </option>
//           ))}
//         </select>
//       </div>

//       <div className="col-md-6">
//         <select
//           className="form-select"
//           value={filters.genre}
//           onChange={(e) => onFilterChange("genre", e.target.value)}
//         >
//           <option value="">Filter by genre</option>
//           {genreOptions.map((genre) => (
//             <option key={genre} value={genre.toLowerCase()}>
//               {genre}
//             </option>
//           ))}
//         </select>
//       </div>
//     </div>
//   );
// };

// export default SearchBar;

//Using filterbar instead.