//Select elements we need to select and give them representative name
const UIbookForm = document.getElementById("book-form");
const UIbookTitle = document.getElementById("title");
const UIbookAuthor = document.getElementById("author");
const UIbookIsbn = document.getElementById("isbn");
const UIbookList = document.getElementById("book-list");
const UIContainer = document.querySelector(".container");
const UIbody = document.getElementsByTagName("body")[0];
//Create a Book class to create and manipulate books
//its a good practice to create classes and objects!
class Book {
  //book class takes three parameters to create new instance of Book
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}
//Create a UI class which will be used like ui library
class UI {
  //ui has four methods to use by its instances. we can call them prototypes of UI
  static addBookToList(book) {
    //passing book object gonna added! wow!
    //This method will generate a tr(row) element.
    const row = document.createElement("tr");
    // a row that, has four columns. each col has book values(title,author,isbn)
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a> </td>
    `;
    //Also generated row will append to #book-list
    UIbookList.appendChild(row);
  }
  static showAlert(message, Alert) {
    //message should show in a representative div (error class etc.), so we need to create a new div first
    const messageDiv = document.createElement("div");
    //give message class to make it look like an success or error
    messageDiv.className = Alert;
    //give it a text node contains message
    messageDiv.appendChild(document.createTextNode(message));
    //now, we need to show it just before form element
    UIContainer.insertBefore(messageDiv, UIbookForm);
    //destroy created element after 1.5 sec
    setTimeout(function () {
      messageDiv.remove();
    }, 1500);
  }
  static deleteBook(target) {
    //this method will kill itself and his father and his father..
    target.parentElement.parentElement.remove();
  }
  static clearField() {
    UIbookTitle.value = "";
    UIbookAuthor.value = "";
    UIbookIsbn.value = "";
  }
}
class LS {
  static setBooks(book) {
    //get latest books as array
    let latestBooks = JSON.parse(localStorage.getItem("books"));
    //if null latestBooks = []
    if (latestBooks == null) latestBooks = [];
    //push book to latest books
    latestBooks.push(book);
    console.log(latestBooks);
    //set to LS
    localStorage.setItem("books", JSON.stringify(latestBooks));
  }
  static addBookToLS(book) {}
}

//Event Listeners  --> When to do
UIbookForm.addEventListener("submit", submitHandler);
UIbookList.addEventListener("click", bookListClickHandler);
//Event Handlers -->What to do
function submitHandler(event) {
  //whenever form submitted,addBookToList(adding book to list) will fire with new generated book
  //bring book values to our method to generate a book
  const title = UIbookTitle.value;
  const author = UIbookAuthor.value;
  const isbn = UIbookIsbn.value;
  //we don't wanna create a book if any of the inputs are empty
  if (title === "" || author === "" || isbn === "") {
    //we wan't to show error message, which is UI's job
    UI.showAlert("please enter value for all inputs", "error");
  } else {
    //book creation
    const book = new Book(title, author, isbn);
    //pass to book addBookToList method
    UI.addBookToList(book);
    //add books to LS
    LS.setBooks(book);
    //after book added to list, sweep inputs
    UI.clearField();
  }
  event.preventDefault();
}
function bookListClickHandler(event) {
  //run ui.deleteBook method only when X clicked
  if (event.target.className === "delete") {
    //run deleteBook method with X argument
    UI.deleteBook(event.target);
    //after deletion,send success message to ui
    UI.showAlert("item successfully removed", "success");
  }
}

//Bring localStorage onLoad
document.addEventListener("DOMContentLoaded", onLoadHandler);
function onLoadHandler() {
  //get books in ls
  books = JSON.parse(localStorage.getItem("books"));
  //if no books books should be an empty array
  if (books == null) books = [];
  //add the book to the ui foreach books
  books.forEach(function (book) {
    UI.addBookToList(book);
  });
}
