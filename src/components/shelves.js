import PropTypes from "prop-types";
import BookShelf from "./bookShelf";

const Shelves = ({ shelves, updateShelf }) => {
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

Shelves.propTypes = {
  shelves: PropTypes.object.isRequired,
  updateShelf: PropTypes.func.isRequired,
};

export default Shelves;
