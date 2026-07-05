const monthTitle = document.querySelector("#month-title");
const calendarGrid = document.querySelector("#calendar-grid");
const calendarEvents = document.querySelector("#calendar-events");

const today = new Date();
const year = today.getFullYear();
const month = today.getMonth();

const savedProjects = localStorage.getItem("projects");
const savedTasks = localStorage.getItem("tasks");

let projects = [];
let tasks = [];

if (savedProjects) {
    projects = JSON.parse(savedProjects);
}

if (savedTasks) {
    tasks = JSON.parse(savedTasks);
}

const monthName = today.toLocaleDateString("es-BO", {
    month: "long",
    year: "numeric"
});

monthTitle.textContent = monthName;

const daysInMonth = new Date(
    year,
    month + 1,
    0
).getDate();

let firstDay = new Date(
    year,
    month,
    1
).getDay();
firstDay = (firstDay + 6) % 7;

for (let i = 0; i < firstDay; i++) {
    const emptyDay = document.createElement("div");
    emptyDay.classList.add("calendar-day");
    calendarGrid.appendChild(emptyDay);
}

for (let day = 1; day <= daysInMonth; day++) {

    const calendarDay = document.createElement("div");

    calendarDay.classList.add("calendar-day");

    calendarDay.innerHTML = `
        <strong>${day}</strong>
    `;

    for (const project of projects) {

        const projectDate = new Date(project.deliveryDate);

        if (
            projectDate.getDate() === day &&
            projectDate.getMonth() === month &&
            projectDate.getFullYear() === year
        ) {

            const projectLabel = document.createElement("p");

            projectLabel.textContent = `📁 ${project.name}`;

            calendarDay.appendChild(projectLabel);
        }
    }

    for (const task of tasks) {
    const taskDate = new Date(task.deliveryDate);
        if (
           taskDate.getDate() === day &&
           taskDate.getMonth() === month &&
           taskDate.getFullYear() === year
        ){
           const taskLabel = document.createElement("p");
           taskLabel.textContent = `📌 ${task.name}`;
           calendarDay.appendChild(taskLabel);
        }
    }

    calendarGrid.appendChild(calendarDay);

}

let deliveries = [];

for (const project of projects) {
    deliveries.push({
        type: "project",
        name: project.name,
        deliveryDate: project.deliveryDate
    });

}

for (const task of tasks) {
    deliveries.push({
        type: "task",
        name: task.name,
        deliveryDate: task.deliveryDate,
        status: task.status
    });
}

deliveries.sort(function (a, b) {

    return new Date(a.deliveryDate) - new Date(b.deliveryDate);

});

for (const delivery of deliveries) {
    const date = new Date(delivery.deliveryDate);
    if (
        date.getMonth() !== month ||
        date.getFullYear() !== year
    ) {
        continue;
    }
    const formattedDate = date.toLocaleDateString("es-BO", {
        day: "numeric",
        month: "long"
    });
    const eventCard = document.createElement("div");
    eventCard.classList.add("event-card");
    let icon = "";
    if (delivery.type === "project") {
        icon = "📁";
    } else {
        icon = "📌";
    }
    eventCard.innerHTML = `
        <p><strong>${formattedDate}</strong></p>
        <p>${icon} ${delivery.name}</p>
    `;
    calendarEvents.appendChild(eventCard);
}

