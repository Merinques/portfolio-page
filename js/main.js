// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});



// Random Hero Text
document.addEventListener("DOMContentLoaded", () => {
    const heroText = document.getElementById("hero-text");

    function setAnimationDuration(textLength) {
        const baseSpeed = 100; // Milliseconds per character
        const duration = Math.max(10, textLength * baseSpeed / 1000); // Minimum of 10 seconds
        heroText.style.animationDuration = `${duration}s`;
    }

    // Function to load text from API
    function fetchTextFromApi() {
        fetch("https://catfact.ninja/fact")
            .then(response => response.json())
            .then(data => {
                const fact = data.fact;
                heroText.textContent = fact;
                setAnimationDuration(fact.length); // Set animation speed
            })
            .catch(() => fetchFromJson()); // Fallback to JSON if API fails
    }

    // Fallback function to load text from JSON
    function fetchFromJson() {
        fetch("texts.json")
            .then(response => response.json())
            .then(data => {
                const randomText = data[Math.floor(Math.random() * data.length)];
                heroText.textContent = randomText;
                setAnimationDuration(randomText.length); // Set animation speed
            })
            .catch(() => {
                heroText.textContent = "Welcome to my Webportfolio!";
                setAnimationDuration(heroText.textContent.length);
            });
    }

    fetchTextFromApi();
});

