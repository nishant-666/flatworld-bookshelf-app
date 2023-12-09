type BookObject = {
  bookName: string;
  ISBN: string;
  bookCategory: string;
  bookRowNumber: string;
  bookCount: string;
  bookCost: string;
  bookAvailability: string;
  bookID: string;
};

export function storeArrayInLocalStorage(key: string, array: Object) {
  const jsonString = JSON.stringify(array);

  localStorage.setItem(key, jsonString);
}

export function retrieveArrayFromLocalStorage(key: string) {
  const retrievedJsonString = localStorage.getItem(key);

  return JSON.parse(retrievedJsonString as string) || [];
}

export function updateObjectInArray(
  array: BookObject[],
  bookID: string,
  updatedProperties: Partial<BookObject>
): BookObject[] {
  const index = array.findIndex((obj) => obj.bookID === bookID);

  if (index !== -1) {
    array[index] = { ...array[index], ...updatedProperties };
  }
  console.log(array[index]);
  return array;
}

export function deleteObjectInArray(
  key: string,
  bookID: string,
  bookName: string
) {
  const storedArrayString = localStorage.getItem(key);

  let array = JSON.parse(storedArrayString as string);

  const indexToDelete = array.findIndex(
    (item: { bookID: "" }) => item.bookID === bookID
  );

  if (indexToDelete !== -1) {
    array.splice(indexToDelete, 1);

    localStorage.setItem(key, JSON.stringify(array));

    alert(`Book ${bookName} deleted successfully.`);
  } else {
    alert(`Book ${bookName} not found.`);
  }
}
