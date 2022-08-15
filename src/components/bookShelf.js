import Book from "./book";

const BookShelf = ({ shelfName, books }) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelfName}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {/*rendering each book individually*/}
          {books.map((book) => (
            <li key={book.id}>
              <Book
                imgurl={book.imageLinks.smallThumbnail}
                title={book.title}
                authors={book.authors}
              />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default BookShelf;
