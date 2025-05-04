import React, { useState, useRef, useEffect } from "react";
import Globe from "react-globe.gl";
import { getBooks } from "../services/bookService";
import BookCard from "./BookCard";
import "./DiscoverGlobe.css";

const DiscoverGlobe = () => {
  const globeRef = useRef();
  const [randomBook, setRandomBook] = useState(null);

  const handleSpinAndPick = async () => {
    const books = await getBooks();
    const selected = books[Math.floor(Math.random() * books.length)];
    setRandomBook(null);

    // Spin the globe a little
    const lat = Math.random() * 180 - 90;
    const lng = Math.random() * 360 - 180;
    globeRef.current.pointOfView({ lat, lng, altitude: 2 }, 2000);

    setTimeout(() => {
      setRandomBook(selected);
    }, 2200);
  };

  return (
    <div className="discover-container row p-4 align-items-center">
      <div className="col-md-10 text-center text-md-start mb-4 mb-md-0">
        <h3 className="fw-bold">🌍 Discover Somewhere New</h3>
        <p>Click the globe to find a story set in a new place.</p>

        <div className=" clickable-globe  " onClick={handleSpinAndPick}>
          <Globe
            ref={globeRef}
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-day.jpg"
            backgroundColor="rgba(0,0,0,0)"
            width={300}
            height={300}
          />
          {/* <p className="small mt-2 text-muted">Click the globe to spin</p> */}
        </div>

        {randomBook && (
          <div className="mt-4 ">
            <h5 className="mb-3 text-center">Your Book Destination:</h5>
            <div className="d-flex justify-content-center">
              <BookCard book={randomBook} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiscoverGlobe;
