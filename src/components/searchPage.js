import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import * as books from "../utils/BooksAPI";
import Book from "./book";

const SearchPage = ({ shelves, updateShelf }) => {
  const [value, setValue] = useState("");
  const [bookList, setBookList] = useState({});

  let shelvesArray = [];

  Object.values(shelves).forEach((books) => {
    shelvesArray = shelvesArray.concat(books);
  });

  const handleChange = (event) => {
    if (event !== "") {
      setValue(event);
    } else {
      setValue("");
    }
  };

  useEffect(() => {
    const getDate = async () => {
      if (value !== "") {
        const res = await books.search(value);
        if (res.error !== "empty query") {
          const booksWithShelves = res.map((book) => {
            if (!shelvesArray.some((element) => element.id === book.id)) {
              book.shelf = "none";
              return book;
            } else {
              const bookwithShelfName = shelvesArray.filter(
                (element) => element.id === book.id
              );
              const updatedBook = bookwithShelfName[0];
              return updatedBook;
            }
          });

          setBookList(booksWithShelves);
        } else {
          setBookList({});
        }
      } else {
        setBookList({});
      }
    };

    getDate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/" className="close-search">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            onChange={(event) => handleChange(event.target.value)}
            type="text"
            placeholder="Search by title, author, or ISBN"
            value={value}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {Object.values(bookList).map((book) => (
            <li key={book.id}>
              <Book
                book={book}
                update={updateShelf}
                imgurl={
                  book.imageLinks !== undefined
                    ? book.imageLinks.smallThumbnail
                    : ""
                }
                title={book.title}
                shelfName={book.shelf}
                authors={book.authors}
              />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

SearchPage.propTypes = {
  shelves: PropTypes.object.isRequired,
  updateShelf: PropTypes.func.isRequired,
};

export default SearchPage;
