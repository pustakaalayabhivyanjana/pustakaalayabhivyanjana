document.addEventListener('DOMContentLoaded', () => {
    function fetchData(file) {
        return fetch(file)
            .then(response => response.json())
            .catch(error => console.error('Error fetching data:', error));
    }

    function getRandomItems(items, count) {
        const shuffled = items.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }

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

    const sections = [
        { type: 'books', file: '../json/books.json', listSelector: '.book-list' },
        { type: 'stories', file: '../json/stories.json', listSelector: '.stories-list' },
        { type: 'poems', file: '../json/poems.json', listSelector: '.poems-list' },
        { type: 'novels', file: '../json/novels.json', listSelector: '.novels-list' }
    ];

    sections.forEach(section => {
        const list = document.querySelector(section.listSelector);
        fetchData(section.file).then(items => {
            if (list) displayItems(list, getRandomItems(items, 4));
        });
    });

    window.redirectToBooksPage = function() {
        const searchQuery = document.getElementById('search-input').value;
        window.location.href = `html/search.html?search=${encodeURIComponent(searchQuery)}`;
    };

    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('nav ul');

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('show');
    });
});
