const form = document.getElementById("addEvent");
const DetailPage = document.getElementById("detail");
const HomePage = document.getElementById('calendar');
const days = document.getElementById("days");

let date = new Date();
const year = date.getFullYear();
const month = 10;

const sportData = JSON.parse(localStorage.getItem('sportData'));

main();


async function main() {
    await fetchJSON();

    if (HomePage) renderCalendar();
    if (DetailPage) getDetails();
    if (form) submitForm();
}

async function fetchJSON() {
    let data;

    try {
        data = await (await fetch("./sportData.json")).json();
    } catch (error) {
        console.log("Could not get sports data", error);
        return;
    }

    if (!localStorage.getItem('sportData')) {
        const addUUID = data.data.map(item => {
            item.id = crypto.randomUUID();
            return item;
        });
        localStorage.setItem('sportData', JSON.stringify(addUUID));
    }
}


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
        getEvents(year, month);
    }
}


function getEvents() {
    const calendarDay = document.querySelectorAll(".current-month");

    sportData.forEach(event => {
        calendarDay.forEach(calendarDay => {
            if (event.dateVenue === calendarDay.id) {
                const newEvent = document.createElement('button');
                newEvent.classList.add('newEvent');
                newEvent.setAttribute('id', event.id);


                newEvent.addEventListener('click', () => {
                    console.log(newEvent.id)
                    window.location.href = `/detail?id=${newEvent.id}`;
                })

                calendarDay.appendChild(newEvent);
            }
        });
    })
    displayEventName();
}


//to display the event name on the marker in the calendar
function displayEventName(){
    const eventBtn = document.querySelectorAll(".newEvent");

    eventBtn.forEach(eventBtn => {
        const event = sportData.find(e => e.id === eventBtn.id);

        if (event.homeTeam?.name && event.awayTeam?.name) {
            eventBtn.textContent = `${event.homeTeam.name} vs. ${event.awayTeam.name}`;
        } else if (event.homeTeam?.name) {
            eventBtn.textContent = `${event.homeTeam.name}`;
        } else if (event.awayTeam?.name) {
            eventBtn.textContent = `${event.awayTeam.name}`;
        } else if (event.participants) {
            eventBtn.textContent = `${event.participants}`;
        } else {
            eventBtn.textContent = "";
        }
    });
}


function getURL() {
    const parameters = new URLSearchParams(window.location.search);
    return parameters.get("id");
}


//for the detailpage to display the data
function getDetails() {
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


//for the form to add an event
function submitForm(){
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = new FormData(form);
        const eventData = {};

        for (let [key, value] of formData.entries()) {
            eventData[key] = value;
        }

        eventData.id = crypto.randomUUID();
        const allData = JSON.parse(localStorage.getItem('sportData')) || [];

        allData.push(eventData);
        localStorage.setItem("sportData", JSON.stringify(allData));

        window.location.href = `/`;
        form.reset();
    });
}











