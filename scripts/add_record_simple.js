const form = document.getElementById("record-form");
const createId = () => `rec_${Date.now()}`;

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const title = document.getElementById("title").value.trim();
    const dueDate = document.getElementById("duedate").value.trim();
    const duration = document.getElementById("duration").value.trim();
    const tag = document.getElementById("tag").value.trim();

    // REGEX PATTERNS
    const titleRegex = /^[A-Za-z0-9 ]{3,}$/;
    const dueDateRegex = /^\d{4}-\d{2}-\d{2}$/;
    const durationRegex = /^[1-9]\d*$/;
    const tagRegex = /^[A-Za-z ]{2,}$/;

    // TITLE
    if (!titleRegex.test(title)) {
        alert("Title should contain at least 3 letters, numbers, or spaces.");
        return;
    }

    // DUE DATE
    if (!dueDateRegex.test(dueDate)) {
        alert("Due date must be in YYYY-MM-DD format.");
        return;
    }

    // DURATION
    if (!durationRegex.test(duration)) {
        alert("Duration must be a positive whole number.");
        return;
    }

    // TAG
    if (!tagRegex.test(tag)) {
        alert("Tag must contain only letters and spaces.");
        return;
    }

    const plan = {Id: createId(), title, dueDate, duration, tag};

    const existingPlans =
        JSON.parse(localStorage.getItem("plans")) || [];

    existingPlans.push(plan);

    localStorage.setItem(
        "plans",
        JSON.stringify(existingPlans)
    );

    alert("Plan saved successfully!");

    form.reset();
});