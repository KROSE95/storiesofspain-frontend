import React, { useEffect, useState } from "react";
import BookCarousel from "../components/BookCarousel";
import DiscoverGlobe from "../components/DiscoverGlobe";
import CountryGrid from "../components/CountryGrid";
import GenreGrid from "../components/GenreGrid";
import { getBooks } from "../services/bookService";

const HomePage = () => {
  const [randomBooks, setRandomBooks] = useState([]);

  useEffect(() => {
    getBooks().then((allBooks) => {
      const shuffled = [...allBooks].sort(() => 0.5 - Math.random());
      setRandomBooks(shuffled.slice(0, 5));
    });
  }, []);


  return (
    <div className="homepage" >
      <div className="book_city-image-container">
        <img
          src="/covers/book_city.jpg"
          alt="Discover the world through books"
          className="book_city-image"
        />
      </div>

      <section className="text-center mt-4 px-3">
        <h2 className="heading-sm">Welcome to BookExplorer</h2>
        <p className="lead">
          Discover stories from around the world. Browse by country, explore by
          genre, or dive into random recommendations.
        </p>
      </section>

      {/*Two column: discover + country grid*/}

      <section className="mt-4">
        <div className="row gx-4">
          <div className="col-md-6">
            <div id="discover" className="section-panel panel-teal">
              <DiscoverGlobe />
            </div>
          </div>
          <div className="col-md-6">
            <div className="section-panel panel-green">
              <CountryGrid />
            </div>
            <div className="section-panel panel-accent ">
              <GenreGrid />
            </div>
          </div>
        </div>
      </section>

      {/* Carousel */}
      <section className="section-panel mt-4">
        <div className="container" style={{ maxWidth: "900px" }}>
          <h3 className="mb-3 text-center heading-sm">Featured Books To Try</h3>
          <BookCarousel books={randomBooks} />
        </div>
      </section>

      {/*Quote for the end of the page */}
      <section className="quote-block text-center mt-5 mb-4 px-3">
        <blockquote className="blockquote fst-italic">
          “Books are the plane, and the train, and the road. They are the
          destination and the journey. They are home.”
        </blockquote>
        <figcaption className="blockquote-footer mt-2">
          Anna Quindlen
        </figcaption>
      </section>
    </div>
  );
};

export default HomePage;
