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

const totalDuration = plans.reduce(
    (sum, plan) => sum + Number(plan.duration),
    0
);

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

    const difference =
        (today - dueDate) / (1000 * 60 * 60 * 24);

    return difference >= 0 && difference <= 7;
});

document.getElementById("recent-count").textContent =
    recentPlans.length;





    
// Render upcoming 7-day trend (today + next 6 days)
function isSameDay(a, b) {
    return a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate();
}

function renderTrend() {
    const trendContainer = document.getElementById("trend-bars");
    if (!trendContainer) return;

    // prepare 7-day window Monday -> Sunday for the current week
    const days = [];
    const start = new Date();
    start.setHours(0,0,0,0);
    // get Monday of the current week (Mon=0 offset)
    const dayOfWeek = start.getDay(); // 0 (Sun) - 6 (Sat)
    const diffToMonday = (dayOfWeek + 6) % 7; // days since Monday
    start.setDate(start.getDate() - diffToMonday);
    for (let i = 0; i < 7; i++) {
        const d = new Date(start.getTime() + i * 24 * 60 * 60 * 1000);
        days.push(d);
    }

    // count plans due on each day
    const counts = days.map(day => {
        return plans.filter(plan => {
            const due = new Date(plan.dueDate);
            due.setHours(0,0,0,0);
            return isSameDay(due, day);
        }).length;
    });

    const max = Math.max(...counts, 1);

    // clear container and render bars (remove existing labels if present)
    trendContainer.innerHTML = "";
    // remove previous labels row if any
    const next = trendContainer.nextElementSibling;
    if (next && next.classList.contains('trend-labels')) {
        next.remove();
    }
    const labels = document.createElement('div');
    labels.className = 'trend-labels';

    counts.forEach((count, i) => {
        const bar = document.createElement('div');
        bar.className = 'trend-bar';
        // scale height in pixels up to 50px (user requested 50px max)
        const px = Math.round((count / max) * 50); // 0-50px
        bar.style.setProperty('--bar-px', px + 'px');
        bar.setAttribute('data-value', count);
        bar.setAttribute('title', `${count} due on ${days[i].toDateString()}`);

        trendContainer.appendChild(bar);

        const lbl = document.createElement('span');
        lbl.textContent = days[i].toLocaleDateString(undefined, { weekday: 'short' });
        labels.appendChild(lbl);
    });

    trendContainer.after(labels);
}

renderTrend();