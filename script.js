const inputTask = document.querySelector('#inputTask');
const addTaskBtn = document.querySelector('#addTaskBtn');
const taskList = document.querySelector('#taskList');
const emptyWarningMessage = document.querySelector('#emptyWarning');

const tasks = [];

// Generate list element from tasks array of objects
const renderTask = () => {

    clearTaskList();

    if(tasks.length === 0) {
        emptyWarningMessage.classList.remove('hidden');
        emptyWarningMessage.classList.add('block');
    } else {
        emptyWarningMessage.classList.remove('block');
        emptyWarningMessage.classList.add('hidden');
    }

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task.name;
        li.setAttribute('id', `task${task.id}`);
        li.classList.add('task-item');

        if(task.completed) {
            li.classList.add('line-through');
        }

        // Create delete button for every list item
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');

        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            deleteTask(task.id);
        }); 

        li.appendChild(deleteBtn);

        taskList.appendChild(li);
    });



    // add click event for toggling task completion status
    const taskListItems = taskList.querySelectorAll('li');
    taskListItems.forEach(taskItem => {
        taskItem.addEventListener('click', () => {
            const taskId = parseInt(taskItem.getAttribute('id').replace('task', ''));
            toggleCompletedTask(taskId);
        });
    });
}


// Add the task to the tasks array and display afterwards inside the tasklist
addTaskBtn.addEventListener('click', () => {
    const taskInputValue = inputTask.value;
    if(taskInputValue === '') return;
    tasks.push({ id: Date.now(), name: `${taskInputValue}`, completed: false});
    inputTask.value = '';
    renderTask();
    console.log(tasks);
});


// Clear tasklist to render the new updated list
const clearTaskList = () => {
    while(taskList.hasChildNodes()) {
        taskList.removeChild(taskList.firstChild);
    }
}


//toggle completed value of a task
const toggleCompletedTask = (taskId) => {
    const task = tasks.find(t => t.id === taskId);
    task.completed = !task.completed;
    renderTask();
}


const deleteTask = (taskId) => {
    const taskIndex = tasks.findIndex(t => t.id === taskId);
    if(taskIndex !== -1) {
        tasks.splice(taskIndex, 1);
        renderTask();
    }
}


renderTask();





