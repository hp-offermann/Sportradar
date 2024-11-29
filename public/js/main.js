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

