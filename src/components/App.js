import { useEffect, useState } from "react";
import * as books from "../utils/BooksAPI";
import "../styles/App.css";
import { Routes, Route, Link } from "react-router-dom";
import SearchPage from "./searchPage";
import Shelves from "./shelves";

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

    if (shelf) {
      const index = shelfUpdate[shelf].findIndex((item) => item.id === book.id);
      shelfUpdate[shelf].splice(index, 1);
    }
    if (target !== "none") {
      shelfUpdate[target].push(book);
    }
    setShelves(shelfUpdate);
  };
  return (
    <div className="app">
      <Routes>
        <Route
          exact
          path="/search"
          element={<SearchPage shelves={shelves} updateShelf={updateShelf} />}
        />
        <Route
          exact
          path="/"
          element={
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <Shelves shelves={shelves} updateShelf={updateShelf} />
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
