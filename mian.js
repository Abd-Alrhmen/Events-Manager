function setMainDate() {
    const today = new Date().toISOString().split("T")[0];
    const eventDate = document.querySelector(".event-date");
    eventDate.min = today;
    eventDate.addEventListener("input", function (){
        if(eventDate.value <= today){
            eventDate.value = today;
        }
    });
};
setMainDate()
function addEvent() {
    const eventName = document.querySelector(".event-name").value;
    const eventDate = document.querySelector(".event-date").value;
    const eventOrganizer = document.querySelector(".organizer").value;
    const eventTimeStamp = new Date(eventDate).getTime();
    if(eventName && eventDate && eventOrganizer) {
    const event = {
            name : eventName,
            date : eventDate,
            organizer : eventOrganizer,
            timeStamp : eventTimeStamp,
        };
        let events = JSON.parse(localStorage.getItem("events")) || [];
        events.push(event)
        localStorage.setItem("events", JSON.stringify(events));
        const input = document.querySelectorAll("input");
        input.forEach((input) => (input.value = ""))
        desplayEvents()
    }else{
        alert("Please Fill All Fieldes")
    }
};
function desplayEvents(){
    let events = JSON.parse(localStorage.getItem("events")) || [];
    const eventsList = document.querySelector(".events");
    eventsList.innerHTML = "";
    events = events.filter((event, index) => {
        const now = new Date().getTime();
        const timeLeft = event.timeStamp - now;
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor(timeLeft % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
        const minutes = Math.floor(timeLeft % (1000 * 60 * 60) / (1000 * 60));
        const seconds = Math.floor(timeLeft % (1000 * 60) / 1000);
        const countdown = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        // Check if event time has passed
        if (timeLeft <= 0) {
            return false; // Remove this event
        } else {
            eventsList.innerHTML += ` 
            <div class="event">
            <h3>${event.name}</h3>
            <p><span>By</span> ${event.organizer}</p>
            <p><span>On</span> ${event.date}</p>
            <p><span>Time Left</span> ${countdown}</p>
            <button onclick="deleteEvent(${index})">Delete</button>
            </div>
            `;
            return true; // Keep this event
        }
    });
    // Update the localStorage with filtered events
    localStorage.setItem("events", JSON.stringify(events));
}
desplayEvents()
function deleteEvent(index) {
    const events = JSON.parse(localStorage.getItem("events"));
    events.splice(index, 1);
    localStorage.setItem("events", JSON.stringify(events));
    desplayEvents()
};
setInterval(desplayEvents, 1000);
