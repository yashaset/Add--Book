//book constrcutor
//UI constructor

function Book(title, author, isbn) {
    this.title = title
    this.author = author
    this.isbn = isbn
}
function Ui() { }
Ui.prototype.showAlert = function (msg, className) {
    const div = document.createElement('div')
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(msg));
    //get prent
    const container = document.querySelector('.container')
    const form = document.querySelector('#book-form')
    container.insertBefore(div, form);
    setTimeout(function () {
        document.querySelector('.alert').remove()
    }, 2000)
}
Ui.prototype.deleteBook = function (target) {
    if (target.className === 'delete') {
        target.parentElement.parentElement.remove()
    }
}
Ui.prototype.addBookToList = function (book) {
    const list = document.getElementById('book-list')
    //create a tr element
    const row = document.createElement('tr')
    //insert cols
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="" class="delete">X</a></td>
    `
    list.appendChild(row);
}

Ui.prototype.clearFields = function () {
    document.getElementById('title').value = "";
    document.getElementById('author').value = "";
    document.getElementById('isbn').value = "";
}
//event list
document.getElementById('book-form').addEventListener('submit', function (e) {
    const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value

    const book = new Book(title, author, isbn);
    const ui = new Ui();
    if (title === '' || author === '' || isbn === '') {
        ui.showAlert("Fill in all fields", 'error');

    } else {
        ui.addBookToList(book);
        ui.showAlert('Book Added', 'success')
        ui.clearFields();
    }
    //add book to list

    e.preventDefault();
})

//event listener for delete
document.getElementById('book-list').addEventListener('click', function (e) {
    ui.deleteBook(e.target);
    ui.showAlert('Book removed', 'success');
    e.preventDefault();
})