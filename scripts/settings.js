const weeklyCapInput = document.getElementById("weeklycap");
const durationUnit = document.getElementById("durationunit");
const form = document.querySelector(".configure-settings form");

// Load saved settings
const settings =
    JSON.parse(localStorage.getItem("settings")) || {};

weeklyCapInput.value = settings.weeklyCap || "";
durationUnit.value = settings.durationUnit || "minutes";

form.addEventListener("submit", function (event) {
    event.preventDefault();

    let cap = Number(weeklyCapInput.value);

    if (cap <= 0) {
        alert("Weekly cap must be greater than 0.");
        return;
    }

    if (cap > 600) {
        cap = 600;
    }

    const settings = {
        weeklyCap: cap,
        durationUnit: durationUnit.value
    };

    localStorage.setItem(
        "settings",
        JSON.stringify(settings)
    );

    alert("Settings saved!");
});