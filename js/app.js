document.addEventListener('DOMContentLoaded', () => {
  fetch('https://localhost:7157/api/Club')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network error');
      }
      return response.json();
    })
    .then(data => {
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
    })
    .catch(error => {
      document.getElementById('clubsContainer').innerHTML = `
        <p style="color: red;">Failed to load clubs: ${error.message}</p>
      `;
    });
});
