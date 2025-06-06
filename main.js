// Sample anime data (in a real application, this would come from an API)
const animeData = [
    {
        id: 1,
        title: "Attack on Titan",
        image: "images/anime1.jpg",
        rating: 9.5,
        genre: ["Action", "Drama", "Fantasy"],
        year: 2023
    },
    {
        id: 2,
        title: "Demon Slayer",
        image: "images/anime2.jpg",
        rating: 9.3,
        genre: ["Action", "Fantasy", "Historical"],
        year: 2023
    },
    {
        id: 3,
        title: "Jujutsu Kaisen",
        image: "images/anime3.jpg",
        rating: 9.4,
        genre: ["Action", "Fantasy", "Supernatural"],
        year: 2023
    },
    // Add more anime data as needed
];

// DOM Elements
const animeGrid = document.querySelector('.anime-grid');
const animeSlider = document.querySelector('.anime-slider');
const loginBtn = document.querySelector('.login-btn');
const signupBtn = document.querySelector('.signup-btn');
const loginModal = document.getElementById('loginModal');
const signupModal = document.getElementById('signupModal');
const closeBtns = document.querySelectorAll('.close');
const switchToSignup = document.querySelector('.switch-to-signup');
const switchToLogin = document.querySelector('.switch-to-login');

// Create anime card
function createAnimeCard(anime) {
    const card = document.createElement('div');
    card.className = 'anime-card';
    card.innerHTML = `
        <div class="anime-image">
            <img src="${anime.image}" alt="${anime.title}">
            <div class="anime-overlay">
                <div class="anime-info">
                    <h3>${anime.title}</h3>
                    <div class="anime-meta">
                        <span class="rating"><i class="fas fa-star"></i> ${anime.rating}</span>
                        <span class="year">${anime.year}</span>
                    </div>
                    <div class="anime-genres">
                        ${anime.genre.map(g => `<span class="genre-tag">${g}</span>`).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;
    return card;
}

// Populate anime grid
function populateAnimeGrid() {
    animeData.forEach(anime => {
        const card = createAnimeCard(anime);
        animeGrid.appendChild(card);
    });
}

// Populate new releases slider
function populateNewReleases() {
    const currentYear = new Date().getFullYear();
    const newReleases = animeData.filter(anime => anime.year === currentYear);
    newReleases.forEach(anime => {
        const card = createAnimeCard(anime);
        animeSlider.appendChild(card);
    });
}

// Modal functionality
function openModal(modal) {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Event Listeners
loginBtn.addEventListener('click', () => openModal(loginModal));
signupBtn.addEventListener('click', () => openModal(signupModal));

closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        closeModal(loginModal);
        closeModal(signupModal);
    });
});

switchToSignup.addEventListener('click', (e) => {
    e.preventDefault();
    closeModal(loginModal);
    openModal(signupModal);
});

switchToLogin.addEventListener('click', (e) => {
    e.preventDefault();
    closeModal(signupModal);
    openModal(loginModal);
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === loginModal) {
        closeModal(loginModal);
    }
    if (e.target === signupModal) {
        closeModal(signupModal);
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Search functionality
const searchInput = document.querySelector('.nav-search input');
const searchButton = document.querySelector('.nav-search button');

function performSearch() {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredAnime = animeData.filter(anime => 
        anime.title.toLowerCase().includes(searchTerm) ||
        anime.genre.some(g => g.toLowerCase().includes(searchTerm))
    );
    
    // Clear and repopulate grid with filtered results
    animeGrid.innerHTML = '';
    filteredAnime.forEach(anime => {
        const card = createAnimeCard(anime);
        animeGrid.appendChild(card);
    });
}

searchButton.addEventListener('click', performSearch);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        performSearch();
    }
});

// Event listener for genre cards
const genreCards = document.querySelectorAll('.genre-card');
genreCards.forEach(card => {
    card.addEventListener('click', () => {
        const genre = card.getAttribute('data-genre');
        const filteredAnime = animeData.filter(anime => anime.genre.includes(genre));
        animeGrid.innerHTML = '';
        filteredAnime.forEach(anime => {
            const card = createAnimeCard(anime);
            animeGrid.appendChild(card);
        });
    });
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    populateAnimeGrid();
    populateNewReleases();
    initAnimations();
    
    // Add animation classes to elements when they come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.anime-card, .genre-card, .section-title').forEach(el => {
        observer.observe(el);
    });
});

// Advanced Search Filters
function advancedSearch(filters) {
    const { year, rating, genre } = filters;
    return animeData.filter(anime => {
        const matchesYear = year ? anime.year === year : true;
        const matchesRating = rating ? anime.rating >= rating : true;
        const matchesGenre = genre ? anime.genre.includes(genre) : true;
        return matchesYear && matchesRating && matchesGenre;
    });
}

// Recommendation System (Mockup)
function recommendAnime(userHistory) {
    // Mockup logic for recommendations based on user history
    return animeData.filter(anime => userHistory.genres.some(genre => anime.genre.includes(genre)));
}

// Real-time Notifications (Mockup)
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerText = message;
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Example usage of new functions
const searchFilters = { year: 2023, rating: 9.0, genre: 'Action' };
const filteredAnime = advancedSearch(searchFilters);
console.log('Filtered Anime:', filteredAnime);

const userHistory = { genres: ['Action', 'Fantasy'] };
const recommendations = recommendAnime(userHistory);
console.log('Recommended Anime:', recommendations);

showNotification('New anime added to your watchlist!');

// Initialize Rellax for parallax effect
const rellax = new Rellax('.rellax');

// GSAP Animations
function initAnimations() {
    gsap.from('.hero-content h1', { duration: 1, y: -50, opacity: 0, ease: 'bounce' });
    gsap.from('.hero-content p', { duration: 1, y: 50, opacity: 0, delay: 0.5 });
    gsap.from('.cta-btn', { duration: 1, scale: 0.5, opacity: 0, delay: 1 });
    gsap.from('.anime-card', {
        scrollTrigger: '.anime-card',
        duration: 1,
        opacity: 0,
        y: 100,
        stagger: 0.2
    });
} 