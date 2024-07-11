document.addEventListener('DOMContentLoaded', () => {
    const novelsList = document.querySelector('.novels-list');
    const searchInput = document.getElementById('search-input');

    fetch('../json/novels.json')
        .then(response => response.json())
        .then(novels => {
            displayItems(novelsList, novels);

            window.searchNovels = function() {
                const searchQuery = searchInput.value.toLowerCase();
                const filteredNovels = novels.filter(novel =>
                    novel.title.toLowerCase().includes(searchQuery) ||
                    novel.author.toLowerCase().includes(searchQuery)
                );
                displayItems(novelsList, filteredNovels);
            };
        })
        .catch(error => console.error('Error fetching novels:', error));

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
