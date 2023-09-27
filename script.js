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
                read: checked,
            }
        ];
        const books = StoredBooks;
        books.forEach((book) => UI.addBookToLibrary(book));
    }
}

// Creating elements for books


// Creating book object
function addBook() {
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const pages = document.querySelector('#pages').value;
    const read = document.querySelector('#read').checked;
    // test
    console.log(title, author, pages, read);

    const newBook = new Book(title, author, pages, read);
    // myLibrary.push(newBook);

    const ui = new UI();
    console.log(ui);

    addForm.style.display = 'none';
    mainContent.style.display = 'grid';

    // Create elements to display the new book
    const bookContainer = document.createElement('div');
    bookContainer.classList.add('books');
    bookContainer.innerHTML = `
        <h3>Title: ${title}</h3>
        <h3>Author: ${author}</h3>
        <h3>Pages: ${pages}</h3>
        <div class="read-remove">
            <span class="read">${read ? 'Read' : 'Unread'}</span>
            <span class="remove">Remove</span>
        </div>
    `;

    mainContent.appendChild(bookContainer);
}

// When + is clicked
function formDisplay() {
    addForm.style.display = 'flex';
    mainContent.style.display = 'none';
}

// Event listners 
add.addEventListener('click', formDisplay);
addButton.addEventListener('submit', addBook());