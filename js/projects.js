const openProjectModalButton = document.querySelector("#open-project-modal");
const overlay = document.querySelector(".overlay");
const closeProjectModalButton = document.querySelector("#close-project-modal");
const cancelProjectModalButton = document.querySelector("#cancel-project-modal");

const projectForm = document.querySelector("#project-form");

const projectNameInput = document.querySelector("#name");
const projectDescriptionTextarea = document.querySelector("#description");
const projectSubjectInput = document.querySelector("#subject");
const projectDeliveryDateInput = document.querySelector("#delivery-date");
const projectStatusInput = document.querySelector("#status");
const projectsList = document.querySelector(".projects-list");

const searchProjectInput = document.querySelector("#search-project");

let projects = [];

const savedProjects = localStorage.getItem("projects");

if (savedProjects) {

    projects = JSON.parse(savedProjects);

}

let tasks = [];

const savedTasks = localStorage.getItem("tasks");

if (savedTasks) {

    tasks = JSON.parse(savedTasks);

}

renderProjects();

console.log(openProjectModalButton);

openProjectModalButton.addEventListener("click", function () {

    overlay.classList.remove("hidden");

});

closeProjectModalButton.addEventListener("click", function () {

    overlay.classList.add("hidden");

});

cancelProjectModalButton.addEventListener("click", function () {

    overlay.classList.add("hidden");

});

searchProjectInput.addEventListener("input", function () {

    renderProjects(searchProjectInput.value);

});

function renderProjects(search = "") {

    projectsList.innerHTML = "";

    for (const project of projects) {

        if (
            project.name.toLowerCase().includes(search.toLowerCase())
        ) {

            createProjectCard(project);

        }

    }

}
function createProjectCard(project) {
    let projectStatusText = "";

if (project.status === "in-progress") {
    projectStatusText = "En curso";
} else if (project.status === "completed") {
    projectStatusText = "Finalizado";
} else if (project.status === "paused") {
    projectStatusText = "Pausado";
}



const [year, month, day] = project.deliveryDate.split("-");

const date = new Date(year, month - 1, day);

const formattedDate = date.toLocaleDateString("es-BO", {
    day: "numeric",
    month: "long",
    year: "numeric"
});

const projectCard = document.createElement("div");

projectCard.classList.add("card");

let pendingTasks = 0;

for (const task of tasks) {

    if (task.status === "pending" && task.project === project.name) {

        pendingTasks++;

    }

}

projectCard.innerHTML = `   
    <h3>${project.name}</h3>

    <p>${project.description}</p>

    <p>Materia: ${project.subject}</p>

    <p>Entrega: ${formattedDate}</p>

    <p>Tareas pendientes: ${pendingTasks}</p>

    <p>${projectStatusText}</p>
`;
if (project.status !== "completed") {

    const completeProjectButton = document.createElement("button");

    completeProjectButton.textContent = "✔ Marcar como finalizado";

    completeProjectButton.classList.add(
        "primary-button",
        "complete-project-button"
    );

    completeProjectButton.addEventListener("click", function () {

    if (pendingTasks > 0) {

        const confirmFinish = confirm(
            `Este proyecto tiene ${pendingTasks} tarea(s) pendiente(s).\n\n¿Deseas marcarlo como finalizado de todas formas?`
        );

        if (!confirmFinish) {
            return;
        }

    }

        project.status = "completed";

        localStorage.setItem("projects", JSON.stringify(projects));

        renderProjects();

        });

    const projectActions = document.createElement("div");

    projectActions.classList.add("task-actions");

    projectActions.appendChild(completeProjectButton);

    projectCard.appendChild(projectActions);

}

    projectsList.appendChild(projectCard);

}

projectForm.addEventListener("submit", function (event) {

    event.preventDefault();

    if (projectNameInput.value.trim() === "") {
    alert("El nombre del proyecto es obligatorio.");
    return;
}

if (projectDescriptionTextarea.value.trim() === "") {
    alert("La descripción del proyecto es obligatoria.");
    return;
}

if (projectSubjectInput.value.trim() === "") {
    alert("La materia es obligatoria.");
    return;
}

if (projectDeliveryDateInput.value === "") {
    alert("Debes seleccionar una fecha de entrega.");
    return;
}

    const project = {

        name: projectNameInput.value,
        description: projectDescriptionTextarea.value,
        subject: projectSubjectInput.value,
        deliveryDate: projectDeliveryDateInput.value,
        status: projectStatusInput.value

    };

    projects.push(project);

    console.log(projects);
    localStorage.setItem("projects", JSON.stringify(projects));


    renderProjects();

    overlay.classList.add("hidden");
    projectForm.reset();
    console.log(project);
   
});
