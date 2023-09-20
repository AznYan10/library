// All elements
const add = document.querySelector('.add');

// Array for books
const myLibrary = [];

// Constructor for book
function Book(title, author, page) {
    this.title = title;
    this.author = author;
    this.page = page;
}

// Creating book object
function addBookToLibrary() {
    let title = prompt("Title: ");
    let author = prompt("Author: ");
    let page = prompt("Page: ");

    const book1 = new Book(title, author, page);
}

// Event listners 
add.addEventListener('click', addBookToLibrary);