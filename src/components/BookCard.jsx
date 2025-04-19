function BookCard({ book }) {
    function onToReadClick() {
      alert("clicked ToRead");
    }
    function onFavouriteClick() {
      alert("clicked favourites");
    }
  
    return (
      <div className="book-card">
        <div className="book-cover">
          <img src={book.url} alt={book.title} />
          <div className="book-overlay">
            <button className="toread-btn" onClick={onToReadClick}>To Read</button>
  
            <button className="favourite-btn" onClick={onFavouriteClick}>Favourite</button>
          </div>
        </div>
        <div className="book-info" >
          <h3> {book.title} </h3>
        </div>
      </div>
    );
  }
  export default BookCard;