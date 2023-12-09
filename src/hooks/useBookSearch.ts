import { useState, useEffect } from "react";

export default function useBookSearch(
  input: string,
  bookList: any,
  delay: number
) {
  const [searchedList, setSearchedList] = useState([]);
  useEffect(() => {
    let debouncedSearch = setTimeout(() => {
      let result = bookList.filter(
        (item: { bookName: ""; ISBN: "" }) =>
          item.bookName.toLowerCase() === input.toLowerCase() ||
          item.ISBN.toLowerCase() === input.toLowerCase()
      );

      setSearchedList(result);
    }, delay);

    return () => {
      clearTimeout(debouncedSearch);
    };
  }, [input, delay]);

  return { searchedList };
}
