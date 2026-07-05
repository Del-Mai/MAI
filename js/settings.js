const settingsForm = document.querySelector("#settings-form");

const usernameInput = document.querySelector("#username");
const emailInput = document.querySelector("#emailsettings");
const themeInput = document.querySelector("#theme");

const savedSettings = localStorage.getItem("settings");

if (savedSettings) {

    const settings = JSON.parse(savedSettings);

    usernameInput.value = settings.username;
    emailInput.value = settings.email;
    themeInput.value = settings.theme;

}

settingsForm.addEventListener("submit", function (event) {

    event.preventDefault();

    if (usernameInput.value.trim() === "") {
      alert("El nombre es obligatorio.");
      return;
    }

    if (emailInput.value.trim() === "") {
      alert("El correo es obligatorio.");
      return;
    }

    const settings = {

        username: usernameInput.value,
        email: emailInput.value,
        theme: themeInput.value

    };

    localStorage.setItem(
        "settings",
        JSON.stringify(settings)
    );

    alert("Configuración guardada correctamente.");
    window.location.href = "dashboard.html";

});