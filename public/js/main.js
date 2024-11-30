function fetchJSON () {
    fetch("./sportData.json").then((r) => {
        if (!r.ok) {
            throw new Error(`${r.status}`);
        }
        return r.json();
    }) .then((data) => {
        console.log(data);

        const calendar = document.querySelectorAll(".marker");
        const sportData = data.data;

        sportData.forEach(event => {
            const date = event.dateVenue;
            //console.log(`Eventdate: ${date}`);

            calendar.forEach(day => {
                if (day.id === date) {
                    //console.log(`Marker added for: ${date}`);
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

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("addEvent");

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const formData = new FormData(form);
        const eventData = {};

        for (let [key, value] of formData.entries()) {
            eventData[key] = value;
        }

        console.log('Object:', eventData);
        form.reset();
    });

})





