// Retrieve tasks from local storage or initialize an empty array

const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let indexToBeDeleted = null;
const taskManagerContainer = document.querySelector(".task-manager")
const confirmEl = document.querySelector(".confirm-content");
const confirmBtn = confirmEl.querySelector(".confirm-btn");
const cancelBtn = confirmEl.querySelector(".cancel-btn");

const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskContainer = document.getElementById("taskContainer");

// For the task summary
const pendingCountEl = document.getElementById("pendingCount");
const completedCountEl = document.getElementById("completedCount");


// Add event listener to the form submit event
document.getElementById("taskForm").addEventListener("submit", handleFormSubmitEvent);


//function to handle the form submission
function handleFormSubmitEvent(event) {
    event.preventDefault();
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();


    if (taskText !== "") {
        const newTask = {
            text: taskText,
            completed: false
        };

        tasks.push(newTask)
        saveTasks();
        taskInput.value = '';
        displayTasks();
    }
}

// Function to save tasks to local storage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// To show the tasks function
displayTasks();



//Function to render tasks
function displayTasks() {
    const taskContainer = document.getElementById("taskContainer");
    taskContainer.innerHTML = "";


    tasks.forEach((task, index) => {
        const taskCard = document.createElement("div");
        taskCard.classList.add("taskCard");
        let classVal = "pending";
        let statusVal = "Pending";
        if (task.completed) {
            classVal = "completed";
            statusVal = "Completed";
        }

        updateTaskSummary();
        taskCard.classList.add(classVal);

        const taskText = document.createElement("p");
        taskText.innerText = task.text;

        const taskStatus = document.createElement("p");
        taskStatus.innerText = statusVal;
        taskStatus.classList.add("status");




        const toggleButton = document.createElement("button");
        toggleButton.classList.add("button-box");
        const btnContentEl = document.createElement("span");
        btnContentEl.classList.add("green");
        btnContentEl.innerText = task.completed ? "Task is Pending" : "Task is Completed";
        toggleButton.appendChild(btnContentEl);
        toggleButton.addEventListener("click", () => {
            tasks[index].completed = !tasks[index].completed;
            saveTasks();
            displayTasks();
        });

        function updateTaskSummary() {
            if (!pendingCountEl || !completedCountEl) return;

            if (tasks.length === 0) {
                pendingCountEl.innerText = 0;
                completedCountEl.innerText = 0;
                return;
            }

            const completed = tasks.filter(task => task.completed).length;
            const pending = tasks.length - completed;

            pendingCountEl.innerText = pending;
            completedCountEl.innerText = completed;
        }


        const deleteButton = document.createElement('button');
        deleteButton.classList.add("button-box");
        const delBtnContentEl = document.createElement("span");
        delBtnContentEl.classList.add("red");
        delBtnContentEl.innerText = "Delete Task";
        deleteButton.appendChild(delBtnContentEl);
        deleteButton.addEventListener("click", () => {
            indexToBeDeleted = index
            confirmEl.style.display = "block";
            taskManagerContainer.classList.add("overlay");
            taskForm.style.display = "none"

        });

        taskCard.appendChild(taskText);
        taskCard.appendChild(taskStatus);
        taskCard.appendChild(toggleButton);
        taskCard.appendChild(deleteButton);

        taskContainer.appendChild(taskCard);
    });

}


// function to delete the selected task
function deleteTask(index) {
    if (index === null) return;

    tasks.splice(index, 1);
    saveTasks();
    displayTasks();

}


confirmBtn.addEventListener("click", () => {
    deleteTask(indexToBeDeleted)
    indexToBeDeleted = null
    confirmEl.style.display = "none";
    taskManagerContainer.classList.remove("overlay");
    taskForm.style.display = "block"

});

cancelBtn.addEventListener("click", () => {
    confirmEl.style.display = "none";
    taskManagerContainer.classList.remove("overlay");
    taskForm.style.display = "block"

}
    
);
