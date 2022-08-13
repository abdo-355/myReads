import { useEffect, useState } from "react";
import "../styles/App.css";
import * as books from "../utils/BooksAPI";
import { Routes, Route, Link } from "react-router-dom";
import SearchPage from "./searchPage";
import BookShelf from "./bookShelf";

function App() {
  const [currentlyReading, setCurrentlyReading] = useState([]);
  const [wantToRead, setWantToRead] = useState([]);
  const [read, setRead] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const items = await books.getAll();
      items.forEach((item) => {
        if (items.shelf === "currentlyReading") {
          setCurrentlyReading([...currentlyReading, item]);
        } else if (items.shelf === "wantToRead") {
          setWantToRead([...wantToRead, item]);
        } else {
          setRead([...read, item]);
        }
      });
    };

    getData();
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
                  <BookShelf
                    shelfName="Currently Reading"
                    items={currentlyReading}
                  />
                  <BookShelf shelfName="Want to Read" items={wantToRead} />
                  <BookShelf shelfName="Read" items={read} />
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
