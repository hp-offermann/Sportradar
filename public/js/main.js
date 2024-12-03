const form = document.getElementById("addEvent");
const EventPageBtn = document.getElementById('btn_Event');
const HomePageBtn = document.getElementById('btn_Home');
const DetailPage = document.getElementById("detail");
const HomePage = document.getElementById('calendar');
const days = document.getElementById("days");
let date = new Date();
const year = date.getFullYear();
const month = 10;
const sportData = JSON.parse(localStorage.getItem('sportData'));


function fetchJSON () {
    fetch("./sportData.json").then((r) => {
        if (!r.ok) {
            throw new Error(`${r.status}`);
        }return r.json();
    }) .then((data) => {
        //console.log(data);
        if (!localStorage.getItem('sportData')) {
            const addUUID = data.data.map(item => {
                item.id = uuidv4();
                return item;
            });
            localStorage.setItem('sportData', JSON.stringify(addUUID));
        }
    }).catch((error) =>
        console.log("could not fetch data", error));
}
fetchJSON();


function renderCalendar(){

    if(HomePage){
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
            div += `<div class="other-month"><div class="calendar-number">${datesLastMonth - i +1}</div></div>`;
        }

        for (let i = 1; i <= lastDateMonth; i++) {
            //each calendar day has the date as the id
            const dateString = `${year}-${(month + 1).toString().padStart(2, '0')}-${i.toString().padStart(2, '0')}`;
            div += `<div class="current-month" id=${dateString}><div class="calendar-number">${i}</div></div>`;
        }

        //for the days of the next month
        let nextMonth = 1;
        for (let i= lastDayOfMonth; i < 7; i++) {
            div += `<div class="other-month"><div class="calendar-number">${nextMonth}</div></div>`;
            nextMonth++;
        }
        days.innerHTML = div;

    }
}
renderCalendar();

function uuidv4() {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
        (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
    );
}

function getEvents() {
    const calendarDay = document.querySelectorAll(".current-month");

    sportData.forEach(event => {
        const dateOfEvent = event.dateVenue;

        calendarDay.forEach(calendarDay => {
            if (dateOfEvent === calendarDay.id) {
                const newEvent = document.createElement('button');
                newEvent.classList.add('newEvent');
                newEvent.setAttribute('id', event.id);
                calendarDay.appendChild(newEvent);
            }
        });
    })

}
getEvents(year, month);

const eventBtn = document.querySelectorAll(".newEvent");

eventBtn.forEach(eventBtn => {
    const event = sportData.find(e => e.id === eventBtn.id);

    if(event.homeTeam?.name && event.awayTeam?.name){
        eventBtn.textContent = `${event.homeTeam.name} vs. ${event.awayTeam.name}`;
    } else if(event.homeTeam?.name){
        eventBtn.textContent = `${event.homeTeam.name}`;
    } else if(event.awayTeam?.name){
        eventBtn.textContent = `${event.awayTeam.name}`;
    } else if(event.participants){
        eventBtn.textContent = `${event.participants}`;
    } else {
        eventBtn.textContent = "";
    }

    eventBtn.addEventListener('click', () => {
        console.log(eventBtn.id)
        window.location.href = `/detail?id=${eventBtn.id}`;
    })
});

function getURL() {
    const parameters = new URLSearchParams(window.location.search);
    return parameters.get("id");
}

function getDetails() {
    if(DetailPage){
        const Id = getURL();

        const event = sportData.find(e => e.id === Id);

        const eventDate = new Date(event.dateVenue);
        const formattedDate = eventDate.toLocaleDateString('de-DE');
        document.getElementById("Detail-date").textContent = `On: ${formattedDate}`;

        document.getElementById("Detail-sport").textContent = `${event.sport.charAt(0).toUpperCase() + event.sport.slice(1)}`;

        document.getElementById("Detail-eventname").textContent = `${event.originCompetitionName.charAt(0).toUpperCase() + event.originCompetitionName.slice(1)}`;

        document.getElementById("Detail-time").textContent = `${event.timeVenueUTC.slice(0, 5)}`;

        if(event.result) {
            document.getElementById("Detail-result").textContent = `Result: ${event.result.homeGoals}-${event.result.awayGoals}`;
        } else {
            document.getElementById("Detail-result").textContent = "";
        }

        if(event.homeTeam?.name && event.awayTeam?.name){
            document.getElementById("Detail-team").textContent = `${event.homeTeam.name} vs. ${event.awayTeam.name}`;
        } else if(event.homeTeam?.name){
            document.getElementById("Detail-team").textContent = `${event.homeTeam.name}`;
        } else if(event.awayTeam?.name){
            document.getElementById("Detail-team").textContent = `${event.awayTeam.name}`;
        } else if(event.participants){
            document.getElementById("Detail-team").textContent = `${event.participants}`;
        } else {
            document.getElementById("Detail-team").textContent = "";
        }

        if(event.stadium){
            document.getElementById("Detail-place").textContent = `${event.stadium}`;
        } else{
            document.getElementById("Detail-place").textContent = "";
        }
    }
}
getDetails()


if(form){
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = new FormData(form);
        const eventData = {};

        for (let [key, value] of formData.entries()) {
            eventData[key] = value;
        }

        eventData.id = uuidv4();
        const allData = JSON.parse(localStorage.getItem('sportData')) || [];

        allData.push(eventData);
        localStorage.setItem("sportData", JSON.stringify(allData));

        window.location.href = `/`;
        form.reset();

    });

}


if(EventPageBtn){
    EventPageBtn.addEventListener('click', () => {
        window.location.href = `/addEvent`;
    });
}

if(HomePageBtn){
    HomePageBtn.addEventListener('click', () => {
        window.location.href = `/`;
    });
}







