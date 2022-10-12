const { getBorrowersForBook } = require("./books");

function getTotalBooksCount(books) {
  return books.length;
}




function getTotalAccountsCount(accounts = []) {
  return accounts.length;
}




function getBooksBorrowedCount(books) {
  //declared booksCheckedOut to hold the filtered books
  let booksCheckedOut = books.filter(
    (book) =>
    //filter through the borrowed books and see if the borrowed books are back in the library and if the length is greater than 0. 
      book.borrows.filter((borrBook) => borrBook.returned === false).length > 0
  );
  //return the booksCheckedOut amount using .length
  return booksCheckedOut.length;
}



function getMostCommonGenres(books) {
  //declare an empty array because we want the array as output.
  let genresCount = [];
  //loop through the books array declaring book as an anonymous function
  books.forEach((book) => {
    //put each book in genre pile
    if (genresCount[book.genre]) {
      //if we have multiples of a certain genre and that pile gets bigger, += 1
      genresCount[book.genre] += 1;
    } else {
      //if we just have one book in a certain genre pile, leave it at 1
      genresCount[book.genre] = 1;
    }
  });
  //return the object keys, don't need the value
  return (
    Object.keys(genresCount)
      //mapping through the name of the genres
      .map((name) => {
        //need to return the name of the genre and the count
        return { name, count: genresCount[name] };
      })
      //we need to sort through the most to least common genres
      .sort((a, b) => b.count - a.count)
      //we only need the top 5 genres
      .slice(0, 5)
  );
}



//to save time and some carpal tunnel, I made this helper function for the last two functions.
function getMostPopularBooksHelper(books = []) {
  //sort through popular books and use bookA and bookB as generic yet informative variable.
  books.sort((bookA, bookB) => {
    //return bookB.borrows.length because we want descending order.
    return bookB.borrows.length - bookA.borrows.length;
  });
  //returned descended order of books that are the most popular
  return books;
}

function getMostPopularBooks(books = []) {
  //declared an empty array to hold the books.
  let result = [];
  //declared popBooks to hold the information that was gathered during reduce
  //held a total and bookObj during the reduce array method.
  let popBooks = books.reduce((total, bookObj) => {
    //destructured borrows to = bookObj
      let { borrows } = bookObj;
      total = borrows.length;
    //push the result with the name of bookObj.title, count: total
      result.push({ name: bookObj.title, count: total});
    //return the total  of borrows.length;
      return total;
    });
    //sort through the resultObjA and resultObjB in descending order.
    result.sort((resultObjA, resultObjB) => {
        return resultObjB.count - resultObjA.count;//return in descending order from most popular to least
      });
      return result.slice(0, 5);//return top 5
}

//********Previous code before I realized I needed a helper function*******
    
    // //with the helper function, the books are already sorted from most popular to least popular.
    // books = getMostPopularBooksHelper(books);
    // //declaring a result variable to hold the top 5 books and map the bookObj's we are looking for. 
    // let result = books.slice(0, 5).map((bookObj) => {
    //   //returning the books and count in the format for which the assignment is asking.
    //   return { name: bookObj.title, count: bookObj.borrows.length };
    // });
    // //return the result to get this function complete.
    // return result;
    


function getMostPopularAuthors(books = [], authors = []) {
  //used the helper function I created to save some space/time
  let popularBooks = getMostPopularBooksHelper(books);
  //declared topFiveAuthors variable to hold the top five books we got from our helper function and implemented slice here. 
  let topFiveAuthors = popularBooks.slice(0, 5);
  //declared a result variable to hold the mapping of topFiveAuthors
  let result = topFiveAuthors.map((authorsObj) => {
    //declared a bookNumbers variable to hold the amount of borrows in the authorsObj
    let bookNumbers = authorsObj.borrows.length;
    //destructured authorId to authorsObj to make things easier for you.
    let { authorId } = authorsObj;
    //declared a popularAuthorsVariable to hold the findings of the authors loop. Declared each authors as authorsObj since they are all objects.
    let popularAuthor = authors.find((authorsObj) => {
      //We want to find out if the auhtorsObj.id mathces the authorId from our destructuring. 
      return authorsObj.id === authorId;
    });
    //used a helper function to join the names to save some time. 
    let fullName = helperJoinFirstAndLastNames(popularAuthor.name.first, popularAuthor.name.last)
    //return the name parameters as an object.
    return {name: fullName, count:bookNumbers}
  });
  //return result 
  return result;
}
//created a helper function to avoid retyping/typing the name 
function helperJoinFirstAndLastNames(first, last) {
  return `${first} ${last}`
}


//*****Previous code before I realized I could use a helper function******
// let result = [];
// authors.forEach((author) => {
//   let theAuthor = {
//     name: `${author.name.first} ${author.name.last}`,
//     count: 0,
//   };
//   books.forEach((book) => {
//     if (book.authorId === author.id) {
//       theAuthor.count += book.borrows.length;
//     }
//   });
//   result.push(theAuthor);
// });
// return result.sort((a, b) => b.count - a.count).slice(0, 5);

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
