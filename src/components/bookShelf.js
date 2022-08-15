import Book from "./book";

const BookShelf = ({ shelfName, books, update }) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelfName}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {/*rendering each book individually*/}
          {books.map((book) => (
            <li key={book.id}>
              <Book
                book={book}
                shelfName={shelfName}
                imgurl={book.imageLinks.smallThumbnail}
                title={book.title}
                authors={book.authors}
                update={update}
              />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default BookShelf;
