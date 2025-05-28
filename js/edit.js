document.addEventListener("DOMContentLoaded", () => {
    const clubId = new URLSearchParams(window.location.search).get("id");

    const form = document.getElementById("editClubForm");

    fetch(`https://localhost:7157/api/Club/GetById/${clubId}`)
        .then(res => res.json())
        .then(club => {
            form.name.value = club.name;
            form.city.value = club.city;
            form.country.value = club.country;
            form.coach.value = club.coach;
            form.founded.value = club.founded;
        });

    form.addEventListener("submit", e => {
        e.preventDefault();

        const updatedClub = {
            id: parseInt(clubId),
            name: form.name.value,
            city: form.city.value,  
            country: form.country.value,
            coach: form.coach.value,
            founded: parseInt(form.founded.value)
        };

        fetch(`https://localhost:7157/api/Club/${clubId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedClub)
        })
            .then(res => {
                if (!res.ok) throw new Error("Update failed");
                alert("Club updated successfully!");
                window.location.href = `club?id=${clubId}`;
            })
            .catch(err => alert("Error: " + err.message));
    });
});
