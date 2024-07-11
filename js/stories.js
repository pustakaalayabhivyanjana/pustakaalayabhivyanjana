document.addEventListener('DOMContentLoaded', () => {
    const storiesList = document.querySelector('.stories-list');
    const searchInput = document.getElementById('search-input');

    fetch('../json/stories.json')
        .then(response => response.json())
        .then(stories => {
            displayItems(storiesList, stories);

            window.searchStories = function() {
                const searchQuery = searchInput.value.toLowerCase();
                const filteredStories = stories.filter(story =>
                    story.title.toLowerCase().includes(searchQuery) ||
                    story.author.toLowerCase().includes(searchQuery)
                );
                displayItems(storiesList, filteredStories);
            };
        })
        .catch(error => console.error('Error fetching stories:', error));

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
