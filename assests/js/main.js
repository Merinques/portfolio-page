// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// particle.js
document.addEventListener("DOMContentLoaded", () => {
    particlesJS("particles-js", {
        particles: {
            number: { value: 100, density: { enable: true, value_area: 800 } },
            color: { value: "#007BFF" },
            shape: { type: "circle" },
            opacity: { value: 0.5 },
            size: { value: 3, random: true },
            line_linked: { enable: true, distance: 150, color: "#007BFF", opacity: 0.5, width: 1 },
            move: { enable: true, speed: 3 }
        },
        interactivity: {
            events: {
                onhover: { enable: true, mode: "repulse" },
                onclick: { enable: true, mode: "push" }
            }
        },
        retina_detect: true
    });
});

// Dynamic Text
document.addEventListener("DOMContentLoaded", () => {
    const textArray = [
        "Welcome to my portfolio!",
        "Exploring the intersection of business and technology.",
        "Glad to have you here!",
        "Hello and welcome!",
        "Hi, thanks for stopping by!",
        "Greetings and welcome to my portfolio website!"
    ];

    const typewriterElement = document.getElementById("typewriter");
    const typingSpeed = 100; 
    const eraseSpeed = 50; 
    const pauseBetweenTexts = 2000; 

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const currentText = textArray[textIndex];
        
        if (!isDeleting) {
            // Typing Effect
            typewriterElement.textContent = currentText.slice(0, charIndex++);
            if (charIndex > currentText.length) {
                isDeleting = true;
                setTimeout(typeEffect, pauseBetweenTexts); // Pause before erasing
            } else {
                setTimeout(typeEffect, typingSpeed);
            }
        } else {
            // Erasing Effect
            typewriterElement.textContent = currentText.slice(0, charIndex--);
            if (charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % textArray.length; // Move to next text
                setTimeout(typeEffect, 50); // Slight delay to restart typing
            } else {
                setTimeout(typeEffect, eraseSpeed);
            }
        }
    }

    typeEffect();
});

// Skills Button and Toggle
document.addEventListener("DOMContentLoaded", () => {
    const toggleTech = document.getElementById("toggle-tech");
    const toggleSoft = document.getElementById("toggle-soft");
    const techSkills = document.getElementById("technical-skills");
    const softSkills = document.getElementById("soft-skills");

    // Funktion zum Umschalten der Skills
    function toggleSkills(showTech) {
        if (showTech) {
            techSkills.classList.add("active");
            softSkills.classList.remove("active");
            toggleTech.classList.add("active");
            toggleSoft.classList.remove("active");
        } else {
            softSkills.classList.add("active");
            techSkills.classList.remove("active");
            toggleSoft.classList.add("active");
            toggleTech.classList.remove("active");
        }
    }

    // Event Listener für die Buttons
    toggleTech.addEventListener("click", () => toggleSkills(true));
    toggleSoft.addEventListener("click", () => toggleSkills(false));
});

// Skills animation
document.addEventListener("DOMContentLoaded", () => {
    const toggleTech = document.getElementById("toggle-tech");
    const toggleSoft = document.getElementById("toggle-soft");
    const technicalSkills = document.getElementById("technical-skills");
    const softSkills = document.getElementById("soft-skills");

    // Function to reset and animate progress bars
    function resetProgressBars(container) {
        const progressBars = container.querySelectorAll(".progress");
        progressBars.forEach(bar => {
            bar.style.width = "0"; // Reset width
            setTimeout(() => {
                bar.style.width = bar.getAttribute("data-width"); // Animate to target width
            }, 100); // Slight delay for smooth animation
        });
    }

    toggleTech.addEventListener("click", () => {
        technicalSkills.classList.add("active");
        softSkills.classList.remove("active");
        toggleTech.classList.add("active");
        toggleSoft.classList.remove("active");
        resetProgressBars(technicalSkills);
    });

    toggleSoft.addEventListener("click", () => {
        softSkills.classList.add("active");
        technicalSkills.classList.remove("active");
        toggleSoft.classList.add("active");
        toggleTech.classList.remove("active");
        resetProgressBars(softSkills);
    });

    // Initial animation on load
    resetProgressBars(technicalSkills);
});

// Github API
document.addEventListener("DOMContentLoaded", () => {
    const projectsContainer = document.getElementById("projects-container");
    const username = "Merinques";
    const apiUrl = `https://api.github.com/users/${username}/repos`;

    async function fetchGitHubRepos() {
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) throw new Error("Failed to fetch repos");

            const repos = await response.json();
            displayRepos(repos);
        } catch (error) {
            console.error("Error fetching GitHub repos:", error);
            projectsContainer.innerHTML = "<p>Failed to load projects. Try again later.</p>";
        }
    }

    function displayRepos(repos) {
        repos.forEach(repo => {
            const card = document.createElement("div");
            card.classList.add("project-card");

            card.innerHTML = `
                <h3>${repo.name}</h3>
                <p>${repo.description || "No description available."}</p>
                <div class="languages">Languages: Loading...</div>
                <a href="${repo.html_url}" target="_blank">View Project</a>
            `;

            projectsContainer.appendChild(card);

            // Fetch language breakdown for each repo
            fetch(repo.languages_url)
                .then(response => response.json())
                .then(languages => {
                    const languagesText = Object.keys(languages).join(", ");
                    card.querySelector(".languages").textContent = `Languages: ${languagesText || "N/A"}`;
                });
        });
    }

    fetchGitHubRepos();
});

// AOS Initialization
// Initialize AOS
document.addEventListener("DOMContentLoaded", function () {
    AOS.init({
        duration: 1000,
        easing: "ease-in-out",
        once: false,
    });
});