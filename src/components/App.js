import "../styles/App.css";
import { Routes, Route, Link } from "react-router-dom";
import SearchPage from "./searchPage";
import Shelves from "./shelves";

function App() {
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
                <Shelves />
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
