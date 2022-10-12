function findAuthorById(authors, id) {
  //declared a result variable to hold the info from the find array method when looping through authors. Once looped, compared authorsObj.id to id. 
  let result = authors.find((authorsObj) => authorsObj.id === id);
  //ternary operator if we get our result or if it comes back null
  return result ? result : null;
}




function findBookById(books, id) {
  //looping with find for books, and if the bookObj matches the id.
  return books.find((bookObj) => bookObj.id === id);
}




function partitionBooksByBorrowedStatus(books) {
  //declared borrowedBooks to hold info from filtering of books. Created new variable bookObj
  let borrowedBooks = books.filter((bookObj) => {
    //delcared bookList to hold bookObj info that dot notated borrows.
    let bookList = bookObj.borrows;
    //declared confirmedBorrows to hold looped info of our bookList variable.
    let confirmedBorrows = bookList.some(currBookStatus => {
      //confirmed the currBookStatus returned is false.
      return currBookStatus.returned === false;
    })
    return confirmedBorrows;//returned confirmedBorrows information
  })
  //declared booksInLibrary to hold filtering of books info
  let booksInLibrary = books.filter((bookObj) => {
    //delcared bookList to hold bookObj info that dot notated borrows.
    let bookList = bookObj.borrows;
    let returnedBooks = bookList.every(currBookStatus => {
      return currBookStatus.returned === true;//make sure everything is matching to true
    })
    return returnedBooks;//return variable
  })
  return [borrowedBooks, booksInLibrary];//returned partitioned array
}




function getBorrowersForBook(book, accounts) {
  //return the book.borrows with map array method
  return book.borrows.map((borrow) => {
    //declared account to hold info that was looped through in accounts. Made sure the account.id matched borrowed.id
   let account = accounts.find((account) => account.id === borrow.id);
   //returned a spread operator to hold all information
   return { ...borrow, ...account };
  })
  .slice(0, 10);//sliced because we wanted top 10.
}






module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
