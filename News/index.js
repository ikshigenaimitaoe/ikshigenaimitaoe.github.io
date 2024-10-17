const API_KEY = '9f8baf3a07944695b041bfad57f2a601'; // Your NewsAPI key

async function fetchNews(category) {
    let query;

    switch (category) {
        case 'AI Applications':
            query = 'AI Applications OR "AI Ethics" OR "AI Research"';
            break;
        case 'Tesla':
            query = '"Tesla" OR "Self-Driving Cars" OR "Autonomous Vehicles"';
            break;
        case 'Robotics':
            query = '"Robotics" OR "Automation" OR "AI in Robotics"';
            break;
        case 'General AI':
            query = 'AI OR "Artificial Intelligence" OR "Machine Learning" OR "Deep Learning" OR "Natural Language Processing"';
            break;
        case 'Google AI':
            query = '"Google AI" OR "Google DeepMind"';
            break;
        case 'Meta AI':
            query = '"Meta AI" OR "Facebook AI"';
            break;
        case 'OpenAI':
            query = '"OpenAI"';
            break;
        default:
            query = '';
            break;
    }

    const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&language=en&sortBy=publishedAt&apiKey=${API_KEY}`;

    const newsContainer = document.getElementById('news-container');
    const fetchTimeContainer = document.getElementById('fetch-time');
    newsContainer.innerHTML = '<p>Loading news...</p>';

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.status === 'ok' && data.articles.length > 0) {
            newsContainer.innerHTML = ''; // Clear loading message
            const fetchTime = new Date().toLocaleTimeString(); // Get current time

            data.articles.forEach(article => {
                const imageUrl = article.urlToImage || 'https://via.placeholder.com/300';
                const title = article.title || 'Untitled';
                const description = article.description || 'No description available.';
                const sourceName = article.source?.name || 'Unknown Source';
                const publishedAt = new Date(article.publishedAt).toLocaleDateString() || 'Unknown Date';
                const articleUrl = article.url || '#';

                const card = document.createElement('div');
                card.className = 'card';

                card.innerHTML = `
                    <img src="${imageUrl}" alt="News Image">
                    <div class="card-content">
                        <h3><a href="${articleUrl}" target="_blank">${title}</a></h3>
                        <p><strong>Source:</strong> ${sourceName}</p>
                        <p><strong>Published:</strong> ${publishedAt}</p>
                        <p>${description}</p>
                    </div>
                `;

                newsContainer.appendChild(card);
            });

            fetchTimeContainer.innerText = `Last fetched at: ${fetchTime}`; // Display fetch time
        } else {
            newsContainer.innerHTML = '<p>No news found.</p>';
        }
    } catch (error) {
        console.error('Error fetching news:', error);
        newsContainer.innerHTML = '<p>Failed to load news. Please try again later.</p>';
    }
}

function searchNews() {
    const query = document.getElementById('searchInput').value.trim();
    if (query) {
        const searchContainer = document.querySelector('.container');
        searchContainer.innerHTML = `<h1>Search Results for "${query}"</h1><div id="news-container" class="news-container"><p>Loading search results...</p></div><div id="fetch-time" class="fetch-time"></div>`;
        fetchNews(query);
    }
}

// Initial fetch for the default category
fetchNews('AI Applications');
