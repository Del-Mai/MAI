const openTaskModalButton = document.querySelector("#open-task-modal");
const overlay = document.querySelector(".overlay");
const closeTaskModalButton = document.querySelector("#close-task-modal");
const cancelTaskModalButton = document.querySelector("#cancel-task-modal");

const taskForm = document.querySelector("#task-form");

const taskNameInput = document.querySelector("#name");
const taskDescriptionTextarea = document.querySelector("#description");
const taskProjectInput = document.querySelector("#project");
const taskDeliveryDateInput = document.querySelector("#delivery-date");
const taskStatusInput = document.querySelector("#status");

const tasksList = document.querySelector(".tasks-list");

let tasks = [];

const savedTasks = localStorage.getItem("tasks");

if (savedTasks) {
    tasks = JSON.parse(savedTasks);
}

const savedProjects = localStorage.getItem("projects");

if (savedProjects) {

    const projects = JSON.parse(savedProjects);

    for (const project of projects) {

        const option = document.createElement("option");

        option.value = project.name;
        option.textContent = project.name;

        taskProjectInput.appendChild(option);

    }

}

for (const task of tasks) {

    createTaskCard(task);

}

openTaskModalButton.addEventListener("click", function () {

    overlay.classList.remove("hidden");

});

closeTaskModalButton.addEventListener("click", function () {

    overlay.classList.add("hidden");

});

cancelTaskModalButton.addEventListener("click", function () {

    overlay.classList.add("hidden");

});

function createTaskCard(task) {
let taskStatusText = "";

if (task.status === "pending") {
    taskStatusText = "Pendiente";
} else if (task.status === "completed") {
    taskStatusText = "Completada";
}

const date = new Date(task.deliveryDate);
const formattedDate = date.toLocaleDateString("es-BO");

const taskCard = document.createElement("div");

taskCard.classList.add("card");

taskCard.innerHTML = `
    <h3>${task.name}</h3>

    <p>${task.description}</p>

    <p>Proyecto: ${task.project}</p>

    <p>Fecha límite: ${formattedDate}</p>

    <p>${taskStatusText}</p>
`;

tasksList.appendChild(taskCard);
}

taskForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const task = {

    name: taskNameInput.value,
    description: taskDescriptionTextarea.value,
    project: taskProjectInput.value,
    deliveryDate: taskDeliveryDateInput.value,
    status: taskStatusInput.value

};

tasks.push(task);

const tasksText = JSON.stringify(tasks);

localStorage.setItem("tasks", tasksText);

createTaskCard(task);

overlay.classList.add("hidden");
taskForm.reset();
});