import React, { useState, useRef, useEffect, useContext } from "react";
import Globe from "react-globe.gl"; //interactive 3d globe component
// import { BookContext } from "../context/BookContext";
import { getBooks } from "../services/bookService";
import BookCard from "./BookCard";
import "./DiscoverGlobe.css";

const DiscoverGlobe = () => {
  const globeRef = useRef(); //Reference to the globe instance for controlling view
  const [randomBook, setRandomBook] = useState(null); //Selected book after spinning

  const [globeAvailable, setGlobeAvailable] = useState(null);

  useEffect(() => {
    // Check if globe image loads properly
    const img = new Image();
    img.onload = () => setGlobeAvailable(true);
    img.onerror = () => setGlobeAvailable(false);
    img.src = "/globes/globe1.jpg";
  }, []);

  //When globe is clicked: spin it and show a random book
  const handleSpinAndPick = async () => {
    const books = await getBooks(); //Load books (mocked or real)
    const selected = books[Math.floor(Math.random() * books.length)];
    setRandomBook(null); //Clear previous book (optional fade out effect)

    // Move the globe to a random lat/lng
    const lat = Math.random() * 180 - 90;
    const lng = Math.random() * 360 - 180;
    globeRef.current.pointOfView({ lat, lng, altitude: 2 }, 1000); //animates spin

    // Spin globe if available
    if (globeAvailable && globeRef.current) {
      globeRef.current.pointOfView({ lat, lng, altitude: 2 }, 1000);
    }

    //Wait a bit before revealing the book (to match animation)
    setTimeout(() => {
      setRandomBook(selected);
    }, 2200);
  };

  return (
    <div className="discover-container row p-8 align-items-center">
      <div className="col-md-12 text-center text-md-start mb-4 mb-md-0">
        <h3 className="fw-bold"> Discover Somewhere New</h3>
        <p>Click the globe to find a story set in a new place.</p>
        

        {globeAvailable === null && (
          <div className="text-center my-4">
            <div className="spinner-border text-secondary" role="status">
              <span className="visually-hidden">Loading globe...</span>
            </div>
          </div>
        )}
        
        {globeAvailable === true && (
          <div className="clickable-globe" onClick={handleSpinAndPick}>
            <Globe
              ref={globeRef}
              globeImageUrl="//unpkg.com/three-globe/example/img/earth-day.jpg"
              backgroundColor="rgba(0,0,0,0)"
              width={300}
              height={300}
            />
          </div>
        )}
        {globeAvailable === false && (
          <div className="fallback-container text-center mt-3">
            <p className="text-muted">
              Globe not available. Try the fallback instead:
            </p>
            <img
              src="/globes/globe1.jpg"
              alt="Static globe fallback"
              style={{ width: "220px", margin: "1rem auto" }}
            />
            <button className="btn btn-orange mt-2" onClick={handleSpinAndPick}>
              🎲 Surprise Me!
            </button>
          </div>
        )}
        {randomBook && (
          <div id="discovery-result" className="mt-4 text-center">
            <h5 className="mb-3">
              📍 {randomBook.region} — {randomBook.title}
            </h5>
            <div className="d-flex justify-content-center">
              <div className="globe-book-card">
                <BookCard book={randomBook} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiscoverGlobe;
