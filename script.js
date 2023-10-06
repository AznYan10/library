// All elements
const mainContent = document.querySelector('.main-content');
const add = document.querySelector('.add');
const readBtn = document.querySelector('.read');
const books = document.querySelector('.books');
const removeBtns = document.querySelectorAll('.remove');
const addForm = document.querySelector('.add-form');
const addButton = document.querySelector('.add-button');
const closeButton = document.querySelector('.close-button');
const totalCompletedBooks = document.getElementById('totalCompletedBooks');

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
        UI.updateTotalCompletedBooksCount();
    }

    // Creating elements for books
    static addBookToLibrary(book, fromForm = false) {
        const books = Store.getBooks();
        
        // Checks if title already exist 
        if (fromForm && books.some(existingBook => existingBook.title === book.title)) {
            alert(`The Book title "${book.title}" already exist`);
            UI.deleteBook(book);
            return;
        }
                
        const bookContainer = document.createElement('div');
        bookContainer.classList = 'books';

        bookContainer.innerHTML = `
        <h3>Title: ${book.title}</h3>
        <h3>Author: ${book.author}</h3>
        <h3>Pages: ${book.pages}</h3>
        <div class="read-remove">
            <button class="remove">&#10006;</button>
            <div class="read">
                <span>Read</span>
                <label class="switch">
                    <input type="checkbox" class="readCheckbox">
                    <span class="slider round"></span>
                </label>
            </div>
        </div>
        `;

        mainContent.appendChild(bookContainer);

        const readBtn = bookContainer.querySelector('.read');
        const removeBtn = bookContainer.querySelector('.remove');

        readBtn.addEventListener('click', handleButtonClick);
        removeBtn.addEventListener('click', handleButtonClick);

        UI.updateTotalBooksCount();
        UI.updateTotalCompletedBooksCount();
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
        UI.updateTotalCompletedBooksCount();
    }

    // Counts books added 
    static updateTotalBooksCount() {
        const totalBooksCountElement = document.getElementById('totalBooks');
        const books = document.querySelectorAll('.books');
        totalBooksCountElement.textContent = `Total Books: ${books.length}`;
    }

    // Count total completed books 
    static updateTotalCompletedBooksCount() {
        const completedBooks = document.querySelectorAll('.read');
        
        let total = 0;
        completedBooks.forEach(book => {
            if (book.textContent === 'Read') {
                total++;
            }
        });

        totalCompletedBooks.textContent = `Total Completed Books: ${total}`;
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

    static readBook(title) {
        let books = Store.getBooks();
        books.forEach(book => {
            if (book.title === title) {
                book.read = !book.read;
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

    // Validate input for pages are numbers 
    if (!/^\d+$/.test(pages)) {
        alert('Please enter a valid number for');
        return;
    }

    // Validate if empty
    if (title === '' || author === '' || pages === '') {
        alert('Please fill in all fields');
    } else {
        // Instatiate book
        const book = new Book(title, author, pages, read);

        // Add book
        UI.addBookToLibrary(book, true);
        Store.addBook(book);
        UI.clearFields();
    }
});

// When + is clicked
add.addEventListener('click', (e) => {
    addForm.style.display = 'flex';
});

// Event listner when close button is clicked 
closeButton.addEventListener('click', (e) => {
    addForm.style.display = 'none';
    UI.clearFields();
});

// When read slider is clicked
const readSliders = document.querySelectorAll('.read .slider');
readSliders.forEach(slider => {
    slider.addEventListener('click', handleButtonClick);
});

// When remove button clicked 
removeBtns.forEach(removeBtn => {
    removeBtn.addEventListener('click', handleButtonClick);
});

// Function on when read or remove button is clicked
function handleButtonClick(e) {
    if (e.target.classList.contains('slider')) {
        const bookContainer = e.target.closest('.books');
        const readStatus = e.target.previousElementSibling.checked;

        if (readStatus) {
            totalCompletedBooks.textContent = `Total Completed Books: ${parseInt(totalCompletedBooks.textContent.split(': ')[1]) + 1}`;
        } else {
            totalCompletedBooks.textContent = `Total Completed Books: ${parseInt(totalCompletedBooks.textContent.split(': ')[1]) - 1}`;
        }
    } else if (e.target.classList.contains('remove')) {
        UI.deleteBook(e.target);
        Store.removeBook(e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.textContent);
        UI.updateTotalCompletedBooksCount();
    }
}