let myLibrary = [];

class Book {
	constructor(title, author, pages, is_read) {
		this.title = `"${title}"`;
		this.author = author;
		this.pages = `${pages} pages`;
		this.is_read = is_read ? "Read" : "Not read";
	}

}

function addBookToLibrary() {
	let title = document.querySelector('#title').value;
	let author = document.querySelector('#author').value;
	let pages = document.querySelector('#pages').value;
	let completed = document.querySelector('#completed').checked;
	
	const myBook = new Book(title, author, pages, completed);
	myLibrary.push(myBook);
	createCard()
	
}

function createCard() {
	bookGrid.innerHTML = ""
	myLibrary.forEach((myBook, index) => {
		const bookCard = document.createElement('div');
		bookCard.classList.add('book-card');

		const title = document.createElement('p');
		title.textContent = myBook.title;
		const author = document.createElement('p');
		author.textContent = myBook.author;
		const pages = document.createElement('p');
		pages.textContent = myBook.pages;
		const is_read = document.createElement('button');
		is_read.textContent = myBook.is_read;
		// is_read.id = `is-read-${i}`;

		is_read.style.backgroundColor = myBook.is_read === "Read" ? "#8fe58c" : "#e58c8c";

		is_read.addEventListener('click', (e) => {
			myLibrary[index].is_read = myLibrary[index].is_read === "Read" ? "Not read" : "Read";
			is_read.textContent = is_read.textContent === "Read" ? "Not read" : "Read";
			is_read.style.backgroundColor = is_read.textContent === "Read" ? "#8fe58c" : "#e58c8c";
		})

		const remove = document.createElement('button');
		remove.textContent = "Remove";

		remove.addEventListener('click', (e) => {
			myLibrary.splice(index, 1);
			createCard()
		})

		bookCard.append(title, author, pages, is_read, remove);
		bookGrid.appendChild(bookCard);
	})
}


const modal = document.querySelector('#modal');
const bookGrid = document.querySelector('.book-card-grid');
const addBookBtn = document.querySelector('#add-book-btn');
const bookForm = document.querySelector('#book-form');
const readStatusBtn = document.querySelector('#is-read');


addBookBtn.addEventListener('click', (e) => {
	modal.showModal()
})

bookForm.addEventListener('submit', (e) => {
	e.preventDefault()
	addBookToLibrary()
	modal.close()
	bookForm.reset()
})


const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 300, false);
const theStranger = new Book("The Stranger", "Albert Camus", 130, true);
myLibrary.push(theHobbit);
myLibrary.push(theStranger);
createCard();