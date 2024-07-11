document.addEventListener('DOMContentLoaded', () => {
    const poemsList = document.querySelector('.poems-list');
    const searchInput = document.getElementById('search-input');

    fetch('../json/poems.json')
        .then(response => response.json())
        .then(poems => {
            displayItems(poemsList, poems);

            window.searchPoems = function() {
                const searchQuery = searchInput.value.toLowerCase();
                const filteredPoems = poems.filter(poem =>
                    poem.title.toLowerCase().includes(searchQuery) ||
                    poem.author.toLowerCase().includes(searchQuery)
                );
                displayItems(poemsList, filteredPoems);
            };
        })
        .catch(error => console.error('Error fetching poems:', error));

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
