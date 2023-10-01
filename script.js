// All elements
const mainContent = document.querySelector('.main-content');
const add = document.querySelector('.add');
const readBtn = document.querySelector('#read');
const read = document.querySelector('.read');
const removeBtn = document.querySelector('.remove');
const addForm = document.querySelector('.add-form');
const addButton = document.querySelector('.add-button');
const closeButton = document.querySelector('.close-button');

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
        const books = Store.getBooks();
        books.forEach((book) => UI.addBookToLibrary(book));
        UI.updateTotalBooksCount();
    }
    
    // Creating elements for books
    static addBookToLibrary(book) {
        const bookContainer = document.createElement('div');
        bookContainer.classList = 'books';

        bookContainer.innerHTML = `
        <h3>${book.title}</h3>
        <h3>${book.author}</h3>
        <h3>${book.pages}</h3>
        <div class="read-remove">
            <span class="read">${book.read ? 'Read' : 'Unread'}</span>
            <span class="remove">Remove</span>
        </div>
        `;

        mainContent.appendChild(bookContainer);
        UI.updateTotalBooksCount();
    }

    // Clear fields after book is added
    static clearFields () {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#pages').value = '';
        document.querySelector('#read').checked = false;
    }

    // Delete book
    static deleteBook(el) {
        if (el.classList.contains('remove')) {
            el.parentElement.parentElement.remove();
        }
        UI.updateTotalBooksCount();
    }

    // Counts books added 
    static updateTotalBooksCount() {
        const totalBooksCountElement = document.getElementById('totalBooks');
        const books = document.querySelectorAll('.books');
        totalBooksCountElement.textContent = `Total Books: ${books.length}`;
    }
}

// Store class for handling storage
class Store {
    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(title) {
        const books = Store.getBooks();
        books.forEach((book, index) => {
            if (book.title === title) {
                books.splice(index, 1);
            }
        });
        localStorage.setItem('books', JSON.stringify(books));
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
        Store.addBook(book);
        UI.clearFields();
    }
});

// Remove book
mainContent.addEventListener('click', (e) => {
    UI.deleteBook(e.target);
    Store.removeBook(e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.textContent);
});

// When + is clicked
add.addEventListener('click', (e) => {
    addForm.style.display = 'flex';
});

// Event listner when read button is clicked
read.addEventListener('click', (e) => {
    if (e.target.textContent === 'Read') {
        e.target.textContent = 'Unread';
    } else {
        e.target.textContent = 'Read';
    }
});

// Event listner when close button is clicked 
closeButton.addEventListener('click', (e) => {
    addForm.style.display = 'none';
    UI.clearFields();
});