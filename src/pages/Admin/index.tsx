import "./index.css";
import Input from "../../components/Input";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { generateRandomId } from "../../utils/generateRandomId";
import {
  retrieveArrayFromLocalStorage,
  storeArrayInLocalStorage,
  updateObjectInArray,
} from "../../utils/localStorage";
import Navbar from "../../components/Navbar";

export default function Admin() {
  let location = useLocation();
  let navigate = useNavigate();
  const [bookInputs, setBookInputs] = useState({
    bookName: "",
    ISBN: "",
    bookCategory: "",
    bookRowNumber: "",
    bookCount: "",
    bookCost: "",
    bookAvailability: "",
    bookID: "",
  });
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = event.target;
    let currentInput = { [name]: value };
    setBookInputs((prev) => ({ ...prev, ...currentInput }));
  };

  const addBook = () => {
    setBookInputs({
      bookName: "",
      ISBN: "",
      bookCategory: "",
      bookRowNumber: "",
      bookCount: "",
      bookCost: "",
      bookAvailability: "",
      bookID: "",
    });
    let currentItems = retrieveArrayFromLocalStorage("Books");
    let array = [
      ...currentItems,
      { ...bookInputs, bookID: generateRandomId(6) },
    ];

    if (
      (
        bookInputs.bookName &&
        bookInputs.bookCategory &&
        bookInputs.ISBN &&
        bookInputs.bookAvailability &&
        bookInputs.bookRowNumber &&
        bookInputs.bookCost &&
        bookInputs.bookCount
      ).length > 0
    ) {
      storeArrayInLocalStorage("Books", array);
      alert(`Book ${bookInputs.bookName} added successfully!`);
    } else {
      alert("Please fill all the fields!");
    }
  };

  const updateBook = () => {
    let currentItems = retrieveArrayFromLocalStorage("Books");

    let result = updateObjectInArray(
      currentItems,
      bookInputs.bookID,
      bookInputs
    );

    storeArrayInLocalStorage("Books", result);
    setBookInputs({
      bookName: "",
      ISBN: "",
      bookCategory: "",
      bookRowNumber: "",
      bookCount: "",
      bookCost: "",
      bookAvailability: "",
      bookID: "",
    });

    if (
      (
        bookInputs.bookName &&
        bookInputs.bookCategory &&
        bookInputs.ISBN &&
        bookInputs.bookAvailability &&
        bookInputs.bookRowNumber &&
        bookInputs.bookCost &&
        bookInputs.bookCount
      ).length > 0
    ) {
      storeArrayInLocalStorage("Books", result);
      alert(`Book ${bookInputs.bookName} updated successfully!`);
      navigate("/show-admin");
    } else {
      alert("Please fill all the fields!");
    }
  };

  useEffect(() => {
    setBookInputs(location.state ? location.state : []);
  }, []);
  return (
    <div>
      <Navbar />
      <Input
        name="bookName"
        onChange={handleInput}
        placeholder="Enter the Book Name"
        value={bookInputs.bookName}
      />
      <Input
        name="ISBN"
        onChange={handleInput}
        placeholder="Enter the ISBN No."
        value={bookInputs.ISBN}
      />
      <Input
        name="bookCategory"
        onChange={handleInput}
        placeholder="Enter the Book Category"
        value={bookInputs.bookCategory}
      />
      <Input
        name="bookRowNumber"
        onChange={handleInput}
        placeholder="Enter the Row Number"
        value={bookInputs.bookRowNumber}
      />
      <Input
        name="bookCount"
        onChange={handleInput}
        placeholder="Enter the Book Count"
        value={bookInputs.bookCount}
      />
      <Input
        name="bookCost"
        onChange={handleInput}
        placeholder="Enter the Cost"
        value={bookInputs.bookCost}
      />
      <Input
        name="bookAvailability"
        onChange={handleInput}
        placeholder="Enter the Availability"
        value={bookInputs.bookAvailability}
      />
      <button
        onClick={location.state ? updateBook : addBook}
        className="add-book-btn"
      >
        {location.state ? "Update" : "Add"} a Book
      </button>
    </div>
  );
}
