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

projectForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const project = {

        name: projectNameInput.value,
        description: projectDescriptionTextarea.value,
        subject: projectSubjectInput.value,
        deliveryDate: projectDeliveryDateInput.value,
        status: projectStatusInput.value

    };

let projectStatusText = "";

if (project.status === "in-progress") {
    projectStatusText = "En curso";
} else if (project.status === "completed") {
    projectStatusText = "Finalizado";
} else if (project.status === "paused") {
    projectStatusText = "Pausado";
}

const date = new Date(project.deliveryDate);
const formattedDate = date.toLocaleDateString("es-BO");

const projectCard = document.createElement("div");

projectCard.classList.add("card");

projectCard.innerHTML = `
    <h3>${project.name}</h3>

    <p>${project.description}</p>

    <p>Materia: ${project.subject}</p>

    <p>Entrega: ${formattedDate}</p>

    <p>Tareas pendientes: 0</p>

    <p>${projectStatusText}</p>
`;
    projectsList.appendChild(projectCard);
    overlay.classList.add("hidden");
    projectForm.reset();
    console.log(projectsList.children.length);
    console.log(project);
    console.log(projectCard);

});