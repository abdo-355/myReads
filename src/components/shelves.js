import { useEffect, useState } from "react";
import * as books from "../utils/BooksAPI";
import BookShelf from "./bookShelf";

const Shelves = () => {
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
    const index = shelfUpdate[shelf].findIndex((item) => item.id === book.id);
    shelfUpdate[shelf].splice(index, 1);

    shelfUpdate[target].push(book);

    setShelves(shelfUpdate);
  };
  return (
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
      <BookShelf shelfName="Read" books={shelves.read} update={updateShelf} />
    </div>
  );
};

export default Shelves;
