const weeklyCapInput = document.getElementById("weeklycap");
const durationUnit = document.getElementById("durationunit");
const form = document.querySelector(".configure-settings form");

// I'm loading saved settings
const settings = JSON.parse(localStorage.getItem("settings")) || {};

weeklyCapInput.value = settings.weeklyCap || "";
durationUnit.value = settings.durationUnit || "minutes";

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const settings = {
        weeklyCap: weeklyCapInput.value,
        durationUnit: durationUnit.value
    };

    localStorage.setItem(
        "settings",
        JSON.stringify(settings)
    );

    alert("Settings saved!");
});