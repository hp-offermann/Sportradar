const form = document.getElementById("addEvent");
let allData = JSON.parse(localStorage.getItem('sportData')) || [];

const EventPage = document.getElementById('btn_Event');
const HomePage = document.getElementById('btn_Home');

const calendar = document.querySelector(".calendar");
const days = document.getElementById("days");
let date = new Date();
const year = date.getFullYear();
const month = 10;

//console.log(date, year, month);

function renderCalendar(){
    //the dates of last month that are shown in the new month
    let datesLastMonth = new Date(year, month, 0).getDate();

    let startMonth = (new Date(year, month, 1).getDay() + 6) %7;

    //the last date of the month
    let lastDateMonth = new Date(year, month +1,0).getDate();

    //the last day of the month is at what position (0-6, 0=sun 6=sat)
    let lastDayOfMonth = new Date(year, month, lastDateMonth).getDay();

    let div = "";

    //for the days of the previous month
    for (let i= startMonth; i > 0; i--){
        div += `<div class="other-month">${datesLastMonth - i +1}</div>`;
    }

    //for the days of the current month
    for (let i = 1; i <= lastDateMonth; i++) {
        div += `<div class="current-month">${i}</div>`;
    }

    //for the days of the next month
    let nextMonth = 1;
    for (let i= lastDayOfMonth; i < 7; i++) {
        div += `<div class="other-month">${nextMonth}</div>`;
        nextMonth++;
    }

    days.innerHTML = div;

    console.log(lastDayOfMonth);
    console.log(startMonth);
    console.log(lastDateMonth);

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







