const Book = ({ book, shelfName, imgurl, title, authors, update }) => {
  const shelfSelected = shelfName
    ? shelfName.charAt(0).toLowerCase() + shelfName.split(" ").join("").slice(1)
    : null;

  const handleChange = (e) => {
    if (e.target.value !== "none") {
      update(shelfSelected, e.target.value, book);
    }
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
          <select onChange={handleChange} defaultValue={shelfSelected}>
            <option value="none" disabled>
              Move to...
            </option>
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

export default Book;
