const plans = JSON.parse(localStorage.getItem("plans")) || [];

const planSearch = document.getElementById("plan-search");
let activeSearchRegex = null;

function escapeRegex(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function highlightMatches(text) {
    if (!activeSearchRegex) return text;
    return text.replace(activeSearchRegex, match => `<span class="highlight">${match}</span>`);
}


const tableBody = document.getElementById("plans-table-body");

function renderPlans() {
    tableBody.innerHTML = "";

    plans.forEach((plan, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td data-label="Title">${highlightMatches(plan.title)}</td>
            <td data-label="Tag">${highlightMatches(plan.tag)}</td>
            <td data-label="Duration">${highlightMatches(plan.duration)} min</td>
            <td data-label="Due Date">${highlightMatches(plan.dueDate)}</td>
            <td data-label="Actions">
                <button class="btn btn-primary" onclick="editPlan(${index})">Edit</button>
                <button class="btn btn-danger" onclick="deletePlan(${index})">
                    Delete
                </button>
            </td>
        `;

        const rowText = `${plan.title} ${plan.tag} ${plan.duration} ${plan.dueDate}`;
        const visible = !activeSearchRegex || activeSearchRegex.test(rowText);
        row.style.display = visible ? "" : "none";

        tableBody.appendChild(row);
    });
}

renderPlans();

// The delete function to help me in erasing a plan, task, or event.
function deletePlan(index) {
    plans.splice(index, 1);

    localStorage.setItem("plans", JSON.stringify(plans));

    renderPlans();
}

function editPlan(index) {
    const plan = plans[index];
    if (!plan) return;

    localStorage.setItem("currentEdit", JSON.stringify({ index, ...plan }));
    window.location.href = "add_record.html";
}

// Using ID to display contents on the Stats boxes
document.getElementById("total-records").textContent = plans.length;

const totalDuration = plans.reduce((sum, plan) => sum + Number(plan.duration), 0);

document.getElementById("total-duration").textContent = `${totalDuration} min`;

// Calculating the remaining time: weekly cap - totla duration.
const settings = JSON.parse(localStorage.getItem("settings")) || {};
const weeklyCap = Number(settings.weeklyCap) || 0;
const remaining = weeklyCap - totalDuration;

document.getElementById("remaining-cap").textContent =
    `${remaining >= 0 ? remaining : 0} min`;
    
// Using the map and sort methods to find most used tags.
const tags = plans.map(plan => plan.tag);

const topTag = tags.sort(
    (a, b) => tags.filter(tag => tag === b).length - tags.filter(tag => tag === a).length)[0] || "-";

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
// $("#plan-search").on("keyup", function () {

//     try {

//         const regex = new RegExp(
//             $(this).val(),
//             "i"
//         );

//         $("#plans-table-body tr").each(function () {

//             $(this).toggle(
//                 regex.test($(this).text())
//             );

//         });

//     } catch {

//         $("#plans-table-body tr").show();

//     }

// });

planSearch?.addEventListener("input", function () {
    const query = this.value.trim();

    if (!query) {
        activeSearchRegex = null;
        renderPlans();
        return;
    }

    try {
        activeSearchRegex = new RegExp(escapeRegex(query), "i");
    } catch {
        activeSearchRegex = null;
    }

    renderPlans();
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


