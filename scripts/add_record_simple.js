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
        // Since this isn't professional, I WILL display errors on beneath input fields.
        // alert("Title should contain at least 3 letters, numbers, or spaces.");
        document.getElementById("title-error").textContent = "Title should contain at least 3 letters, numbers, or spaces.";
        return;
    }

    // DUE DATE
    if (!dueDateRegex.test(dueDate)) {
        // Since this isn't professional, I WILL display errors on beneath input fields.
        // alert("Due date must be in YYYY-MM-DD format.");
        document.getElementById("duedate-error").textContent = "Due date must be in YYYY-MM-DD format.";
        return;
    }

    // DURATION
    if (!durationRegex.test(duration)) {
        // Since this isn't professional, I WILL display errors on beneath input fields.
        // alert("Duration must be a positive whole number.");
        document.getElementById("duration-error").textContent = "Duration must be a positive whole number.";
        return;
    }

    // TAG
    if (!tagRegex.test(tag)) {
        // Since this isn't professional, I WILL display errors on beneath input fields.
        // alert("Tag must contain only letters and spaces.");
        document.getElementById("tag-error").textContent = "Tag must contain only letters and spaces.";
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