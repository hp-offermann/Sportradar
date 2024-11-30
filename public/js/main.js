function fetchJSON () {
    fetch("./sportData.json").then((r) => {
        if (!r.ok) {
            throw new Error(`${r.status}`);
        }
        return r.json();
    }) .then((data) => {
        console.log(data);

        const sportData = data.data;

        sportData.forEach(event => {
            const calendar = document.querySelectorAll(".marker");
            const date = event.dateVenue;

            calendar.forEach(day => {
                if (day.id === date) {
                    const button = document.createElement("entry-button");
                    button.classList.add("viewEntry");

                    day.appendChild(button);
                }
            });
        });

    }).catch((error) =>
        console.log("could not fetch data", error));
}
fetchJSON();

const EventPage = document.getElementById('btn_Event');

if(EventPage){
    EventPage.addEventListener('click', () => {
        window.location.href = `/addEvent`;
    });
}

const HomePage = document.getElementById('btn_Home');

if(HomePage){
    HomePage.addEventListener('click', () => {
        window.location.href = `/`;
    });
}



