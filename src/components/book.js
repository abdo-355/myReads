import PropTypes from "prop-types";

const Book = ({ book, shelfName, imgurl, title, authors, update }) => {
  const shelf =
    shelfName === "none"
      ? "none"
      : shelfName.charAt(0).toLowerCase() +
        shelfName.split(" ").join("").slice(1);

  const handleChange = (e) => {
    update(shelf, e.target.value, book);
  };

  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url(${imgurl})`,
          }}
        ></div>
        <div className="book-shelf-changer">
          <select onChange={handleChange} defaultValue={shelf}>
            <option disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{title}</div>
      <div className="book-authors">
        {authors
          ? authors.map((author) => <span key={author}>{author}, </span>)
          : ""}
      </div>
    </div>
  );
};

Book.propTypes = {
  Book: PropTypes.object,
  update: PropTypes.func.isRequired,
  title: PropTypes.string,
  shelfName: PropTypes.string,
  imgurl: PropTypes.string,
  authors: PropTypes.array,
};

export default Book;
