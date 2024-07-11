document.addEventListener('DOMContentLoaded', () => {
    const searchParams = new URLSearchParams(window.location.search);
    const searchQuery = searchParams.get('search').toLowerCase();
    const resultCount = document.getElementById('result-count');
    const searchList = document.querySelector('.search-list');

    function fetchData(file) {
        return fetch(file)
            .then(response => response.json())
            .catch(error => console.error('Error fetching data:', error));
    }

    function displayResults(items) {
        searchList.innerHTML = '';
        let results = items.filter(item =>
            item.title.toLowerCase().includes(searchQuery) ||
            item.author.toLowerCase().includes(searchQuery)
        );

        resultCount.textContent = `परिणाम: ${results.length}`;

        if (results.length > 0) {
            results.forEach(item => {
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
                
                searchList.appendChild(itemElement);
            });
        } else {
            searchList.innerHTML = '<p>कोई परिणाम नहीं मिला।</p>';
        }
    }

    const files = [
        '../json/books.json',
        '../json/stories.json',
        '../json/poems.json',
        '../json/novels.json'
    ];

    Promise.all(files.map(fetchData))
        .then(dataArrays => dataArrays.flat())
        .then(displayResults);
});
