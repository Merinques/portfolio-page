// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});



// Embedding GitHub API to disply repositories
const githubUsername = 'Merinques';

fetch(`https://api.github.com/users/${githubUsername}/repos`)
    .then(response => response.json())
    .then(data => {
        const projectsContainer = document.getElementById('projects-container');

        data.forEach(repo => {
            const project = document.createElement('div');
            project.classList.add('project');

            project.innerHTML = `
                <h3><a href="${repo.html_url}" target="_blank">${repo.name}</a></h3>
                <p>${repo.description || 'No description available.'}</p>
            `;

            projectsContainer.appendChild(project);
        });
    })
    .catch(error => console.error('Error fetching repositories:', error));
