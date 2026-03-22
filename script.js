// Retrieve tasks from local storage or initialize an empty array

const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const taskManagerContainer = document.querySelector(".task-manager")
const confirmEl = document.querySelector(".confirm-content");
const confirmBtn = confirmEl.querySelector(".confirm-btn");
const cancelBtn = confirmEl.querySelector(".cancel-btn");

const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskContainer = document.getElementById('taskContainer');

// Add event listener to the form submit event
document.getElementById("taskForm").addEventListener("submit", handleFormSubmitEvent);


displayTasks();

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


//Function to render tasks
function displayTasks() {
    const taskContainer = document.getElementById("taskContainer");
    taskContainer.innerHTML = '';


    tasks.forEach((task, index) => {
        const taskCard = document.createElement("div");
        taskCard.classList.add("taskCard");
        let classVal = "pending";
        let textVal = "Pending";
        if (task.completed) {
            classVal = "completed";
            textVal = "Completed";
        }
        taskCard.classList.add(classVal);

        taskContainer.appendChild(taskCard);
    });


}