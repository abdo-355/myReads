import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as books from "../utils/BooksAPI";
import Book from "./book";

const SearchPage = () => {
  const [value, setValue] = useState("");
  const [bookList, setBookList] = useState({});

  const handleChange = (event) => {
    if (event !== "") {
      setValue(event);
    } else {
      setBookList({});
      setValue("");
    }
  };

  useEffect(() => {
    const getDate = async () => {
      if (value !== "") {
        const res = await books.search(value);
        if (res.error !== "empty query") {
          setBookList(res);
        } else {
          setBookList({});
        }
      }
    };

    getDate();
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

export default SearchPage;
