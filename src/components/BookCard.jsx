function BookCard({ book }) {
    function onToReadClick() {
      alert("clicked ToRead");
    }
    function onFavouriteClick() {
      alert("clicked favourites");
    }
  
    return (
      <div className="card h-100">
      <div className="card-body">
        <h5 className="card-title">{book.title}</h5>
      <button className="toread-btn" onClick={onToReadClick}>To Read</button>
    
      <button className="favourite-btn" onClick={onFavouriteClick}>Favourite</button>
        <h6 className="card-subtitle text-muted mb-2">{book.author}</h6>
        <p className="card-text">{book.description}</p>
        <p><strong>Region:</strong> {book.region}</p>
        <p><strong>Genre:</strong> {book.genre}</p>
        <p><strong>Year:</strong> {book.yearPublished}</p>
      </div>
    </div>
    );
  }
  export default BookCard;