import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { retrieveArrayFromLocalStorage } from "../../utils/localStorage";
import "./index.css";
import useBookSearch from "../../hooks/useBookSearch";
import Input from "../../components/Input";
import { useNavigate } from "react-router-dom";

export default function ShowAdmin() {
  let navigate = useNavigate();
  const [bookList, setBookList] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  useEffect(() => {
    const getBooks = () => {
      let books = retrieveArrayFromLocalStorage("Books");
      setBookList(books);
    };

    return () => getBooks();
  }, []);

  let { searchedList } = useBookSearch(searchInput, bookList, 1000);
  console.log(searchedList);
  return (
    <div>
      <Navbar />

      <Input
        name="searchInput"
        onChange={(event) => setSearchInput(event?.target.value as string)}
        placeholder="Search for a Book.."
        value={searchInput}
      />
      <div className="books-grid">
        {searchedList.length > 0
          ? searchedList.map(
              (book: {
                bookName: "";
                ISBN: "";
                bookCategory: "";
                bookRowNumber: "";
                bookCount: "";
                bookCost: "";
                bookAvailability: "";
              }) => (
                <div
                  onClick={() =>
                    navigate(`/show-book`, {
                      state: book,
                    })
                  }
                  key={book.bookName}
                  className="books-item"
                >
                  <h1>{book.bookName}</h1>
                  <h3>Category: {book.bookCategory}</h3>
                  <h4>ISBN: {book.ISBN}</h4>
                  <h4>Cost: {book.bookCost}</h4>
                </div>
              )
            )
          : bookList.map(
              (book: {
                bookName: "";
                ISBN: "";
                bookCategory: "";
                bookRowNumber: "";
                bookCount: "";
                bookCost: "";
                bookAvailability: "";
              }) => (
                <div
                  onClick={() =>
                    navigate(`/show-book`, {
                      state: book,
                    })
                  }
                  key={book.bookName}
                  className="books-item"
                >
                  <h1>{book.bookName}</h1>
                  <h3>Category: {book.bookCategory}</h3>
                  <h4>ISBN: {book.ISBN}</h4>
                  <h4>Cost: {book.bookCost}</h4>
                </div>
              )
            )}
      </div>
    </div>
  );
}
