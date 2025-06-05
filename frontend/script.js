const apiUrl = "http://127.0.0.1:5000/tasks";

function loadTasks() {
    fetch(apiUrl)
        .then(res => res.json())
        .then(tasks => {
            const list = document.getElementById("taskList");
            list.innerHTML = "";
            tasks.forEach(task => {
                const li = document.createElement("li");
                li.textContent = task.task;
                li.onclick = () => deleteTask(task.id);
                list.appendChild(li);
            });
        });
}

function addTask() {
    const task = document.getElementById("taskInput").value;
    fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task })
    }).then(() => {
        document.getElementById("taskInput").value = "";
        loadTasks();
    });
}

function deleteTask(id) {
    fetch(`${apiUrl}/${id}`, { method: "DELETE" })
        .then(() => loadTasks());
}

loadTasks();
