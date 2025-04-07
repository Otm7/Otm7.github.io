/*!
* Start Bootstrap - Othman DOHO v7.0.7 ()
* Copyright 2013-2025 undefined
* Licensed under undefined (https://github.com/StartBootstrap/Othman DOHO/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});


document.addEventListener('DOMContentLoaded', () => {
    // List of RSS Feed URLs
    const rssUrls = [
        'https://techcrunch.com/feed/',
        'https://www.theverge.com/rss/index.xml'
    ];

    const rssContainer = document.getElementById('rss-feed-container');

    const containsAIContent = (title, description) => {
        const aiKeywords = ['AI', 'Artificial Intelligence', 'Machine Learning', 'Deep Learning', 'Neural Networks'];
        return aiKeywords.some(keyword => title.includes(keyword) || description.includes(keyword));
    };

    const fetchAndDisplayRSS = (url) => {
        fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(url)}`)
            .then(response => response.json())
            .then(data => {
                if (data.items && data.items.length > 0) {
                    data.items.forEach(item => {
                        // Check if the article contains AI-related content
                        if (containsAIContent(item.title, item.description)) {
                            const article = document.createElement('div');
                            article.className = 'rss-article mb-4';
                            article.innerHTML = `
                                <h4><a href="${item.link}" target="_blank">${item.title}</a></h4>
                                <p>${item.description}</p>
                            `;
                            rssContainer.appendChild(article);
                        }
                    });
                } else {
                    rssContainer.innerHTML = '<p class="text-center text-muted">No AI articles found.</p>';
                }
            })
            .catch(error => {
                console.error('Error fetching RSS feed:', error);
                rssContainer.innerHTML = '<p class="text-center text-danger">Failed to load articles.</p>';
            });
    };

    // Fetch and display RSS content for all URLs
    rssUrls.forEach(url => fetchAndDisplayRSS(url));
});
