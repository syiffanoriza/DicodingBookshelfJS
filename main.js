let books = [];

function addBook(id = null) {
    document.getElementById('bookModal').style.display = 'flex';
    document.getElementById('bookForm').addEventListener('submit', () => {
        const book = {
            id: id || +new Date,
            title: document.getElementById('bookFormTitle').value,
            author: document.getElementById('bookFormAuthor').value,
            year: document.getElementById('bookFormYear').value,
            finished: document.getElementById('bookFormProgress').checked
        };

        if (id) {
            const index = books.findIndex((b) => b.id === id);
            if (index !== -1) {
                books[index] = book;
            }
        } else {
            books.push(book);
        }

        localStorage.setItem('books', JSON.stringify(books));
    });

    if (id) {
        const existingBook = books.find((b) => b.id === id);
        if (existingBook) {
            document.getElementById('bookFormTitle').value = existingBook.title;
            document.getElementById('bookFormAuthor').value = existingBook.author;
            document.getElementById('bookFormYear').value = existingBook.year;
            document.getElementById('bookFormProgress').checked = existingBook.finished;
        }
    } else {
        document.getElementById('bookForm').reset();
    }

    document.querySelector('#bookModal h2').innerText = id ? 'Edit Buku' : 'Tambah Buku Baru';
    document.getElementById('bookFormSubmit').innerText = id ? 'Edit Buku' : 'Tambah Buku';
}

function toggleBookFormOff() {
    document.getElementById('bookModal').style.display = 'none';
    document.getElementById('bookForm').reset();
}

function bookMarkFinished(id) {
    const index = books.findIndex((b) => {
        return b.id === id;
    });
    if (-1 !== index) {
        books[index] = {
            ...books[index],
            finished: true
        };
        localStorage.setItem('books', JSON.stringify(books));
        document.location.reload()
    }
}

function bookMarkUnfinished(id) {
    const index = books.findIndex((b) => {
        return b.id === id;
    });
    if (-1 !== index) {
        books[index] = {
            ...books[index],
            finished: false
        };
        localStorage.setItem('books', JSON.stringify(books));
        document.location.reload();
    };
}

function removeBook(id) {
    const index = books.findIndex((b) => {
        return b.id === id;
    });
    if (-1 !== index) {
        books.splice(index, 1);
    };
    localStorage.setItem('books', JSON.stringify(books));
    document.location.reload();
}

function loadShelves(books) {
    for (const book of books) {
        const bookItem = document.createElement('div');
        bookItem.classList.add('book');
        bookItem.setAttribute('data-bookid', book.id);
        bookItem.setAttribute('data-testid', 'bookItem');
        const bookData = document.createElement('span');
        const bookTitle = document.createElement('h3');
        bookTitle.setAttribute('data-testid', 'bookItemTitle')
        bookTitle.innerText = book.title;
        const bookAuthor = document.createElement('p');
        bookAuthor.setAttribute('data-testid', 'bookItemAuthor')
        bookAuthor.innerText = book.author;
        const bookYear = document.createElement('p');
        bookYear.setAttribute('data-testid', 'bookItemYear')
        bookYear.innerText = book.year;
        bookData.appendChild(bookTitle);
        bookData.appendChild(bookAuthor);
        bookData.appendChild(bookYear);
        bookItem.appendChild(bookData);
        if (book.finished) {
            const bookActions = document.createElement('span');
            bookActions.setAttribute('class', 'btnWrapper')
            const bookUnfinished = document.createElement('button');
            bookUnfinished.setAttribute('data-testid', 'bookItemIsCompleteButton');
            bookUnfinished.addEventListener('click', () => bookMarkUnfinished(book.id));
            bookUnfinished.innerHTML = `
                <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 1.25C6.072 1.25 1.25 6.073 1.25 12C1.25 17.927 6.072 22.75 12 22.75C17.928 22.75 22.75 17.927 22.75 12C22.75 6.073 17.928 1.25 12 1.25ZM12 21.25C6.899 21.25 2.75 17.101 2.75 12C2.75 6.899 6.899 2.75 12 2.75C17.101 2.75 21.25 6.899 21.25 12C21.25 17.101 17.101 21.25 12 21.25ZM15.53 9.53003L13.06 12L15.53 14.47C15.823 14.763 15.823 15.238 15.53 15.531C15.384 15.677 15.192 15.751 15 15.751C14.808 15.751 14.616 15.678 14.47 15.531L12 13.061L9.53 15.531C9.384 15.677 9.192 15.751 9 15.751C8.808 15.751 8.616 15.678 8.47 15.531C8.177 15.238 8.177 14.763 8.47 14.47L10.94 12L8.47 9.53003C8.177 9.23703 8.177 8.76199 8.47 8.46899C8.763 8.17599 9.23801 8.17599 9.53101 8.46899L12.001 10.939L14.471 8.46899C14.764 8.17599 15.239 8.17599 15.532 8.46899C15.823 8.76199 15.823 9.23803 15.53 9.53003Z"/>
                </svg>
            `;
            const bookDelete = document.createElement('button');
            bookDelete.setAttribute('data-testid', 'bookItemDeleteButton');
            bookDelete.addEventListener('click', () => removeBook(book.id));
            bookDelete.innerHTML = `
                <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 5.25H17.441C16.54 5.25 16.502 5.136 16.255 4.396L16.053 3.789C15.746 2.869 14.889 2.25 13.919 2.25H10.081C9.11099 2.25 8.253 2.868 7.947 3.789L7.745 4.396C7.498 5.137 7.46 5.25 6.559 5.25H3C2.586 5.25 2.25 5.586 2.25 6C2.25 6.414 2.586 6.75 3 6.75H4.298L5.065 18.249C5.213 20.474 6.57701 21.75 8.80701 21.75H15.194C17.423 21.75 18.787 20.474 18.936 18.249L19.703 6.75H21C21.414 6.75 21.75 6.414 21.75 6C21.75 5.586 21.414 5.25 21 5.25ZM9.37 4.263C9.473 3.956 9.75799 3.75 10.081 3.75H13.919C14.242 3.75 14.528 3.956 14.63 4.263L14.832 4.87C14.876 5.001 14.92 5.128 14.968 5.25H9.03C9.078 5.127 9.12301 5 9.16701 4.87L9.37 4.263ZM17.438 18.149C17.343 19.582 16.629 20.25 15.193 20.25H8.806C7.37 20.25 6.657 19.583 6.561 18.149L5.801 6.75H6.558C6.683 6.75 6.787 6.737 6.899 6.729C6.933 6.734 6.964 6.75 6.999 6.75H16.999C17.035 6.75 17.065 6.734 17.099 6.729C17.211 6.737 17.315 6.75 17.44 6.75H18.197L17.438 18.149ZM14.75 11V16C14.75 16.414 14.414 16.75 14 16.75C13.586 16.75 13.25 16.414 13.25 16V11C13.25 10.586 13.586 10.25 14 10.25C14.414 10.25 14.75 10.586 14.75 11ZM10.75 11V16C10.75 16.414 10.414 16.75 10 16.75C9.586 16.75 9.25 16.414 9.25 16V11C9.25 10.586 9.586 10.25 10 10.25C10.414 10.25 10.75 10.586 10.75 11Z"/>
                </svg>
            `;
            const bookEdit = document.createElement('button');
            bookEdit.setAttribute('data-testid', 'bookItemEditButton');
            bookEdit.addEventListener('click', () => addBook(book.id));
            bookEdit.innerHTML = `
                <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 21.7502H6C3.582 21.7502 2.25 20.4182 2.25 18.0002V8.00022C2.25 5.58222 3.582 4.25022 6 4.25022H9C9.414 4.25022 9.75 4.58622 9.75 5.00022C9.75 5.41422 9.414 5.75022 9 5.75022H6C4.423 5.75022 3.75 6.42322 3.75 8.00022V18.0002C3.75 19.5772 4.423 20.2502 6 20.2502H16C17.577 20.2502 18.25 19.5772 18.25 18.0002V15.0002C18.25 14.5862 18.586 14.2502 19 14.2502C19.414 14.2502 19.75 14.5862 19.75 15.0002V18.0002C19.75 20.4182 18.418 21.7502 16 21.7502ZM20.58 5.03022L18.97 3.42023C18.4 2.86023 17.49 2.86021 16.92 3.43021L15.57 4.79023L19.21 8.43021L20.57 7.08021C21.14 6.51021 21.14 5.60022 20.58 5.03022ZM14.51 5.85023L8 12.3902V16.0002H11.61L18.15 9.49021L14.51 5.85023Z"/>
                </svg>  
            `;
            bookActions.appendChild(bookUnfinished);
            bookActions.appendChild(bookDelete);
            bookActions.appendChild(bookEdit);
            bookItem.appendChild(bookActions);
            document.getElementById('incompleteBookList')
                .appendChild(bookItem);
            document.getElementById('completeBookList')
                .appendChild(bookItem);
        } else {
            const bookActions = document.createElement('span');
            bookActions.setAttribute('class', 'btnWrapper')
            const bookFinished = document.createElement('button');
            bookFinished.setAttribute('data-testid', 'bookItemIsCompleteButton');
            bookFinished.addEventListener('click', () => bookMarkFinished(book.id));
            bookFinished.innerHTML = `
                <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 1.25C6.072 1.25 1.25 6.073 1.25 12C1.25 17.927 6.072 22.75 12 22.75C17.928 22.75 22.75 17.927 22.75 12C22.75 6.073 17.928 1.25 12 1.25ZM12 21.25C6.899 21.25 2.75 17.101 2.75 12C2.75 6.899 6.899 2.75 12 2.75C17.101 2.75 21.25 6.899 21.25 12C21.25 17.101 17.101 21.25 12 21.25ZM16.03 9.13599C16.323 9.42899 16.323 9.90402 16.03 10.197L11.363 14.864C11.217 15.01 11.025 15.084 10.833 15.084C10.641 15.084 10.449 15.011 10.303 14.864L7.97 12.531C7.677 12.238 7.677 11.763 7.97 11.47C8.263 11.177 8.73801 11.177 9.03101 11.47L10.834 13.273L14.97 9.13702C15.263 8.84402 15.737 8.84399 16.03 9.13599Z"/>
                </svg>
            `;
            const bookDelete = document.createElement('button');
            bookDelete.setAttribute('data-testid', 'bookItemDeleteButton');
            bookDelete.addEventListener('click', () => removeBook(book.id));
            bookDelete.innerHTML = `
                <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 5.25H17.441C16.54 5.25 16.502 5.136 16.255 4.396L16.053 3.789C15.746 2.869 14.889 2.25 13.919 2.25H10.081C9.11099 2.25 8.253 2.868 7.947 3.789L7.745 4.396C7.498 5.137 7.46 5.25 6.559 5.25H3C2.586 5.25 2.25 5.586 2.25 6C2.25 6.414 2.586 6.75 3 6.75H4.298L5.065 18.249C5.213 20.474 6.57701 21.75 8.80701 21.75H15.194C17.423 21.75 18.787 20.474 18.936 18.249L19.703 6.75H21C21.414 6.75 21.75 6.414 21.75 6C21.75 5.586 21.414 5.25 21 5.25ZM9.37 4.263C9.473 3.956 9.75799 3.75 10.081 3.75H13.919C14.242 3.75 14.528 3.956 14.63 4.263L14.832 4.87C14.876 5.001 14.92 5.128 14.968 5.25H9.03C9.078 5.127 9.12301 5 9.16701 4.87L9.37 4.263ZM17.438 18.149C17.343 19.582 16.629 20.25 15.193 20.25H8.806C7.37 20.25 6.657 19.583 6.561 18.149L5.801 6.75H6.558C6.683 6.75 6.787 6.737 6.899 6.729C6.933 6.734 6.964 6.75 6.999 6.75H16.999C17.035 6.75 17.065 6.734 17.099 6.729C17.211 6.737 17.315 6.75 17.44 6.75H18.197L17.438 18.149ZM14.75 11V16C14.75 16.414 14.414 16.75 14 16.75C13.586 16.75 13.25 16.414 13.25 16V11C13.25 10.586 13.586 10.25 14 10.25C14.414 10.25 14.75 10.586 14.75 11ZM10.75 11V16C10.75 16.414 10.414 16.75 10 16.75C9.586 16.75 9.25 16.414 9.25 16V11C9.25 10.586 9.586 10.25 10 10.25C10.414 10.25 10.75 10.586 10.75 11Z"/>
                </svg>
            `;
            const bookEdit = document.createElement('button');
            bookEdit.setAttribute('data-testid', 'bookItemEditButton');
            bookEdit.addEventListener('click', () => addBook(book.id));
            bookEdit.innerHTML = `
                <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 21.7502H6C3.582 21.7502 2.25 20.4182 2.25 18.0002V8.00022C2.25 5.58222 3.582 4.25022 6 4.25022H9C9.414 4.25022 9.75 4.58622 9.75 5.00022C9.75 5.41422 9.414 5.75022 9 5.75022H6C4.423 5.75022 3.75 6.42322 3.75 8.00022V18.0002C3.75 19.5772 4.423 20.2502 6 20.2502H16C17.577 20.2502 18.25 19.5772 18.25 18.0002V15.0002C18.25 14.5862 18.586 14.2502 19 14.2502C19.414 14.2502 19.75 14.5862 19.75 15.0002V18.0002C19.75 20.4182 18.418 21.7502 16 21.7502ZM20.58 5.03022L18.97 3.42023C18.4 2.86023 17.49 2.86021 16.92 3.43021L15.57 4.79023L19.21 8.43021L20.57 7.08021C21.14 6.51021 21.14 5.60022 20.58 5.03022ZM14.51 5.85023L8 12.3902V16.0002H11.61L18.15 9.49021L14.51 5.85023Z"/>
                </svg>  
            `;
            bookActions.appendChild(bookFinished);
            bookActions.appendChild(bookDelete);
            bookActions.appendChild(bookEdit);
            bookItem.appendChild(bookActions);
            document.getElementById('incompleteBookList')
                .appendChild(bookItem);
        }
    }
}

window.addEventListener('load', function () {
    books = JSON.parse(localStorage.getItem('books')) || [],
        loadShelves(books);
})