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

  const updateShelf = (shelf, target, book) => {
    //updating the shelf in the backend
    books.update(book, target);

    //updating the shelf in the frontend
    const shelfUpdate = { ...shelves };
    shelfUpdate[target].push(book);
    const index = shelfUpdate[shelf].findIndex((item) => item.id === book.id);
    shelfUpdate[shelf].splice(index, 1);
    setShelves(shelfUpdate);
  };

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
                    books={shelves.currentlyReading}
                    update={updateShelf}
                  />
                  <BookShelf
                    shelfName="Want To Read"
                    books={shelves.wantToRead}
                    update={updateShelf}
                  />
                  <BookShelf
                    shelfName="Read"
                    books={shelves.read}
                    update={updateShelf}
                  />
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
