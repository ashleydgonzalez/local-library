function findAccountById(accounts, id) {
  //declared a new variable to hold the findings of the accounts information..
  let result = accounts.find((accountObj) => {
    //return the results if the accountObj.id matches the id. 
    return accountObj.id === id;
  });
  //return with a ternary operater if we get a result, if we don't get a result return null. 
  return result ? result : null;
}




function sortAccountsByLastName(accounts) {
  //sort through the accounts with descending order
  accounts.sort((accountA, accountB) => {
    //made sure to use toLowerCase to avoid any errors since the first letter was capitalized.
    return accountB.name.last.toLowerCase() < accountA.name.last.toLowerCase() ? 1 : -1 // use of ternary because of descending order
  });
  //returned sorted accounts. 
  return accounts;
}



function getTotalNumberOfBorrows(account, books) {
  //destructured id to equal account since that is what we are checking
  const { id } = account;
  //declared and empty result to hold our future answers.
  let result = 0;
  //looped through the books array with bookReturn indicating if they have been returned or not. 
  books.forEach((bookReturn) => {
    //declared accountCreatedRecord hold the some array method values when we check the bookReturn.borrows array.
    let accountCreatedRecord = bookReturn.borrows.some((borrowsRecord) => {
    //we want to check if our borrowsRecord.id variable matches the destructured id
      return borrowsRecord.id === id;
    });
    //if it does match, then we increment. 
    if (accountCreatedRecord === true) {
      result++;
    }
  });
  //returning our empty result variable to have answers. 
  return result; 
}


function getBooksPossessedByAccount(account, books, authors) {
  //destructuring our id to mean account
  const {id} = account;
  //declared booksPeopleCheckout to hold our filtered findings from the books array.
  let booksPeopleCheckout = books.filter((bookObj) => {
    //declared borrow to bookObj.borrows starting at index 0. 
    let borrow = bookObj.borrows[0] 
    //checking if the borrow.id matches id and if the book is returned.
    return borrow.id === id && borrow.returned === false;
    
  })
  .map((bookObj) => { //mapping through the bookObj now that its holding information. 
    //destructuring authorId to bookObj
    const {authorId} = bookObj;
    //declaring a new variable to hold the findings of authors and creating an authorsObj
      let foundAuthorsObj = authors.find((authorsObj) => {
        //checking to see if authorsObj.id matches the authorId
        return authorsObj.id === authorId;
      })
      //assigned one to another
      bookObj.author = foundAuthorsObj;
      return bookObj;//returned bookObj
  })
    //console.log(booksPeopleCheckout)
    return booksPeopleCheckout;//returned booksPeopleCheckOut to see what accounts have which books. 
  }
  
  
  
  module.exports = {
    findAccountById,
    sortAccountsByLastName,
    getTotalNumberOfBorrows,
    getBooksPossessedByAccount,
  };















