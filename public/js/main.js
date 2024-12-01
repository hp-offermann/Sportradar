const form = document.getElementById("addEvent");
let allData = JSON.parse(localStorage.getItem('sportData')) || [];


const EventPage = document.getElementById('btn_Event');
const HomePage = document.getElementById('btn_Home');

const calendar = document.querySelector(".calendar");
const days = document.getElementById("days");

let date = new Date();
const year = date.getFullYear();
const month = date.getMonth();
//console.log(date, year, month);

function renderCalendar(){
    let datesLastMonth = new Date(year, month, 0).getDate();
    let firstDayMonth = new Date(year, month, 1).getDay();
    let lastDayMonth = new Date(year, month +1,0).getDate();
    //console.log(lastDayMonth);

    let div = "";

    for (let i=firstDayMonth; i > 0; i--){
        div += `<div class="previous-month">${datesLastMonth -i +1}</div>`;
    }

    for (let i = 1; i <= lastDayMonth; i++) {
        div += `<div class="current-month">${i}</div>`;
    }

    days.innerHTML = div;

    console.log(firstDayMonth);
    console.log(lastDayMonth);

}
renderCalendar();

/*
function fetchJSON () {
    fetch("./sportData.json").then((r) => {
        if (!r.ok) {
            throw new Error(`${r.status}`);
        }
        return r.json();
    }) .then((data) => {
        //console.log(data);

        if (!localStorage.getItem('sportData')) {
            localStorage.setItem('sportData', JSON.stringify(data.data));
        }

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


function addEventToCalendar(eventData) {
    const calendar = document.querySelectorAll(".marker");
    calendar.forEach(day => {
        if (day.id === eventData.date) {
            const button = document.createElement("entry-button");
            button.classList.add("viewEntry");
            day.appendChild(button);
        }
    });
}

function loadEventsFromLocalStorage() {
    if(allData){
        allData.forEach(eventData => {
            addEventToCalendar(eventData);
        });
    }
}
loadEventsFromLocalStorage();


if(form){
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = new FormData(form);
        const eventData = {};

        for (let [key, value] of formData.entries()) {
            eventData[key] = value;
        }

        allData.push(eventData);
        localStorage.setItem("sportData", JSON.stringify(allData));
        addEventToCalendar(eventData);

        window.location.href = "/";
        form.reset();
    });
}

 */

if(calendar){
    calendar.addEventListener('click', function(event) {
        if (event.target.classList.contains('viewEntry')) {
            window.location.href = "/detail";
        }
    });
}


if(EventPage){
    EventPage.addEventListener('click', () => {
        window.location.href = `/addEvent`;
    });
}

if(HomePage){
    HomePage.addEventListener('click', () => {
        window.location.href = `/`;
    });
}







