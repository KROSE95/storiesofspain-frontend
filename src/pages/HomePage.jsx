import React, { useEffect, useState } from "react";
import BookCarousel from "../components/BookCarousel";
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
    <div className="homepage">
      
      <div className="book_city-image d-flex justify-content-center ">
        <img
          src="/covers/book_city.jpg"
          alt="Discover the world through books"
          className="img-fluid w-50"
          style={{
            height: "200px",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      </div>
     

      {/* Carousel */}
      <section className="mt-3">
        <div className="container" style={{ maxWidth: "900px" }}>
          <h3 className="mb-3 text-center">Featured Books</h3>
          <BookCarousel books={randomBooks} />
        </div>
      </section>
    </div>
  );
};

export default HomePage;
