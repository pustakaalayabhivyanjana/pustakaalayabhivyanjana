document.addEventListener('DOMContentLoaded', () => {
    const booksList = document.querySelector('.books-list');
    const searchInput = document.getElementById('search-input');

    fetch('../json/books.json')
        .then(response => response.json())
        .then(books => {
            displayItems(booksList, books);

            window.searchBooks = function() {
                const searchQuery = searchInput.value.toLowerCase();
                const filteredBooks = books.filter(book =>
                    book.title.toLowerCase().includes(searchQuery) ||
                    book.author.toLowerCase().includes(searchQuery)
                );
                displayItems(booksList, filteredBooks);
            };
        })
        .catch(error => console.error('Error fetching books:', error));

    function displayItems(list, items) {
        list.innerHTML = '';
        items.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('item');
            
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <div class="item-content">
                    <h3>${item.title}</h3>
                    <p>द्वारा ${item.author}</p>
                    <a href="${item.pdf}" target="_blank">PDF डाउनलोड करें</a>
                </div>
            `;
            
            list.appendChild(itemElement);
        });
    }
});
