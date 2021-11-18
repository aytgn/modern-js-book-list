//Selecting Elements
const UIbookForm = document.getElementById("book-form");
const UItitle = document.getElementById("title");
const UIauthor = document.getElementById("author");
const UIisbn = document.getElementById("isbn");
const UIbookList = document.getElementById("book-list");
const UIcontainer = document.querySelector(".container");
//Book Constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}
//UI Constructor
function UI() {}
UI.prototype.deleteBook = function (target) {
  //if clicked target's class name is delete (target will be passed by event.target by remove)
  if (target.className === "delete") {
    //target's parent's parent will remove which is tr(row) element'
    target.parentElement.parentElement.remove();
  }
};
UI.prototype.showAlert = function (message, className) {
  //create a div
  const div = document.createElement("div");
  //add representative class
  div.className = `alert ${className}`;
  //add text
  div.appendChild(document.createTextNode(message));
  //get parent
  const form = UIbookForm;
  //insert alert before form
  const container = UIcontainer;
  container.insertBefore(div, form);
  //disappear after 1.5 sec
  setTimeout(function () {
    document.querySelector(".alert").remove();
  }, 1500);
};
UI.prototype.clearFields = function () {
  UItitle.value = "";
  UIauthor.value = "";
  UIisbn.value = "";
};
UI.prototype.addBookToList = function (book) {
  //create a tr element which will cal it "row"
  const row = document.createElement("tr");
  //insert cols
  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a> </td>
  `;
  UIbookList.appendChild(row);
};
//Event Listeners
UIbookForm.addEventListener("submit", function (event) {
  //Form values
  const title = UItitle.value;
  const author = UIauthor.value;
  const isbn = UIisbn.value;
  //Creating new Book depending on form values
  const book = new Book(title, author, isbn);
  //Creating UI element
  const ui = new UI();
  //Validate
  if (title === "" || author === "" || isbn === "") {
    //Error alert
    ui.showAlert("Please fill in all fields", "error");
  } else {
    //Add book to list
    ui.addBookToList(book); //ui objects addBook method, like a library.
    //Show Success
    ui.showAlert("Book Added", "success");
    //Clear field
    ui.clearFields();
  }

  event.preventDefault();
});
UIbookList.addEventListener("click", function (event) {
  const ui = new UI(); //creating a instance of ui to use its deleteBook and showAlert method
  ui.deleteBook(event.target); //clicked target will be argument of deleteBook
  ui.showAlert("Removed successfully", "success");
  event.preventDefault();
});
