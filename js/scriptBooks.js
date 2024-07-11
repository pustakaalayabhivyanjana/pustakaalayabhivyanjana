document.addEventListener('DOMContentLoaded', () => {
    const books = [
        { title: 'Book One', author: 'Author One', image: 'https://via.placeholder.com/200x300', pdf: '#' },
        { title: 'Book Two', author: 'Author Two', image: 'https://via.placeholder.com/200x300', pdf: '#' },
        { title: 'Book Three', author: 'Author Three', image: 'https://via.placeholder.com/200x300', pdf: '#' },
        { title: 'Book Four', author: 'Author Four', image: 'https://via.placeholder.com/200x300', pdf: '#' }
    ];

    const bookList = document.querySelector('.book-list');

    function displayBooks(filteredBooks) {
        bookList.innerHTML = '';
        filteredBooks.forEach(book => {
            const bookItem = document.createElement('div');
            bookItem.classList.add('book');
            
            bookItem.innerHTML = `
                <img src="${book.image}" alt="${book.title}">
                <div class="book-content">
                    <h3>${book.title}</h3>
                    <p>by ${book.author}</p>
                    <a href="${book.pdf}" target="_blank">Download PDF</a>
                </div>
            `;
            
            bookList.appendChild(bookItem);
        });
    }

    displayBooks(books); // Display all books initially

    window.searchBooks = function() {
        const query = document.getElementById('search-input').value.toLowerCase();
        const filteredBooks = books.filter(book => book.title.toLowerCase().includes(query));
        displayBooks(filteredBooks);
    };
});
