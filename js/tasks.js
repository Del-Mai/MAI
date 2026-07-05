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

renderTasks();

openTaskModalButton.addEventListener("click", function () {

    overlay.classList.remove("hidden");

});

closeTaskModalButton.addEventListener("click", function () {

    overlay.classList.add("hidden");

});

cancelTaskModalButton.addEventListener("click", function () {

    overlay.classList.add("hidden");

});

function renderTasks() {

    tasksList.innerHTML = "";

    for (const task of tasks) {

        createTaskCard(task);

    }

}

function createTaskCard(task) {
let taskStatusText = "";

if (task.status === "pending") {
    taskStatusText = "Pendiente";
} else if (task.status === "completed") {
    taskStatusText = "Completada";
}

const [year, month, day] = task.deliveryDate.split("-");

const date = new Date(year, month - 1, day);

const formattedDate = date.toLocaleDateString("es-BO", {
    day: "numeric",
    month: "long",
    year: "numeric"
});

const taskCard = document.createElement("div");

taskCard.classList.add("card");

taskCard.innerHTML = `
    <h3>${task.name}</h3>

    <p>${task.description}</p>

    <p>Proyecto: ${task.project}</p>

    <p>Fecha límite: ${formattedDate}</p>

    <p>${taskStatusText}</p>
`;

if (task.status === "pending") {

    const completeButton = document.createElement("button");

    completeButton.textContent = "✔ Marcar como completada";

    const deleteButton = document.createElement("button");

    deleteButton.textContent = "🗑 Eliminar";

    completeButton.classList.add(
        "primary-button",
        "complete-button"
    );

    deleteButton.classList.add(
    "primary-button",
    "delete-button"
    );

    completeButton.addEventListener("click", function () {

    task.status = "completed";

    localStorage.setItem("tasks", JSON.stringify(tasks));

    renderTasks();

    });

    deleteButton.addEventListener("click", function () {

    if (!confirm("¿Deseas eliminar esta tarea?")) {
        return;
    }

    const index = tasks.indexOf(task);

    tasks.splice(index, 1);

    localStorage.setItem("tasks", JSON.stringify(tasks));

    renderTasks();

    });

    const taskActions = document.createElement("div");

    taskActions.classList.add("task-actions");

    taskActions.appendChild(completeButton);

    taskActions.appendChild(deleteButton);

    taskCard.appendChild(taskActions);

}

tasksList.appendChild(taskCard);
}

taskForm.addEventListener("submit", function (event) {

    event.preventDefault();

    if (taskNameInput.value.trim() === "") {
    alert("El nombre de la tarea es obligatorio.");
    return;
    }

    if (taskDescriptionTextarea.value.trim() === "") {
    alert("La descripción de la tarea es obligatoria.");
    return;
    }

    if (taskDeliveryDateInput.value === "") {
    alert("Debes seleccionar una fecha límite.");
    return;
    }

    const task = {

    name: taskNameInput.value,
    description: taskDescriptionTextarea.value,
    project: taskProjectInput.value,
    deliveryDate: taskDeliveryDateInput.value,
    status: taskStatusInput.value

};

tasks.push(task);

localStorage.setItem("tasks", JSON.stringify(tasks));

renderTasks();

overlay.classList.add("hidden");
taskForm.reset();
});
