function Book (title, author, pages, read) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
}

Book.prototype.info = function() {
	return (`${title} by ${author}, ${pages} pages, ${read ? 'read' : 'no read yet'}`);
}


function addBookToLibrary(title, author, pages, read) {
	const book = new Book(title, author, pages, read)
	myLibrary.push(book);
}

function toggleBookStatus(e) {
	const index = e.target.parentNode.getAttribute("data-index");
	const status = e.target.parentNode.querySelector(".book-status").textContent == "Read" ? true : false;
	myLibrary[index].read = !status;
	displayBook();
}

function saveBook() {
	const title = document.querySelector("#input-title").value;
	const author = document.querySelector("#input-author").value;
	const pages = parseInt(document.querySelector("#input-pages").value);
	const status = document.querySelector("#input-status").value == "true" ? true : false;
	addBookToLibrary(title, author, pages, status);
}

function removeBook(e) {
	const index = e.target.parentNode.getAttribute("data-index");
	delete myLibrary[index];
	displayBook();
}

const books = document.querySelector("#books");
const bookTemplate = document.querySelector(".book.template");
function displayBook() {
	books.textContent = '';
	for (let i = 0; i < myLibrary.length; i++) {
		const book = myLibrary[i];
		if (book != undefined) {
			var tmp = bookTemplate.cloneNode(true);
			tmp.classList.remove("template");
			tmp.querySelector(".book-title").textContent = `Title: ${book.title}`;
			tmp.querySelector(".book-author").textContent = `Author: ${book.author}`;
			tmp.querySelector(".book-pages").textContent = `${book.pages} Pages`;
			tmp.querySelector(".book-status").textContent = book.read ? 'Read' : 'Not Read';
			tmp.querySelector(".book-status").addEventListener("click", toggleBookStatus);
			tmp.querySelector(".book-remove").addEventListener("click", removeBook);
			tmp.setAttribute("data-index", i);
			books.append(tmp);
		}
	}
}

const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
	saveBook();
	displayBook();
	e.preventDefault();
});

const newBookButton = document.querySelector("#new-book");
newBookButton.addEventListener("click", (e) => {
	if (form.style.display == "none") {
		form.style.display = "block";
		newBookButton.textContent = "Close";
	}
	else {
		form.style.display = "none";
		newBookButton.textContent = "New Book";
	}
});

let myLibrary = [];
addBookToLibrary("Harry Potter", "J.K. Rowling", 624, false);
displayBook();
