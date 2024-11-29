function fetchJSON () {
    fetch("./sportData.json").then((r) => {
        if (!r.ok) {
            throw new Error(`${r.status}`);
        }
        return r.json();
    }).then((data) => console.log(data)).catch((error) => console.log("couldnt fetch data", error));
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



