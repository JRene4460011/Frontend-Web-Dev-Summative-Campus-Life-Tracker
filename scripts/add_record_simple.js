const form = document.getElementById("record-form");
const createId = () => `rec_${Date.now()}`;

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const plan = {
        Id: createId(),
        title: document.getElementById("title").value,
        dueDate: document.getElementById("duedate").value,
        duration: document.getElementById("duration").value,
        tag: document.getElementById("tag").value
    };

    // This is getting existing plans
    const existingPlans =
        JSON.parse(localStorage.getItem("plans")) || [];

    // This is adding new plan
    existingPlans.push(plan);

    // Saving back to localStorage
    localStorage.setItem("plans", JSON.stringify(existingPlans));

    alert("Plan saved successfully!");

    form.reset();
});