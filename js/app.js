document.addEventListener('DOMContentLoaded', () => {
    fetch('https://localhost:7157/api/Club')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network error');
            }
            return response.json();
        })
        .then(data => {
            renderClubs(data);
        })
        .catch(error => {
            const mockClubs = [
                {
                    id: 1,
                    name: "Mock United",
                    city: "Mock City",
                    country: "Mockland",
                    coach: "Jane Doe",
                    stadium: "Mock Arena",
                    founded: 1900
                },
                {
                    id: 2,
                    name: "Fake FC",
                    city: "Faketown",
                    country: "Fakeland",
                    coach: "John Smith",
                    stadium: "Fake Stadium",
                    founded: 1920
                }
            ];
            renderClubs(mockClubs);

            const container = document.getElementById('clubsContainer');
            const warning = document.createElement('p');
            warning.style.color = 'red';
            warning.textContent = `Failed to load clubs: ${error.message} (showing mock data)`;
            container.prepend(warning);
        });

    function renderClubs(data) {
        const container = document.getElementById('clubsContainer');
        container.innerHTML = '';

        data.forEach(club => {
            const card = document.createElement('div');
            card.className = 'club-card';

            card.innerHTML = `
        <h2><a href="club?id=${club.id}" class="club-link">${club.name}</a></h2>
        <p><strong>City:</strong> ${club.city}</p>
        <p><strong>Country:</strong> ${club.country}</p>
        <p><strong>Coach:</strong> ${club.coach}</p>
        <p><strong>Stadium:</strong> ${club.stadium}</p>
        ${club.founded ? `<p><strong>Founded:</strong> ${club.founded}</p>` : ''}
      `;

            container.appendChild(card);
        });
    }
});