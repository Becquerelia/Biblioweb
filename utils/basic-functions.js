//DO Require needed modules and utilities
const axios = require("axios");

// Function: getBookInfoFromGoogleApiById
// Params: String (id)
// Returns: Object (Promise)
//
//==============================================================================
// Description: Perform a search to Google Books API with the provided ID and
// returns an object with the following attributes:
// id => String
// title => String
// authors => Array
// categories => Array
// description => String
// imageLinks => Array
// publishedDate => String
let bookInfoFromAPI = {};

const getBookInfoFromGoogleApiById = async (id) => {
  if (!id) {
    return (errorMessage = "To search a book by ID you must provide an ID");
  }
  try {
    let addBookInfo = await axios.get(
      `https://www.googleapis.com/books/v1/volumes/${id}`
    );
    if (addBookInfo) {
      bookInfoFromAPI.id = addBookInfo.data.id;
    }
    if (addBookInfo.data.volumeInfo.title) {
      bookInfoFromAPI.title = addBookInfo.data.volumeInfo.title;
    }
    if (addBookInfo.data.volumeInfo.authors) {
      bookInfoFromAPI.authors = addBookInfo.data.volumeInfo.authors;
    }
    if (addBookInfo.data.volumeInfo.categories) {
      bookInfoFromAPI.categories = addBookInfo.data.volumeInfo.categories;
    }
    if (addBookInfo.data.volumeInfo.description) {
      bookInfoFromAPI.description = addBookInfo.data.volumeInfo.description;
    }
    if (addBookInfo.data.volumeInfo.imageLinks) {
      bookInfoFromAPI.imageLinks = addBookInfo.data.volumeInfo.imageLinks;
    }
    if (addBookInfo.data.volumeInfo.publishedDate) {
      bookInfoFromAPI.publishedDate = addBookInfo.data.volumeInfo.publishedDate;
    }
  } catch (err) {
    console.log(err);
  }
  return bookInfoFromAPI;
};

// Function: plainTextSearch
// Params: String (str)
// Returns: String (str)
//
//==============================================================================
// Description: Performs a regex char replace to avoid searching errors

/**
 * 
 */
const plainTextSearch = (str) => {
  let plainStr = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return plainStr;
};

module.exports = {
  getBookInfoFromGoogleApiById,
  plainTextSearch,
};
