// All elements
const mainContent = document.querySelector('.main-content');
const add = document.querySelector('.add');
const addForm = document.querySelector('.add-form');
const addButton = document.querySelector('.add-button');

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
    addForm.style.display = 'none';
    mainContent.style.display = 'grid';

    const book1 = new Book(title, author, page);
}

// When + is clicked
function formDisplay() {
    addForm.style.display = 'flex';
    mainContent.style.display = 'none';
}

// Event listners 
add.addEventListener('click', formDisplay);
addButton.addEventListener('click', addBookToLibrary);