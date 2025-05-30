window.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const clubId = urlParams.get('id');
  if (!clubId) {
    document.body.innerHTML = '<p style="color:red;">Club ID missing in URL</p>';
    return;
    }

    document.getElementById("deleteClubBtn").addEventListener("click", function () {
        if (confirm("Are you sure you want to delete this club?")) {
            fetch(`https://localhost:7157/api/Club/${clubId}`, {
                method: "DELETE"
            })
                .then(res => {
                    if (!res.ok) throw new Error("Delete failed");
                    alert("Club deleted.");
                    window.location.href = "index.html";
                })
                .catch(err => alert("Error: " + err.message));
        }
    });

    document.getElementById("editClubBtn").addEventListener("click", () => {
        window.location.href = `edit?id=${clubId}`;
    });

 fetch(`https://localhost:7157/api/Club/GetById/${clubId}`)
  .then(res => {
    if (!res.ok) throw new Error('Failed to load club info');
    return res.json();
  })
  .then(club => {
    document.getElementById('clubName').textContent = club.name;

    document.getElementById('clubInfo').innerHTML = `
      <p><strong>City:</strong> ${club.city}</p>
      <p><strong>Country:</strong> ${club.country}</p>
      <p><strong>Coach:</strong> ${club.coach}</p>
      <p><strong>Founded:</strong> ${club.founded || 'N/A'}</p>
      <p><Total Goals Conceded> <strong>Total Goals Conceded:</strong> ${club.goalConceded || 'N/A'}</p>
      <p><strong>Total Goals Scored:</strong> ${club.goalScored || 'N/A'}</p>
    `;
  })
  .catch(err => {
    const mockClub = {
      name: "Mock United",
      city: "Mock City",
      country: "Mockland",
      coach: "Jane Doe",
      founded: 1900,
      goalConceded: 12,
      goalScored: 34
    };
    document.getElementById('clubName').textContent = mockClub.name;
    document.getElementById('clubInfo').innerHTML = `
      <p><strong>City:</strong> ${mockClub.city}</p>
      <p><strong>Country:</strong> ${mockClub.country}</p>
      <p><strong>Coach:</strong> ${mockClub.coach}</p>
      <p><strong>Founded:</strong> ${mockClub.founded}</p>
      <p><Total Goals Conceded> <strong>Total Goals Conceded:</strong> ${mockClub.goalConceded}</p>
      <p><strong>Total Goals Scored:</strong> ${mockClub.goalScored}</p>
      <p style="color:green;">(Mock data shown: ${err.message})</p>
    `;
  });

fetch(`https://localhost:7157/api/MatchInfo/GetAllById/${clubId}`)
    .then(res => {
        if (!res.ok) throw new Error('Failed to load matches');
        return res.json();
    })
    .then(matches => {
        const container = document.getElementById('matchesContainer');
        container.innerHTML = '';

        if (matches.length === 0) {
            container.innerHTML = '<p>No matches found.</p>';
            return;
        }

        matches.forEach(match => {
            const matchDate = new Date(match.date).toLocaleDateString();

            const div = document.createElement('div');
            div.className = 'match-card';
            div.innerHTML = `
    <p><strong>Date:</strong> ${matchDate}</p>
    <p>
        <strong>${match.homeClub.name}</strong> ${match.homeTeamGoals} - ${match.awayTeamGoals} <strong>${match.awayClub.name}</strong>
    </p>
    <p><small>Possession: ${match.possesionHome}% - ${match.possesionAway}%</small></p>
    `;

            container.appendChild(div);
        });
    })
    .catch(err => {
        const container = document.getElementById('matchesContainer');
        const mockMatches = [
            {
                date: new Date().toISOString(),
                homeClub: { name: "Mock United" },
                awayClub: { name: "Fake City" },
                homeTeamGoals: 2,
                awayTeamGoals: 1,
                possesionHome: 55,
                possesionAway: 45
            }
        ];
        container.innerHTML = '';
        mockMatches.forEach(match => {
            const matchDate = new Date(match.date).toLocaleDateString();
            const div = document.createElement('div');
            div.className = 'match-card';
            div.innerHTML = `
    <p><strong>Date:</strong> ${matchDate}</p>
    <p>
        <strong>${match.homeClub.name}</strong> ${match.homeTeamGoals} - ${match.awayTeamGoals} <strong>${match.awayClub.name}</strong>
    </p>
    <p><small>Possession: ${match.possesionHome}% - ${match.possesionAway}%</small></p>
    `;
            container.appendChild(div);
        });
    });
});
