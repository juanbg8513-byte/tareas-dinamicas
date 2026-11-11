
const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const formMessage = document.getElementById("form-message");

const totalCount = document.getElementById("total-count");
const completedCount = document.getElementById("completed-count");
const pendingCount = document.getElementById("pending-count");

const progressFill = document.getElementById("progress-fill");
const progressTrack = document.getElementById("progress-track");
const progressCaption = document.getElementById("progress-caption");

let tasks = [];
let nextTaskId = 1;

taskForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const taskText = taskInput.value.trim();

    if (taskText === "") {

        formMessage.textContent =
            "Escribe una tarea antes de agregarla.";

        taskInput.focus();

        return;
    }

    const newTask = {
        id: nextTaskId,
        text: taskText,
        completed: false
    };

    nextTaskId++;

    tasks.push(newTask);

    formMessage.textContent = "";
    taskInput.value = "";

    renderTasks();

    taskInput.focus();

});

function renderTasks() {

    taskList.innerHTML = "";

    if (tasks.length === 0) {

        const emptyState = document.createElement("li");

        emptyState.className = "empty-state";

        emptyState.innerHTML = `
            <span class="empty-icon">✦</span>
            <p>Aún no hay tareas en tu registro.</p>
            <span>Agrega tu primera misión para comenzar.</span>
        `;

        taskList.appendChild(emptyState);

    }

    tasks.forEach(function(task) {

        const taskItem = document.createElement("li");

        taskItem.className = "task-item";

        if (task.completed) {

            taskItem.classList.add("completed");

        }

        const taskText = document.createElement("span");

        taskText.className = "task-text";
        taskText.textContent = task.text;

        const taskActions = document.createElement("div");

        taskActions.className = "task-actions";

        if (!task.completed) {

            const completeButton =
                document.createElement("button");

            completeButton.type = "button";

            completeButton.className =
                "action-button complete-button";

            completeButton.textContent = "Completar";

            completeButton.addEventListener("click", function() {

                completeTask(task.id);

            });

            taskActions.appendChild(completeButton);

        }

        const deleteButton =
            document.createElement("button");

        deleteButton.type = "button";

        deleteButton.className =
            "action-button delete-button";

        deleteButton.textContent = "Eliminar";

        deleteButton.addEventListener("click", function() {

            deleteTask(task.id);

        });

        taskActions.appendChild(deleteButton);

        taskItem.appendChild(taskText);
        taskItem.appendChild(taskActions);

        taskList.appendChild(taskItem);

    });

    updateCounters();

}

function completeTask(taskId) {

    tasks = tasks.map(function(task) {

        if (task.id === taskId) {

            return {
                ...task,
                completed: true
            };

        }

        return task;

    });

    renderTasks();

}

function deleteTask(taskId) {

    tasks = tasks.filter(function(task) {

        return task.id !== taskId;

    });

    renderTasks();

}

function updateCounters() {

    const total = tasks.length;

    const completed = tasks.filter(function(task) {

        return task.completed;

    }).length;

    const pending = total - completed;

    const percentage = total === 0
        ? 0
        : Math.round((completed / total) * 100);

    totalCount.textContent = total;

    completedCount.textContent = completed;

    pendingCount.textContent = pending;

    progressFill.style.width = percentage + "%";

    progressTrack.setAttribute(
        "aria-valuenow",
        percentage
    );

    progressCaption.textContent =
        percentage + "% completado";

}

renderTasks();
