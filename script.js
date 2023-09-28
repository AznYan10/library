// All elements
const mainContent = document.querySelector('.main-content');
const add = document.querySelector('.add');
const addForm = document.querySelector('.add-form');
const addButton = document.querySelector('.add-button');

// Constructor for book to represent the book
class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

//UI Constructor, handles UI tasks 
class UI {
    static displayBooks() {
        const StoredBooks = [
            {
                title: 'Endgame',
                author: 'James Frey',
                pages: '496',
                read: true,
            }
        ];
        const books = StoredBooks;
        books.forEach((book) => UI.addBookToLibrary(book));
    }
    
    // Creating elements for books
    static addBookToLibrary(book) {
        const bookContainer = document.createElement('div');
        bookContainer.classList = 'books';

        bookContainer.innerHTML = `
        <h3>Title: ${book.title}</h3>
        <h3>Author: ${book.author}</h3>
        <h3>Pages: ${book.pages}</h3>
        <div class="read-remove">
            <span class="read">${book.read ? 'Read' : 'Unread'}</span>
            <span class="remove">Remove</span>
        </div>
        `;

        mainContent.appendChild(bookContainer);
    }
}

// Display book
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Add Book
addForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const pages = document.querySelector('#pages').value;
    const read = document.querySelector('#read').checked;

    // Validate 
    if (title === '' || author === '' || pages === '') {
        alert('Please fill in all fields');
    } else {
        // Instatiate book
        const book = new Book(title, author, pages, read);

        // Adde book
        UI.addBookToLibrary(book);
    }
});

// When + is clicked
add.addEventListener('click', (e) => {
    addForm.style.display = 'flex';
});