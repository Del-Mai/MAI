const openProjectModalButton = document.querySelector("#open-project-modal");
const overlay = document.querySelector(".overlay");
const closeProjectModalButton = document.querySelector("#close-project-modal");
const cancelProjectModalButton = document.querySelector("#cancel-project-modal");
const projectForm = document.querySelector("#project-form");

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

    console.log("Proyecto guardado");

});