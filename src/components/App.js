import { useEffect, useState } from "react";
import "../styles/App.css";
import * as books from "../utils/BooksAPI";
import { Routes, Route, Link } from "react-router-dom";
import SearchPage from "./searchPage";
import BookShelf from "./bookShelf";

function App() {
  const [shelves, setShelves] = useState({
    currentlyReading: [],
    wantToRead: [],
    read: [],
  });

  useEffect(() => {
    const getData = async () => {
      const items = await books.getAll();
      //Assigning each item to its shelf
      items.forEach((item) => {
        var newShelves = { ...shelves };
        newShelves[item.shelf].push(item);
        setShelves(newShelves);
      });
    };

    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="app">
      <Routes>
        <Route exact path="/search" element={<SearchPage />} />
        <Route
          exact
          path="/"
          element={
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <BookShelf shelfName="Currently Reading" state={shelves} />
                  <BookShelf shelfName="Want To Read" state={shelves} />
                  <BookShelf shelfName="Read" state={shelves} />
                </div>
              </div>
              <div className="open-search">
                <Link to="/search">Add a book</Link>
              </div>
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
