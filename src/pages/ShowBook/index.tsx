import Navbar from "../../components/Navbar";
import { useLocation } from "react-router-dom";
import "./index.css";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { deleteObjectInArray } from "../../utils/localStorage";
import { QRCodeSVG } from "qrcode.react";
import * as htmlToImage from "html-to-image";

export default function ShowBook() {
  let navigate = useNavigate();
  let location = useLocation();

  let {
    bookID,
    bookName,
    ISBN,
    bookCategory,
    bookRowNumber,
    bookCount,
    bookCost,
    bookAvailability,
  } = location.state;
  const objectString = JSON.stringify(location.state);
  function deleteBook(ID: string) {
    deleteObjectInArray("Books", ID, bookName);
    navigate("/show-admin");
  }

  const generateDownloadLink = () => {
    var node = document.getElementById("qr-code");

    htmlToImage
      .toPng(node as any)
      .then(function (dataUrl) {
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = `${bookName}.png`;
        link.click();
      })
      .catch(function (error) {
        console.error("oops, something went wrong!", error);
      });
  };

  return (
    <div className="book-details">
      <Navbar />
      <div className="qr-section">
        <QRCodeSVG id="qr-code" size={350} value={objectString} />
        <button onClick={generateDownloadLink}>Download QR</button>
      </div>
      <div className="icons">
        <FaEdit
          className="icon"
          onClick={() =>
            navigate("/", {
              state: location.state,
            })
          }
          size={30}
        />

        <FaRegTrashAlt
          className="icon"
          onClick={() => deleteBook(bookID)}
          size={30}
        />
      </div>
      <h1>{bookName}</h1>
      <h2>Category: {bookCategory}</h2>
      <h3>ISBN: {ISBN}</h3>
      <h3>Book Cost: {bookCost}</h3>
      <h3>Row Number: {bookRowNumber}</h3>
      <h3>Book Count: {bookCount}</h3>
      <h3>Book Availibility: {bookAvailability}</h3>
    </div>
  );
}
