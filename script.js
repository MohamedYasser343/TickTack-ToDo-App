document.getElementById('add-task-btn').addEventListener('click', function () {
  const taskInput = document.getElementById('task-input');
  const taskTitle = taskInput.value.trim();

  if (taskTitle === '') {
    alert('Please enter a task.');
    return;
  }

  const taskTableContainer = document.getElementById('task-table-container');
  const completedTaskContainer = document.getElementById('completed-task-container');

  // Ensure the tasks table exists
  let taskTable = document.querySelector('.task-table');
  if (!taskTable) {
    taskTable = createTable('task-table', 'task-list', ['', 'Title', 'Importance']);
    taskTableContainer.appendChild(taskTable);
    taskTableContainer.style.display = 'block';
  }

  const taskList = document.getElementById('task-list');
  const newRow = document.createElement('tr');

  // Add complete button
  const completeCell = document.createElement('td');
  const completeButton = document.createElement('div');
  completeButton.className = 'circle';
  completeButton.addEventListener('click', function () {
    // Remove task from the current table
    taskList.removeChild(newRow);

    // Hide task table if no tasks are in progress
    if (!taskList.hasChildNodes()) {
      taskTableContainer.style.display = 'none';
    }

    // Show the completed tasks table
    let completedTaskTable = document.querySelector('.completed-task-table');
    if (!completedTaskTable) {
      completedTaskTable = createTable('completed-task-table', 'completed-list', ['Title']);
      completedTaskContainer.appendChild(completedTaskTable);
      completedTaskContainer.style.display = 'block';
    }

    // Add task to the completed table
    const completedList = document.getElementById('completed-list');
    const completedRow = document.createElement('tr');

    const completedTitleCell = document.createElement('td');
    completedTitleCell.textContent = taskTitle;
    completedRow.appendChild(completedTitleCell);

    completedList.appendChild(completedRow);

    console.log(`Task "${taskTitle}" moved to completed tasks.`);
  });
  completeCell.appendChild(completeButton);
  newRow.appendChild(completeCell);

  // Add task title
  const titleCell = document.createElement('td');
  titleCell.textContent = taskTitle;
  newRow.appendChild(titleCell);

  // Add importance button
  const importanceCell = document.createElement('td');
  const star = document.createElement('span');
  star.className = 'star';
  star.innerHTML = '★';
  star.addEventListener('click', function () {
    star.classList.toggle('selected');
    console.log(`Task "${taskTitle}" marked as ${star.classList.contains('selected') ? 'important' : 'not important'}.`);
  });
  importanceCell.appendChild(star);
  newRow.appendChild(importanceCell);

  taskList.appendChild(newRow);

  taskInput.value = ''; // Clear input after adding task
  taskTableContainer.style.display = 'block'; // Ensure task table is visible when a task is added
});

function createTable(tableClassName, tbodyId, headers) {
  const table = document.createElement('table');
  table.className = tableClassName;

  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');

  headers.forEach(headerText => {
    const th = document.createElement('th');
    th.textContent = headerText;
    headerRow.appendChild(th);
  });

  thead.appendChild(headerRow);
  table.appendChild(thead);

  const tbody = document.createElement('tbody');
  tbody.id = tbodyId;
  table.appendChild(tbody);

  return table;
}
function toggleTheme() {
  document.body.classList.toggle('dark-theme');
  
  // Save the theme preference in localStorage
  if (document.body.classList.contains('dark-theme')) {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.setItem('theme', 'light');
  }
}

// Load the saved theme on page load
window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
  }
});

