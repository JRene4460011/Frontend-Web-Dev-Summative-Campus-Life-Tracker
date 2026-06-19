const plans = JSON.parse(localStorage.getItem("plans")) || [];

const tableBody = document.getElementById("plans-table-body");

function renderPlans() {
    tableBody.innerHTML = "";

    plans.forEach((plan, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${plan.title}</td>
            <td>${plan.tag}</td>
            <td>${plan.duration} min</td>
            <td>${plan.dueDate}</td>
            <td>
                <button class="btn btn-primary">Edit</button>
                <button class="btn btn-danger" onclick="deletePlan(${index})">
                    Delete
                </button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}

renderPlans();

// The delete function to help me in erasing a plan, task, or event.
function deletePlan(index) {
    plans.splice(index, 1);

    localStorage.setItem(
        "plans",
        JSON.stringify(plans)
    );

    renderPlans();
}

// Using ID to display contents on the Stats boxes
document.getElementById("total-records").textContent = plans.length;

const totalDuration = plans.reduce((sum, plan) => sum + Number(plan.duration), 0);

document.getElementById("total-duration").textContent = `${totalDuration} min`;

// Using the map and sort methods to find most used tags.
const tags = plans.map(plan => plan.tag);

const topTag = tags.sort(
    (a, b) =>
        tags.filter(tag => tag === b).length -
        tags.filter(tag => tag === a).length
)[0] || "-";

document.getElementById("top-tag").textContent = topTag;

// Displaying tasks in the previous 7 days

const today = new Date();

const recentPlans = plans.filter(plan => {
    const dueDate = new Date(plan.dueDate);

    const difference = (today - dueDate) / (1000 * 60 * 60 * 24);

    return difference >= 0 && difference <= 7;
});

document.getElementById("recent-count").textContent = recentPlans.length;




// Using graph to show tasks in a week.
function renderTrend() {
    const trendBars = document.getElementById("trend-bars");

    trendBars.innerHTML = "";

    const counts = [0, 0, 0, 0, 0, 0, 0];

    plans.forEach(plan => {
        const dueDate = new Date(plan.dueDate);

        counts[dueDate.getDay()]++;
    });

    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    counts.forEach((count, index) => {
        const bar = document.createElement("div");

        bar.className = "trend-bar";
        bar.style.setProperty("--bar-px", `${count * 30}px`);
        bar.setAttribute("data-value", count);

        trendBars.appendChild(bar);
    });

    const labels = document.createElement("div");
    labels.className = "trend-labels";

    days.forEach(day => {
        const label = document.createElement("span");
        label.textContent = day;
        labels.appendChild(label);
    });

    trendBars.after(labels);
}

renderTrend();


// Using jQuery to search in the dashboard table.
// $("#plan-search").on("keyup", function () {

//     const value =
//         $(this).val().toLowerCase();

//     $("#plans-table-body tr").filter(function () {

//         $(this).toggle(
//             $(this).text().toLowerCase().indexOf(value) > -1
//         );

//     });

// });

// Replacing jQuery with Regex.
$("#plan-search").on("keyup", function () {

    try {

        const regex = new RegExp(
            $(this).val(),
            "i"
        );

        $("#plans-table-body tr").each(function () {

            $(this).toggle(
                regex.test($(this).text())
            );

        });

    } catch {

        $("#plans-table-body tr").show();

    }

});

// Sorting basing on the due date, title, duration, and tag.
const sortSelect = document.getElementById("plan-sort-key");
const sortButton = document.getElementById("plan-sort-dir");
let sortDirection = "asc";

function sortPlans() {

    const sortBy = sortSelect.value;

    plans.sort((a, b) => {

        if (sortBy === "duration") {
            return sortDirection === "asc" ? a.duration - b.duration : b.duration - a.duration;
        }

        if (sortBy === "dueDate") {
            return sortDirection === "asc" ? new Date(a.dueDate) - new Date(b.dueDate) : new Date(b.dueDate) - new Date(a.dueDate);
        }

        if (sortDirection === "asc") {
            return a[sortBy].localeCompare(b[sortBy]);
        }

        return b[sortBy].localeCompare(a[sortBy]);

    });

    renderPlans();
}

// This is for when the dropdown changes.
sortSelect.addEventListener("change", function () {
    sortPlans();
});

// When the ASC/DESC button gets clicked, the sorting direction should also get changed..
sortButton.addEventListener("click", function () {

    if (sortDirection === "asc") {

        sortDirection = "desc";
        sortButton.textContent = "Desc";

    } else {

        sortDirection = "asc";
        sortButton.textContent = "Asc";

    }

    sortPlans();
});



// Exporting the JSON data
