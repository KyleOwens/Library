let library = JSON.parse(localStorage.getItem('library'));
if(library === null){library = [];}

const newBookButton = document.querySelector(".newbook");
const modal = document.querySelector(".modal");
const modalClose = document.querySelector('.close');
const modalSubmit = document.querySelector('.form');
const modalTitle = document.querySelector('#title');
const modalAuthor = document.querySelector('#author');
const modalPages = document.querySelector('#pageno');
const modalRead = document.querySelector('#haveread');
const bookTable = document.querySelector('table');
const instructions = document.querySelector('#instructions');

newBookButton.addEventListener('click', openModal);
modalClose.addEventListener('click', closeModal);
modalSubmit.addEventListener('submit', modalSubmitForm);

checkInstructions();

if (library.length !== 0) {fillLibrary()};

function openModal(e){
    modal.style.display = "block";
}

function closeModal(){
    modal.style.display = "none";
    modalSubmit.reset();
}

function modalSubmitForm(e){
    e.preventDefault();
    addNewBook();
    closeModal();
}

function addNewBook(){
    library.push(new Book(modalTitle.value, modalAuthor.value, modalPages.value, modalRead.checked))
    localStorage.setItem('library', JSON.stringify(library));
    appendNewBook(library[library.length-1]);
}

function appendNewBook(newBook){
    const newRow = document.createElement('tr');
    const newTitle = document.createElement('td');
    const newAuthor = document.createElement('td');
    const newPages = document.createElement('td');
    const newReadContainer = document.createElement('td');
    const newRead = document.createElement('input');
    const newButtonContainer = document.createElement('td');
    const newButton = document.createElement('button');

    newRead.type = 'checkbox';
    newRead.addEventListener('change', function(){
        updateReadStatus(newBook);
    });
    newButton.classList.add('removebutton');
    newButton.addEventListener('click', function(e){
        removeBook(newBook, e);
    });
    
    newTitle.textContent = newBook.title;
    newAuthor.textContent = newBook.author;
    newPages.textContent = newBook.pages;
    newRead.checked = newBook.read;
    newButton.innerHTML = '&times;';
    
    newRow.appendChild(newTitle);
    newRow.appendChild(newAuthor);
    newRow.appendChild(newPages);
    newRow.appendChild(newReadContainer);
    newReadContainer.appendChild(newRead);
    newRow.appendChild(newButtonContainer);
    newButtonContainer.appendChild(newButton);
    bookTable.appendChild(newRow);

    checkInstructions();
}

function updateReadStatus(book){
    book.read = !book.read;
}

function removeBook(book, e){
    library.splice(library.indexOf(book), 1);
    localStorage.setItem('library', JSON.stringify(library));
    removeRow(e);
}

function removeRow(e){
    const row = e.target.parentElement.parentElement;
    bookTable.removeChild(row);
    checkInstructions();
}

function fillLibrary(){
    console.log(library);
    library.forEach(book => {
        appendNewBook(book);
    });
}

function checkInstructions(){
    library.length === 0 ? instructions.style.display = 'block' : instructions.style.display = 'none';
}

function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}