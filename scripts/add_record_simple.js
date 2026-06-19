const form = document.getElementById("record-form");
const createId = () => `rec_${Date.now()}`;

// Load saved information, so they can be editted.
const editData = JSON.parse(localStorage.getItem("currentEdit")) || null;

if (editData) {
    document.getElementById("title").value = editData.title;
    document.getElementById("duedate").value = editData.dueDate;
    document.getElementById("duration").value = editData.duration;
    document.getElementById("tag").value = editData.tag;
    document.querySelector("button[type='submit']").textContent = "Save changes";
}

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const title = document.getElementById("title").value.trim();
    const dueDate = document.getElementById("duedate").value.trim();
    const duration = document.getElementById("duration").value.trim();
    const tag = document.getElementById("tag").value.trim();

    // PATTERNS I'LL USE FOR REGEX VALIDATION
    const titleRegex = /^\S(?:.*\S)?$/;
    const dueDateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
    const durationRegex = /^(0|[1-9]\d*)(\.\d{1,2})?$/;
    const tagRegex = /^[A-Za-z]+(?:[ -][A-Za-z]+)*$/;

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

    if (editData && Number.isInteger(editData.index)) {
        existingPlans[editData.index] = plan;
        localStorage.removeItem("currentEdit");
        alert("Plan updated successfully!");
    } else {
        existingPlans.push(plan);
        alert("Plan saved successfully!");
    }

    localStorage.setItem(
        "plans",
        JSON.stringify(existingPlans)
    );

    form.reset();
});