const projectsCount = document.querySelector("#projects-count");
const pendingCount = document.querySelector("#pending-count");
const completedProjectsCount = document.querySelector("#completed-projects-count");
const upcomingDeliveries = document.querySelector("#upcoming-deliveries");

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

projects.length
projectsCount.textContent = `${projects.length} proyectos`;

let pendingTasks = 0;

for (const task of tasks){
    if (task.status === "pending"){
        pendingTasks++;
    }
}

pendingCount.textContent = `${pendingTasks} tareas pendientes`;

let completedProject = 0;

const pendingTasksList = tasks.filter(function (task) {
    return task.status === "pending";
});

const sortedTasks = [...pendingTasksList];

sortedTasks.sort(function (a, b) {

    return new Date(a.deliveryDate) - new Date(b.deliveryDate);

});

const upcomingTasks = sortedTasks.slice(0, 3);

if (upcomingTasks.length === 0) {

    upcomingDeliveries.textContent = "No tienes tareas próximas.";

} else {

    for (const task of upcomingTasks) {

        const [year, month, day] = task.deliveryDate.split("-");

        const date = new Date(year, month - 1, day);

        const formattedDate = date.toLocaleDateString("es-BO", {
        day: "numeric",
        month: "long",
        year: "numeric"
        });
        upcomingDeliveries.innerHTML += `
            <p><strong>${task.name}</strong></p>
            <p>Proyecto: ${task.project}</p>
            <p>Fecha: ${formattedDate}</p>
            <br>
        `;
    }

}
console.log(sortedTasks);

for (const project of projects){
    if (project.status === "completed"){
        completedProject++;
    }
}

completedProjectsCount.textContent = `${completedProject} proyectos completados`;
